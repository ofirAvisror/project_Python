#!/bin/bash

echo "==================================================="
echo "  FastAPI React TypeScript Project - Full Setup"
echo "==================================================="
echo ""

echo "[1/4] Setting up Backend..."
echo ""
cd backend

echo "Creating .env file..."
cat > .env << EOF
DATABASE_URL=postgresql://fastapi_user:fastapi_password@localhost:5432/fastapi_react_db
SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
EOF

echo ".env file created!"
echo ""

if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
    echo ""
fi

echo "Installing Python dependencies..."
source venv/bin/activate
pip install -r requirements.txt
deactivate

cd ..
echo "Backend setup complete!"
echo ""

echo "[2/4] Setting up Frontend..."
echo ""
cd frontend

echo "Installing Node.js dependencies (this may take a few minutes)..."
npm install

cd ..
echo "Frontend setup complete!"
echo ""

echo "[3/4] Database Setup"
echo ""
echo "You have 2 options for database:"
echo "  Option A: Use Docker (recommended)"
echo "    Run: docker-compose -f docker-compose-db-only.yml up -d"
echo ""
echo "  Option B: Use local PostgreSQL"
echo "    Create database: fastapi_react_db"
echo "    Create user: fastapi_user with password: fastapi_password"
echo ""

echo "[4/4] Setup Complete!"
echo ""
echo "==================================================="
echo "  ✅ ALL SETUP COMPLETE!"
echo "==================================================="
echo ""
echo "Your project is ready to use!"
echo ""
echo "NEXT STEPS:"
echo ""
echo "1. Start the database:"
echo "   docker-compose -f docker-compose-db-only.yml up -d"
echo ""
echo "2. Start the backend (in a new terminal):"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   python run.py"
echo ""
echo "3. Start the frontend (in another new terminal):"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "Your app will be available at:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8000"
echo "  API Docs: http://localhost:8000/docs"
echo ""
echo "OR use the quick-start script:"
echo "  ./start-dev.sh"
echo ""
echo "==================================================="

