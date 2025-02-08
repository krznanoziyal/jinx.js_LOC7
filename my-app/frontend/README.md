# 🎯 LogiYatra

> An AI/ML-powered solution for hyperlocal businesses to optimize inventory management and business processes

LogiYatra leverages Natural Language Processing, Artificial Intelligence, and Data Analytics to provide actionable insights for efficient inventory management and customer trend analysis. Perfect for businesses looking to streamline their operations and make data-driven decisions.

## ✨ Key Features

### 📱 Platform & Interface
- **Dual Platform Support**: Streamlined mobile app for essential functions + comprehensive web interface for detailed analytics
- **Interactive Chatbot**: Get personalized industry and market trend insights
- **Real-time CSV Agent**: Direct database interaction for custom queries and analysis

### 📊 Analytics & Forecasting
- **Smart Demand Forecasting**: Predict product trends and analyze customer demands
- **Market Insights with NLP**: Analyze market trends and customer sentiment
- **Comprehensive Analytics**: Detailed reports with interactive graph analysis
- **Seasonal Intelligence**: Optimize stock based on holiday patterns and peak times

### 📦 Inventory Management
- **Smart Reordering**: Automated stock replenishment based on AI predictions
- **FIFO Implementation**: Systematic older stock prioritization
- **Branch Sync**: Cross-branch notifications for efficient stock transfers
- **Waste Reduction**: Integrated charity recommendations and automated discounts for aging stock

## 🛠️ Tech Stack

- **Backend**: FastAPI
- **Frontend**: Streamlit
- **Database**: Firebase
- **Language**: Python

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Firebase account
- Virtual environment tool

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/LogiYatra.git
cd LogiYatra
```

2. Set up virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Configure Firebase
- Place your `mh.json` credentials file in the project root
- Set up necessary environment variables

### Running the Application

1. Start the Backend
```bash
uvicorn main:app --reload
```

2. Launch the Frontend
```bash
streamlit run app.py
```

Visit `http://localhost:8501` to access the LogiYatra interface.

## 🔗 API Endpoints

### 1. Root Endpoint
```http
GET /
```
Welcome endpoint to verify API status
- **Response**: `{ "message": "Welcome to LogiYatra" }`

### 2. CSV Analysis
```http
POST /analyze/csv
```
Upload and analyze CSV data
- **Parameters**:
  - `csv_file`: File upload
  - `question`: Analysis query
- **Returns**: File URL and analysis results

### 3. Industry Insights
```http
GET /ask_food_question/
```
Food industry knowledge base query
- **Parameters**:
  - `question`: Industry-related query
- **Returns**: AI-generated answer based on market data

### 4. Sales Forecasting
```http
POST /forecast
```
Predictive sales analysis
- **Body**:
  ```json
  {
    "csv_file_path": "path/to/sales.csv",
    "test_file_path": "path/to/test.csv"
  }
  ```
- **Returns**: Sales statistics and forecast analysis

## 💡 Example Usage

### CSV Analysis
```python
import requests

files = {'csv_file': open('sales_data.csv', 'rb')}
data = {'question': 'What are the top-selling products?'}
response = requests.post('http://localhost:8000/analyze/csv', files=files, data=data)
```

### Sales Forecast
```python
import requests

data = {
    "csv_file_path": "historical_sales.csv",
    "test_file_path": "validation_data.csv"
}
response = requests.post('http://localhost:8000/forecast', json=data)
```

## 📝 Notes
- Ensure all dependencies are properly installed
- Firebase configuration (`mh.json`) must be valid
- For production deployment, configure appropriate security measures

---
Made with ❤️ by the LogiYatra Team
