# from Compare import find_matches
import logging
import random
# Initialize Flask app
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
# from PIL import Image
import requests
# import speech_recognition as sr
import os
# from pydub import AudioSegment
# from googletrans import Translator
from PIL import Image
from io import BytesIO
from Compare import find_matches, find_matches_using_text

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes

    @app.route("/testUrl", methods=['POST'])
    def handleUrl():
        return jsonify({"error": "Service temporarily unavailable"}), 503

    @app.route("/testImage",methods=["POST"])
    def handleImage():
        try:
            if 'image' not in request.files:
                return jsonify({"error": "No image file provided"}), 400

            file = request.files['image']
            if file.filename == '':
                return jsonify({"error": "No selected file"}), 400

            # Read the file into bytes
            img_bytes = file.read()
            
            # Find matches using the image
            results = find_matches(img_bytes)
            
            return jsonify({"message": results})

        except Exception as e:
            print(f"Error processing image: {str(e)}")
            return jsonify({"error": str(e)}), 500

    @app.route("/testText", methods=["POST"])
    def handleText():
        print("\n=== Starting text search request ===")  # Debug log
        try:
            print("Request data:", request.get_data().decode('utf-8'))  # Debug log
            print("Request content type:", request.content_type)  # Debug log
            
            if not request.is_json:
                print("Request is not JSON")  # Debug log
                return jsonify({"error": "Content-Type must be application/json"}), 400
                
            data = request.get_json()
            if not data:
                print("No data received")  # Debug log
                return jsonify({"error": "No JSON data provided"}), 400
                
            print(f"Received data: {data}")  # Debug log
            
            if 'query' not in data:
                print("No query parameter in data")  # Debug log
                return jsonify({"error": "Query parameter is required"}), 400
                
            query = data['query']
            size = data.get('size', 20)
            
            if not isinstance(query, str) or not query.strip():
                print(f"Invalid query: {query}, type: {type(query)}")  # Debug log
                return jsonify({"error": "Invalid query parameter"}), 400
                
            print(f"Processing query: {query}, Size: {size}")  # Debug log
            
            try:
                results = find_matches_using_text(query, size)
                print(f"Found {len(results)} matching products")  # Debug log
                if not results:
                    print("No matches found")  # Debug log
                    return jsonify({"message": []}), 200
                return jsonify({"message": results})
            except Exception as e:
                print(f"Error in find_matches_using_text: {str(e)}")  # Debug log
                error_msg = str(e)
                if "Product data not found" in error_msg:
                    return jsonify({"error": "Product data not found"}), 404
                elif "Error reading product data" in error_msg:
                    return jsonify({"error": "Error reading product data"}), 500
                else:
                    return jsonify({"error": "Error processing text search"}), 500
            
        except Exception as e:
            print(f"Error in text search: {str(e)}")  # Debug log
            logging.error(f"Error in text search: {str(e)}")
            return jsonify({"error": "Invalid input"}), 400
            
        finally:
            print("=== Finished text search request ===\n")  # Debug log

    @app.route("/categories",methods=["GET"])
    def getCategories():
        return jsonify({
            "categories": [
                "Smartphones",
                "Laptops",
                "Smart Watches",
                "Tablets",
                "Headphones"
            ]
        })

    @app.route("/random-products", methods=["GET"])
    def get_random_products():
        # Sample product data - in a real app, this would come from a database
        sample_products = [
            {
                "name": "iPhone 13 Pro",
                "description": "Latest Apple iPhone with A15 Bionic chip and Pro camera system",
                "price": 999.99,
                "image_url": "https://via.placeholder.com/200x200?text=iPhone+13+Pro"
            },
            {
                "name": "Samsung Galaxy S21",
                "description": "5G smartphone with 108MP camera and 120Hz display",
                "price": 799.99,
                "image_url": "https://via.placeholder.com/200x200?text=Galaxy+S21"
            },
            {
                "name": "MacBook Pro M1",
                "description": "13-inch MacBook Pro with Apple M1 chip and Retina display",
                "price": 1299.99,
                "image_url": "https://via.placeholder.com/200x200?text=MacBook+Pro"
            },
            {
                "name": "Dell XPS 13",
                "description": "Premium ultrabook with InfinityEdge display",
                "price": 999.99,
                "image_url": "https://via.placeholder.com/200x200?text=Dell+XPS"
            },
            {
                "name": "Apple Watch Series 7",
                "description": "Latest Apple Watch with larger display and faster charging",
                "price": 399.99,
                "image_url": "https://via.placeholder.com/200x200?text=Apple+Watch"
            },
            {
                "name": "Samsung Galaxy Watch 4",
                "description": "Advanced health tracking and Wear OS integration",
                "price": 249.99,
                "image_url": "https://via.placeholder.com/200x200?text=Galaxy+Watch"
            },
            {
                "name": "iPad Pro 12.9",
                "description": "M1 chip, Liquid Retina XDR display, 5G capability",
                "price": 1099.99,
                "image_url": "https://via.placeholder.com/200x200?text=iPad+Pro"
            },
            {
                "name": "Sony WH-1000XM4",
                "description": "Premium noise-cancelling headphones with adaptive sound",
                "price": 349.99,
                "image_url": "https://via.placeholder.com/200x200?text=Sony+Headphones"
            }
        ]
        
        # Return 4 random products
        return jsonify(random.sample(sample_products, 4))

    @app.route("/searchText", methods=['GET'])
    def search_text():
        print("Received text search request")  # Debug log
        try:
            query = request.args.get('query', '')
            size = int(request.args.get('size', 20))
            
            print(f"Query: {query}, Size: {size}")  # Debug log
            
            if not query:
                return jsonify({"error": "Query parameter is required"}), 400
                
            results = find_matches_using_text(query, size)
            print(f"Found {len(results)} results")  # Debug log
            
            return jsonify({"message": results})
            
        except Exception as e:
            print(f"Error in text search: {str(e)}")  # Debug log
            logging.error(f"Error in text search: {str(e)}")
            return jsonify({"error": str(e)}), 500

    # @app.route("/transcribe", methods=["POST"])
    # def transcribe_audio():
        if "lang"  not in request.args:
            return jsonify({"error": "No language provided"}), 400
        if "audio" not in request.files:
            return jsonify({"error": "No audio file provided"}), 400

        audio_file = request.files["audio"]
        lang = request.args["lang"]

    # Save the uploaded file temporarily
        audio_file.save("temp_audio_file")

        try:
        # Convert the audio file to WAV if it's not already in WAV format
        # You can check the extension manually if needed
            audio_format = audio_file.filename.split('.')[-1].lower()
            if audio_format != "wav":
                audio = AudioSegment.from_file("temp_audio_file", format=audio_format)
                audio.export("temp_audio_file.wav", format="wav")
            else:
                audio = AudioSegment.from_file("temp_audio_file", format="wav")

        # Initialize the SpeechRecognition recognizer
            recognizer = sr.Recognizer()

        # Read the converted WAV file
            with sr.AudioFile("temp_audio_file.wav") as source:
                audio_data = recognizer.record(source)

        # Convert audio to text using Google Web Speech API
            text = recognizer.recognize_google(audio_data, language=lang)
            top_images = find_matches_using_text(text)
            return jsonify({"transcription": text,"message":top_images}), 200
        except sr.UnknownValueError:
            return jsonify({"error": "Speech Recognition could not understand the audio"}), 400
        except sr.RequestError as e:
            return jsonify({"error": f"Could not request results from Google Speech Recognition service; {e}"}), 500
        except Exception as e:
            return jsonify({"error": f"An unexpected error occurred: {e}"}), 500
        finally:
        # Clean up temporary files
            import os
            if os.path.exists("temp_audio_file"):
                os.remove("temp_audio_file")
            if os.path.exists("temp_audio_file.wav"):
                os.remove("temp_audio_file.wav")

    
    return app

# Initialize and run the app
if __name__ == "__main__":
    app = create_app()
    print("Starting Flask server...")  # Debug log
    app.run(host='0.0.0.0', port=5000, debug=True)