@echo off
echo Setting up FastAPI Backend...
echo.

cd backend

echo Creating .env file...
(
echo DATABASE_URL=postgresql://fastapi_user:fastapi_password@localhost:5432/fastapi_react_db
echo SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
echo ALGORITHM=HS256
echo ACCESS_TOKEN_EXPIRE_MINUTES=30
) > .env

echo .env file created successfully!
echo.

if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
    echo.
)

echo Activating virtual environment and installing dependencies...
call venv\Scripts\activate.bat
pip install -r requirements.txt

echo.
echo Backend setup complete!
echo.
echo To start the backend server, run:
echo   cd backend
echo   venv\Scripts\activate
echo   python run.py
echo.
pause

