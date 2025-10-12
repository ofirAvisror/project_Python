#!/bin/bash
echo "Setting up FastAPI Backend..."
echo ""

cd backend

echo "Creating .env file..."
cat > .env << EOF
DATABASE_URL=postgresql://fastapi_user:fastapi_password@localhost:5432/fastapi_react_db
SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
EOF

echo ".env file created successfully!"
echo ""

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    echo ""
fi

echo "Activating virtual environment and installing dependencies..."
source venv/bin/activate
pip install -r requirements.txt

echo ""
echo "Backend setup complete!"
echo ""
echo "To start the backend server, run:"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  python run.py"
echo ""

