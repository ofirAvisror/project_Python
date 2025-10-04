#!/bin/bash

echo "Starting FastAPI PostgreSQL React TypeScript Development Environment"
echo

echo "Starting PostgreSQL database..."
echo "Please make sure PostgreSQL is installed and running on your system"
echo

echo "Starting FastAPI backend..."
cd backend
gnome-terminal -- bash -c "python run.py; exec bash" &
cd ..

echo
echo "Starting React frontend..."
cd frontend
gnome-terminal -- bash -c "npm start; exec bash" &
cd ..

echo
echo "Development servers are starting..."
echo "Backend will be available at: http://localhost:8000"
echo "Frontend will be available at: http://localhost:3000"
echo
