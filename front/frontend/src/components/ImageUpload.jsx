import React, { useState } from 'react';
import './ImageUpload.css';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
        setError(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!selectedFile) {
            setError('Please select an image first');
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('http://localhost:5000/testImage?size=5', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}`);
            }

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            setResults(data.message);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="image-upload-container">
            <h1>Image Search</h1>
            
            <form onSubmit={handleSubmit} className="upload-form">
                <div className="file-input-container">
                    <input
                        type="file"
                        onChange={handleFileSelect}
                        accept="image/*"
                        className="file-input"
                    />
                    <button type="submit" disabled={loading} className="search-button">
                        {loading ? 'Searching...' : 'Search Similar Images'}
                    </button>
                </div>
                
                {error && <div className="error-message">{error}</div>}
            </form>

            {results.length > 0 && (
                <div className="results-container">
                    {results.map((result, index) => (
                        <div key={index} className="result-card">
                            <img src={result.thumbnail} alt={result.title} className="product-image" />
                            <h3 className="product-title">{result.title}</h3>
                            <p className="product-price">Price: ${result.price}</p>
                            <p className="product-rating">
                                Rating: {result.rating}/5 ({result.reviews} reviews)
                            </p>
                            <a
                                href={result.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="view-product-link"
                            >
                                View Product
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
