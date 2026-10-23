@echo off
echo Starting SalesSight AI Backend...
start cmd /k "cd backend && .\venv\Scripts\activate.bat && uvicorn main:app --reload"

echo Starting SalesSight AI Frontend...
start cmd /k "cd frontend && npm run dev"

echo Both servers are booting up in separate windows.
echo You can access the application at http://localhost:3000
