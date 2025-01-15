# 🔍 Smart Electronics Search & Compare Platform

<div align="center">

[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com/)

*A powerful platform that revolutionizes how you search and compare electronic products using AI and image recognition.*

[Demo Video](https://youtu.be/56qappNnY4s) • [Features](#-key-features) • [Installation](#-installation) • [Usage](#-usage) • [Technologies](#-technologies)

<img src="https://i.imgur.com/your-screenshot.png" alt="Project Screenshot" width="600">

</div>

## 🎥 Demo

Check out our platform in action:

[![Demo Video](https://img.youtube.com/vi/56qappNnY4s/0.jpg)](https://youtu.be/56qappNnY4s)

## ✨ Key Features

- 🤖 **AI-Powered Search**: Utilize advanced image recognition to find similar products
- 🔄 **Smart Comparison**: Compare products side by side with detailed specifications
- 📱 **Electronics Focus**: Specialized in electronics product search and filtering
- 🎯 **Accurate Results**: Powered by VGG16 neural network for precise image matching
- 💻 **Modern UI**: Sleek, responsive interface built with React and Material-UI

## 🚀 Installation

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/jarmounimd/AiVision.git

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
python testApp.py
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd front/frontend

# Install dependencies
npm install

# Start development server
npm start
```

## 📱 Usage

1. **Image Search**
   - Upload an image of an electronic product
   - Get similar products with detailed specifications
   - Filter results based on various criteria

2. **Product Comparison**
   - Select multiple products to compare
   - View detailed side-by-side comparisons
   - Make informed purchasing decisions

3. **Smart Filtering**
   - Filter by product category
   - Sort by price, popularity, or specifications
   - Find exactly what you're looking for

## 🛠 Technologies

### Backend
- **Python 3.x**: Core programming language
- **TensorFlow**: Deep learning and image processing
- **Flask**: Web server framework
- **NumPy**: Numerical computations
- **OpenCV**: Image processing

### Frontend
- **React**: UI framework
- **Material-UI**: Component library
- **React Router**: Navigation
- **Axios**: API requests

## 📁 Project Structure

```
📦 electronics-search-platform
 ┣ 📂 vetest                 # Python backend
 ┃ ┣ 📜 Compare.py          # Comparison logic
 ┃ ┣ 📜 expand_dataset.py   # Dataset utilities
 ┃ ┣ 📜 filter_electronics.py
 ┃ ┗ 📜 testApp.py          # Main application
 ┗ 📂 front                  # React frontend
   ┗ 📂 frontend
     ┗ 📂 src
       ┗ 📂 pages           # React components
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- TensorFlow team for their amazing deep learning framework
- Material-UI team for the beautiful components
- All our contributors and supporters

---
<div align="center">
Made with ❤️ by Mohamed JARMOUNI
</div>
