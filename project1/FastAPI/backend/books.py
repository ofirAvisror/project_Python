from uuid import UUID, uuid4
from typing import List
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session


app = FastAPI()

# Enable CORS for local React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

class Book(BaseModel):
    title: str = Field(min_length=1)
    author: str = Field(min_length=1, max_length=100)
    description: str = Field(min_length=1, max_length=100)
    rating: int = Field(gt=-1, lt=101)

BOOKS = []


@app.get("/")
def read_api(db: Session = Depends(get_db)):
    return db.query(models.Book).all()


@app.post("/")
def create_book(book: Book, db: Session = Depends(get_db)):
    book_model = models.Book()
    book_model.title = book.title
    book_model.author = book.author
    book_model.description = book.description
    book_model.rating = book.rating
    
    db.add(book_model)
    db.commit()    
    return book


@app.put("/")
def update_book(book_id: int, book: Book, db: Session = Depends(get_db)):
    book_model =db.query(models.Book).filter(models.Book.id == str(book_id)).first()
    if book_model is None:
        raise HTTPException(
            status_code=404,
            detail=f"Book with the id {book_id} not found",
        )
    book_model.title = book.title
    book_model.author = book.author
    book_model.description = book.description
    book_model.rating = book.rating
    db.add(book_model)
    db.commit()
    return book

@app.delete("/{book_id}")
def delete_book(book_id: int ,db: Session = Depends(get_db)):
    book_model = db.query(models.Book).filter(models.Book.id == str(book_id)).first()
    if book_model is None:
        raise HTTPException(
            status_code=404,
            detail=f"Book with the id {book_id} not found",
        )
    db.query(models.Book).filter(models.Book.id == str(book_id)).delete()
    db.commit()
