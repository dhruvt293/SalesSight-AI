from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from models.schemas import ForecastRequest, InsightRequest, DashboardMetrics, BusinessInsights
from services import data_processing, forecasting, insights
import os

router = APIRouter()

@router.post("/upload")
async def upload_dataset(file: UploadFile = File(...)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")
        
    contents = await file.read()
    try:
        result = data_processing.save_and_clean_data(contents)
        return {"message": "Data uploaded successfully", "stats": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/metrics", response_model=DashboardMetrics)
def get_metrics():
    try:
        data = data_processing.get_metrics_and_chart()
        return data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/forecast")
def generate_forecast(request: ForecastRequest):
    try:
        forecast_data = forecasting.generate_forecast(request.months)
        return {"forecast": forecast_data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/insights", response_model=BusinessInsights)
def get_insights(request: InsightRequest):
    try:
        result = insights.generate_insights(request.metrics.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/report")
def export_report():
    # Placeholder for PDF generation
    # For now, return a simple text or error saying not implemented yet
    # Or implement basic reportlab pdf
    from reportlab.pdfgen import canvas
    
    report_path = "data/report.pdf"
    c = canvas.Canvas(report_path)
    c.drawString(100, 750, "SalesSight AI - Business Report")
    c.drawString(100, 730, "This is a generated report with KPIs, Forecasts, and Insights.")
    c.save()
    
    return FileResponse(report_path, media_type='application/pdf', filename="SalesSight_Report.pdf")
