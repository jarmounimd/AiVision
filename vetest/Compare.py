import json
import numpy as np
from io import BytesIO
from tensorflow.keras.applications import VGG16
from tensorflow.keras.applications.vgg16 import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from sklearn.metrics.pairwise import cosine_similarity
from PIL import Image

# Load the pre-extracted image features from NPY file
try:
    image_features = np.load("electronics_features.npy", allow_pickle=True).item()
    feature_array = image_features  # Already in the correct format
except FileNotFoundError:
    try:
        with open("electronics_features.json", "r", encoding='utf-8') as features_file:
            image_features = json.load(features_file)
            feature_array = {image_id: np.array(features) for image_id, features in image_features.items()}
    except FileNotFoundError:
        raise FileNotFoundError("Neither electronics_features.npy nor electronics_features.json found. Please ensure at least one file exists.")

# Load the shopping results JSON
try:
    with open("electronics_shopping.json", "r", encoding='utf-8') as shopping_file:
        shopping_data = json.load(shopping_file)
except FileNotFoundError:
    raise FileNotFoundError("electronics_shopping.json not found. Please ensure the file exists.")

# Initialize VGG16 model for feature extraction
vgg_model = VGG16(weights="imagenet", include_top=False)

def extract_features_from_bytes(image_bytes):
    """
    Extract features from an image provided as bytes using the VGG16 model.
    """
    img = Image.open(BytesIO(image_bytes)).convert("RGB")  # Ensure uniform RGB format
    img = img.resize((224, 224))  # Resize the image to the required size
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    features = vgg_model.predict(img_array, verbose=0)
    return features.flatten()

def find_best_matches(new_features, stored_features, top_n=20):
    """
    Find the top N best matches for a new image based on cosine similarity.
    """
    similarities = {}
    for image_id, features in stored_features.items():
        # Compute cosine similarity
        similarity = cosine_similarity(new_features.reshape(1, -1), features.reshape(1, -1))[0][0]
        if similarity > 0.3:  # Only consider meaningful matches
            similarities[image_id] = similarity

    # Sort by similarity in descending order
    sorted_similarities = sorted(similarities.items(), key=lambda x: x[1], reverse=True)
    return sorted_similarities[:top_n]

def find_matches(image_bytes, size=20):
    """
    Find the best matches for a new image based on extracted features.
    """
    # Extract features from the new image
    new_image_features = extract_features_from_bytes(image_bytes)

    # Find the top matches
    top_matches = find_best_matches(new_image_features, feature_array, top_n=size)

    # Retrieve details of the top matches
    top_images = []
    top_match_ids = [match[0] for match in top_matches]

    for product in shopping_data:
        if product["product_id"] in top_match_ids:
            top_images.append({
                "product_id": product["product_id"],
                "thumbnail": product["thumbnail"],
                "title": product["title"],
                "price": product["extracted_price"],
                "rating": product["rating"],
                "reviews": product["reviews"],
                "link": product["product_link"] if "product_link" in product else product["link"],
            })

    return top_images

def format_price(price):
    """Format price to ensure consistent display"""
    if not price or price == "N/A":
        return "N/A"
    
    # Remove any currency symbols and commas
    price_str = str(price).replace("$", "").replace(",", "").strip()
    
    try:
        # Try to convert to float
        price_float = float(price_str)
        # Format with commas and dollar sign
        return f"${price_float:,.2f}"
    except ValueError:
        # If it's already formatted with a dollar sign, return as is
        if str(price).startswith("$"):
            return str(price)
        # Otherwise return with dollar sign
        return f"${price}"

def find_matches_using_text(desc, size=20):
    """
    Find products by matching text in their titles.
    """
    print(f"Starting text search with query: {desc}, size: {size}")  # Debug log
    
    try:
        # Load the shopping data
        with open("electronics_shopping.json", "r", encoding='utf-8') as f:
            shopping_data = json.load(f)
            if not isinstance(shopping_data, list):
                raise ValueError("Shopping data is not a list")
            print(f"Loaded {len(shopping_data)} products from shopping data")  # Debug log
            
        matches = []
        search_terms = desc.lower().strip().split()
        print(f"Searching for terms: {search_terms}")  # Debug log
        
        for product in shopping_data:
            if not isinstance(product, dict):
                print(f"Invalid product data: {product}")  # Debug log
                continue
                
            title = product.get("title", "").lower()
            if not isinstance(title, str):
                print(f"Invalid title: {title}")  # Debug log
                continue
            
            # Calculate match score
            score = 0
            for term in search_terms:
                if term in title:
                    score += 1
                    # Bonus points for exact matches
                    if term == title:
                        score += 2
            
            # Only include if at least one term matches
            if score > 0:
                try:
                    # Get the link from either product_link or serpapi_product_api
                    link = product.get("product_link")
                    if not link:
                        link = product.get("serpapi_product_api")
                    
                    # Get price from either price or extracted_price
                    price = product.get("price", product.get("extracted_price", "N/A"))
                    formatted_price = format_price(price)
                        
                    item = {
                        "product_id": product.get("product_id", ""),
                        "thumbnail": product.get("thumbnail", ""),
                        "title": product.get("title", ""),
                        "price": formatted_price,
                        "rating": product.get("rating", "N/A"),
                        "reviews": product.get("reviews", "N/A"),
                        "link": link,
                        "score": score,
                        "position": product.get("position", 9999)  # Default to high position if not found
                    }
                    matches.append(item)
                    print(f"Found matching product: {item['title']} with score {score}")  # Debug log
                except Exception as e:
                    print(f"Error processing product: {str(e)}")  # Debug log
                    continue
        
        # Sort by score (descending) and position (ascending)
        matches.sort(key=lambda x: (-x["score"], x["position"]))
        
        # Remove score and position from output
        top_images = []
        for match in matches[:size]:
            match.pop("score", None)
            match.pop("position", None)
            top_images.append(match)
        
        print(f"Found {len(top_images)} matching products")  # Debug log
        return top_images
        
    except FileNotFoundError:
        print("Shopping data file not found")  # Debug log
        raise Exception("Product data not found")
    except json.JSONDecodeError:
        print("Error decoding shopping data")  # Debug log
        raise Exception("Error reading product data")
    except Exception as e:
        print(f"Unexpected error in text search: {str(e)}")  # Debug log
        raise

# Example Usage
# Assuming `new_image_bytes` is a byte stream of the new image (e.g., from an HTTP request or file upload)
# new_image_bytes = open("example_image.jpg", "rb").read()
# results = find_matches(new_image_bytes)
# print("Top Matches:", results)
