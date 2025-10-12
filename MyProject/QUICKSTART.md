# 🚀 QUICKSTART GUIDE

## ⚡ The Fastest Way to Get Started

### Option 1: Automated Setup (RECOMMENDED)

#### Windows:

```bash
setup-backend.bat
```

#### Mac/Linux:

```bash
chmod +x setup-backend.sh
./setup-backend.sh
```

This will automatically:

- ✅ Create the `.env` configuration file
- ✅ Set up Python virtual environment
- ✅ Install all backend dependencies

---

### Option 2: Using Docker (Easiest - No Setup Required!)

**Prerequisites:** Only Docker and Docker Compose installed

```bash
# Start everything (database + backend + frontend)
docker-compose up

# Or start in detached mode
docker-compose up -d
```

That's it! Your app will be running at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

### Option 3: Manual Setup (If scripts don't work)

#### Step 1: Backend Setup

1. **Create the `.env` file** in `backend/` folder:

   ```
   DATABASE_URL=postgresql://fastapi_user:fastapi_password@localhost:5432/fastapi_react_db
   SECRET_KEY=09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

2. **Install Backend Dependencies:**

   ```bash
   cd backend
   python -m venv venv

   # Windows:
   venv\Scripts\activate

   # Mac/Linux:
   source venv/bin/activate

   pip install -r requirements.txt
   ```

#### Step 2: Frontend Setup

```bash
cd frontend
npm install
```

#### Step 3: Database Setup

**Option A: Using Docker (Recommended)**

```bash
docker-compose -f docker-compose-db-only.yml up -d
```

**Option B: Local PostgreSQL**

Install PostgreSQL and run:

```sql
CREATE DATABASE fastapi_react_db;
CREATE USER fastapi_user WITH PASSWORD 'fastapi_password';
GRANT ALL PRIVILEGES ON DATABASE fastapi_react_db TO fastapi_user;
```

#### Step 4: Start the Application

**Terminal 1 - Backend:**

```bash
cd backend
venv\Scripts\activate  # Windows
# OR
source venv/bin/activate  # Mac/Linux

python run.py
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm start
```

---

## 🎯 Access Your Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs (Swagger UI)
- **Alternative API Docs:** http://localhost:8000/redoc (ReDoc)

---

## 🧪 Test the Application

1. Open http://localhost:3000
2. Click "Get Started" or "Register"
3. Create an account with:
   - Email: test@example.com
   - Username: testuser
   - Password: test123
4. Login and create your first post!

---

## 🐛 Troubleshooting

### Issue: "Module not found" errors in backend

**Solution:** Make sure you activated the virtual environment

```bash
cd backend
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
```

### Issue: "Cannot connect to database"

**Solution:**

- Make sure PostgreSQL is running
- Or use Docker: `docker-compose -f docker-compose-db-only.yml up -d`
- Check your `.env` file has the correct DATABASE_URL

### Issue: Frontend won't start / npm errors

**Solution:**

```bash
cd frontend
rm -rf node_modules package-lock.json  # Mac/Linux
# OR
rmdir /s node_modules & del package-lock.json  # Windows

npm install
```

### Issue: Port already in use

**Solution:**

- Backend (8000): Kill the process or change port in `backend/run.py`
- Frontend (3000): Kill the process or set PORT environment variable

### Issue: CORS errors

**Solution:** Make sure backend is running on http://localhost:8000 and frontend on http://localhost:3000

---

## 📝 Development Tips

- Backend auto-reloads on file changes (when using `python run.py`)
- Frontend auto-reloads on file changes (when using `npm start`)
- Check API documentation at http://localhost:8000/docs
- Database tables are created automatically on first run

---

## 🛑 Stopping the Application

### Docker:

```bash
docker-compose down
```

### Manual:

- Press `Ctrl+C` in both terminal windows

---

## 📚 Next Steps

- Check `README.md` for detailed documentation
- Explore the API at http://localhost:8000/docs
- Customize the theme in `frontend/src/App.tsx`
- Add new API endpoints in `backend/main.py`
- Create new pages in `frontend/src/pages/`

---

## 🆘 Still Having Issues?

1. Make sure you have the required versions:

   - Python 3.11+
   - Node.js 18-20
   - PostgreSQL 12+ (or Docker)

2. Check that all ports are free:

   - 3000 (Frontend)
   - 8000 (Backend)
   - 5432 (PostgreSQL)

3. Verify `.env` file exists in `backend/` folder

4. Try the Docker option - it handles all dependencies automatically!
