from pydantic import BaseModel
from typing import List, Optional

class ForecastRequest(BaseModel):
    months: int = 6

class KPI(BaseModel):
    total_revenue: str
    avg_monthly_sales: str
    highest_month: str
    growth_rate: str

class ChartDataPoint(BaseModel):
    date: str
    sales: float
    moving_average: Optional[float] = None
    forecast: Optional[float] = None

class DashboardMetrics(BaseModel):
    kpis: KPI
    chart_data: List[ChartDataPoint]

class InsightRequest(BaseModel):
    metrics: KPI

class BusinessInsights(BaseModel):
    observations: List[str]
    risks: List[str]
    opportunities: List[str]
    recommendations: List[str]
