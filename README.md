# SalesSight AI 🚀

> **AI-Powered Sales Forecasting & Business Analytics Dashboard**  
> *Made by Dhruv Tuli*

SalesSight AI is a modern, full-stack web application that allows users to upload historical sales data and instantly generate comprehensive sales analytics, dynamic trend visualizations, and future monthly revenue forecasts. Utilizing the Prophet machine learning model and generative AI integrations, SalesSight acts as an automated Business Intelligence analyst.

---

## ✨ Features

- **📊 Exploratory Data Analysis:** Instantly calculates critical KPIs like Total Revenue, Average Monthly Sales, and Month-over-Month Growth Rate.
- **📈 Time Series Forecasting:** Uses the Meta Prophet model to generate highly accurate predictions for the next 3, 6, or 12 months based on historical data.
- **🤖 Generative AI Business Insights:** Integrates with LLMs to automatically generate strategic business observations, identify potential risks, and propose actionable recommendations.
- **🎨 Premium UI/UX:** Built with a sleek, dark-mode glassmorphism aesthetic using Tailwind CSS and Recharts for interactive data visualization.
- **📄 Automated Reporting:** Downloadable PDF reports featuring KPIs and data insights.

## 🛠️ Tech Stack

**Frontend:**
- [Next.js](https://nextjs.org/) (React Framework)
- [TailwindCSS](https://tailwindcss.com/) (Styling)
- [Recharts](https://recharts.org/) (Data Visualization)
- [Lucide React](https://lucide.dev/) (Icons)

**Backend & Data Science:**
- [FastAPI](https://fastapi.tiangolo.com/) (Python API Framework)
- [Pandas](https://pandas.pydata.org/) & [NumPy](https://numpy.org/) (Data Processing)
- [Prophet](https://facebook.github.io/prophet/) (Time Series Forecasting)
- [Google Generative AI](https://ai.google.dev/) (Business Insights)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.10+)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/SalesSight-AI.git
cd SalesSight-AI
```

### 2. Start the Backend
```bash
cd backend
python -m venv venv

# On Windows:
.\venv\Scripts\Activate.ps1
# On macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Configure AI Insights (Optional)
To enable the AI Business Insights feature, set your Gemini API key in your terminal before running the backend:
```bash
export GEMINI_API_KEY="your-api-key"
```

---

## 📁 Project Structure

```
SalesSight-AI/
├── frontend/             # Next.js Application
│   ├── src/app/          # Pages & Global Styles
│   └── src/components/   # Reusable UI Components
├── backend/              # FastAPI Application
│   ├── api/              # Route Controllers
│   ├── models/           # Pydantic Schemas
│   └── services/         # ML & Data Logic
└── datasets/             # Sample CSV files
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
