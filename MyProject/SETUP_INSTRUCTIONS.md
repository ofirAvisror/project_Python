# Quick Setup Instructions

## ⚠️ IMPORTANT: Run This First!

Your project is missing the `.env` configuration file. Follow these steps to fix it:

### Windows Users:

```bash
# Run the automated setup script
setup-backend.bat
```

### Mac/Linux Users:

```bash
# Make the script executable and run it
chmod +x setup-backend.sh
./setup-backend.sh
```

### Manual Setup (if scripts don't work):

1. Navigate to the backend folder:

   ```bash
   cd MyProject/backend
   ```

2. Create a file named `.env` with these contents:

   ```
   DATABASE_URL=postgresql://fastapi_user:fastapi_password@localhost:5432/fastapi_react_db
   SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

3. Install backend dependencies:

   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   # OR
   source venv/bin/activate  # Mac/Linux

   pip install -r requirements.txt
   ```

4. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

## Starting the Application

### Option 1: Using Docker (Recommended)

```bash
docker-compose up
```

### Option 2: Manual Start

```bash
# Terminal 1 - Start backend
cd backend
venv\Scripts\activate  # Windows
# OR
source venv/bin/activate  # Mac/Linux
python run.py

# Terminal 2 - Start frontend
cd frontend
npm start
```

### Option 3: Development Script (After setup)

```bash
# Windows
start-dev.bat

# Mac/Linux
./start-dev.sh
```

## Database Setup

Make sure PostgreSQL is installed and running:

```sql
CREATE DATABASE fastapi_react_db;
CREATE USER fastapi_user WITH PASSWORD 'fastapi_password';
GRANT ALL PRIVILEGES ON DATABASE fastapi_react_db TO fastapi_user;
```

Or use Docker to start just the database:

```bash
docker-compose -f docker-compose-db-only.yml up
```

## Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
