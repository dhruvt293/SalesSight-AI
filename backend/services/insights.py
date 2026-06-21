import google.generativeai as genai
import os
import json

# Try to get API key from environment, though the user might not have set it yet
api_key = os.environ.get("GEMINI_API_KEY", "")
if api_key:
    genai.configure(api_key=api_key)

def generate_insights(metrics: dict) -> dict:
    if not api_key:
        return {
            "observations": ["Gemini API key not configured."],
            "risks": ["Cannot generate AI insights without API key."],
            "opportunities": ["Set GEMINI_API_KEY environment variable."],
            "recommendations": ["Restart backend after setting the key."]
        }
        
    prompt = f"""
    You are a business analyst.
    Analyze these sales metrics:
    Total Revenue: {metrics.get('total_revenue')}
    Average Monthly Sales: {metrics.get('avg_monthly_sales')}
    Highest Month: {metrics.get('highest_month')}
    Growth Rate: {metrics.get('growth_rate')}

    Generate:
    1. Key observations
    2. Risks
    3. Opportunities
    4. Recommendations

    Return concise business insights strictly in the following JSON format:
    {{
        "observations": ["obs1", "obs2"],
        "risks": ["risk1", "risk2"],
        "opportunities": ["opp1", "opp2"],
        "recommendations": ["rec1", "rec2"]
    }}
    """
    
    try:
        model = genai.GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(prompt)
        text = response.text
        
        # Clean markdown code block if present
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0]
        elif "```" in text:
            text = text.split("```")[1].split("```")[0]
            
        result = json.loads(text.strip())
        return result
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return {
            "observations": ["Failed to generate insights."],
            "risks": [str(e)],
            "opportunities": [],
            "recommendations": []
        }
