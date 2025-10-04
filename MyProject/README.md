# FastAPI PostgreSQL React TypeScript Project

A full-stack web application built with FastAPI, PostgreSQL, React, and TypeScript.

## Features

- **Backend (FastAPI)**:

  - RESTful API with FastAPI
  - PostgreSQL database with SQLAlchemy ORM
  - JWT authentication
  - User registration and login
  - CRUD operations for posts
  - CORS support for frontend integration

- **Frontend (React + TypeScript)**:
  - Modern React application with TypeScript
  - Material-UI components for beautiful UI
  - React Router for navigation
  - Context API for state management
  - Form validation with React Hook Form and Yup
  - Responsive design

## Project Structure

```
MyProject/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── database.py          # Database configuration
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── auth.py              # Authentication logic
│   ├── requirements.txt     # Python dependencies
│   └── env.example          # Environment variables template
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/      # Reusable React components
    │   ├── contexts/        # React Context providers
    │   ├── pages/           # Page components
    │   ├── services/        # API service functions
    │   ├── types/           # TypeScript type definitions
    │   ├── App.tsx          # Main App component
    │   └── index.tsx        # Application entry point
    ├── package.json         # Node.js dependencies
    └── tsconfig.json        # TypeScript configuration
```

## Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL 12+
- npm or yarn

## Setup Instructions

### 1. Database Setup

1. Install PostgreSQL on your system
2. Create a new database:
   ```sql
   CREATE DATABASE fastapi_react_db;
   ```
3. Create a user (optional):
   ```sql
   CREATE USER fastapi_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE fastapi_react_db TO fastapi_user;
   ```

### 2. Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd MyProject/backend
   ```

2. Create a virtual environment:

   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:

   - Windows:
     ```bash
     venv\\Scripts\\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. Create environment file:

   ```bash
   copy env.example .env
   ```

   (On macOS/Linux: `cp env.example .env`)

6. Update the `.env` file with your database credentials:

   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/fastapi_react_db
   SECRET_KEY=your-secret-key-here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

7. Run the application:
   ```bash
   uvicorn main:app --reload
   ```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd MyProject/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /register` - User registration
- `POST /login` - User login
- `GET /me` - Get current user info

### Posts

- `GET /posts` - Get all published posts
- `GET /posts/{id}` - Get specific post
- `POST /posts` - Create new post (authenticated)
- `PUT /posts/{id}` - Update post (authenticated)
- `DELETE /posts/{id}` - Delete post (authenticated)

## Usage

1. Start both backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. Register a new account or login
4. Create and manage posts
5. View all published posts

## Development

### Backend Development

- The FastAPI app includes automatic API documentation at `http://localhost:8000/docs`
- Database tables are created automatically on first run
- Use `--reload` flag for development hot-reloading

### Frontend Development

- React development server includes hot-reloading
- TypeScript compilation is handled automatically
- Material-UI components are pre-configured

## Production Deployment

### Backend

1. Set up a production PostgreSQL database
2. Update environment variables for production
3. Use a production ASGI server like Gunicorn with Uvicorn workers
4. Set up proper CORS origins for your domain

### Frontend

1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Serve the `build` folder with a web server like Nginx
3. Update API URLs for production backend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
