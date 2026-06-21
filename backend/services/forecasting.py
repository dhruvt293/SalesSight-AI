import pandas as pd
import os
from prophet import Prophet
from services.data_processing import DATA_PATH

def generate_forecast(months: int) -> list:
    if not os.path.exists(DATA_PATH):
        raise ValueError("No data available")
        
    df = pd.read_csv(DATA_PATH)
    df['Date'] = pd.to_datetime(df['Date'])
    
    # Prepare for Prophet
    prophet_df = pd.DataFrame({
        'ds': df['Date'],
        'y': df['Sales']
    })
    
    model = Prophet(yearly_seasonality=True, weekly_seasonality=False, daily_seasonality=False)
    model.fit(prophet_df)
    
    # Create future dataframe
    future = model.make_future_dataframe(periods=months, freq='ME') # Month End frequency
    forecast = model.predict(future)
    
    # Extract only the future predictions (where 'ds' > max date in original data)
    max_date = df['Date'].max()
    future_forecast = forecast[forecast['ds'] > max_date].copy()
    
    forecast_data = []
    for _, row in future_forecast.iterrows():
        forecast_data.append({
            "date": row['ds'].strftime("%Y-%m-%d"),
            "sales": None,
            "forecast": float(row['yhat'])
        })
        
    return forecast_data
