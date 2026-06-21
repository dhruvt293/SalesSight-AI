import pandas as pd
import os

DATA_PATH = "data/current_data.csv"

def save_and_clean_data(file_bytes: bytes) -> dict:
    # Write bytes to temp file to read with pandas
    with open("data/temp.csv", "wb") as f:
        f.write(file_bytes)
        
    try:
        df = pd.read_csv("data/temp.csv")
    except Exception as e:
        raise ValueError("Invalid CSV format")

    initial_rows = len(df)
    
    # Validation: missing values, invalid dates, duplicates
    # Rename columns if needed, assuming "Date" and "Sales"
    if "Date" not in df.columns or "Sales" not in df.columns:
        # try lowercase
        if "date" in df.columns and "sales" in df.columns:
            df.rename(columns={"date": "Date", "sales": "Sales"}, inplace=True)
        else:
            raise ValueError("CSV must contain 'Date' and 'Sales' columns")
            
    df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
    
    missing_values = df.isnull().sum().sum()
    df.dropna(inplace=True)
    
    duplicates = df.duplicated().sum()
    df.drop_duplicates(inplace=True)
    
    df.sort_values(by="Date", inplace=True)
    
    # Save cleaned data
    df.to_csv(DATA_PATH, index=False)
    
    return {
        "rows_uploaded": initial_rows,
        "missing_values": int(missing_values),
        "duplicates_removed": int(duplicates)
    }

def format_currency(value: float) -> str:
    return f"₹{value:,.0f}"

def get_metrics_and_chart() -> dict:
    if not os.path.exists(DATA_PATH):
        raise ValueError("No data available")
        
    df = pd.read_csv(DATA_PATH)
    df['Date'] = pd.to_datetime(df['Date'])
    
    total_revenue = df['Sales'].sum()
    avg_monthly_sales = df['Sales'].mean()
    
    # Highest month
    highest_row = df.loc[df['Sales'].idxmax()]
    highest_month = highest_row['Date'].strftime("%B %Y")
    
    # Growth rate (last month vs previous month)
    if len(df) >= 2:
        last_month = df.iloc[-1]['Sales']
        prev_month = df.iloc[-2]['Sales']
        if prev_month > 0:
            growth = ((last_month - prev_month) / prev_month) * 100
        else:
            growth = 0
    else:
        growth = 0
        
    growth_str = f"+{growth:.1f}%" if growth >= 0 else f"{growth:.1f}%"
    
    # Calculate moving average
    df['moving_average'] = df['Sales'].rolling(window=3, min_periods=1).mean()
    
    # Prepare chart data
    chart_data = []
    for _, row in df.iterrows():
        chart_data.append({
            "date": row['Date'].strftime("%Y-%m-%d"),
            "sales": float(row['Sales']),
            "moving_average": float(row['moving_average'])
        })
        
    return {
        "kpis": {
            "total_revenue": format_currency(total_revenue),
            "avg_monthly_sales": format_currency(avg_monthly_sales),
            "highest_month": highest_month,
            "growth_rate": growth_str
        },
        "chart_data": chart_data
    }
