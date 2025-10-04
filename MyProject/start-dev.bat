@echo off
echo Starting FastAPI PostgreSQL React TypeScript Development Environment
echo.

echo Starting PostgreSQL database...
echo Please make sure PostgreSQL is installed and running on your system
echo.

echo Starting FastAPI backend...
cd backend
start "FastAPI Backend" cmd /k "python run.py"
cd ..

echo.
echo Starting React frontend...
cd frontend
start "React Frontend" cmd /k "npm start"
cd ..

echo.
echo Development servers are starting...
echo Backend will be available at: http://localhost:8000
echo Frontend will be available at: http://localhost:3000
echo.
pause
