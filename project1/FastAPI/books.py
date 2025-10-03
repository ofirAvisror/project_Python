from uuid import UUID, uuid4
from typing import List
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session


app = FastAPI()

models.base.metadata.create_all(bind=engine)

def get_db():
    
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

class Book(BaseModel):
    id: UUID = Field(default_factory=uuid4)
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
    BOOKS.append(book)
    return book


@app.put("/{book_id}")
def update_book(book_id: UUID, book: Book):
    counter = 0
    for b in BOOKS:
        counter += 1
        if b.id == book_id:
            BOOKS[counter-1] = book
            return BOOKS[counter-1]
    raise HTTPException(status_code=404, detail="Book not found"+{book_id})


@app.delete("/{book_id}")
def delete_book(book_id: UUID):
    counter = 0
    for b in BOOKS:
        counter += 1
        if b.id == book_id:
            del BOOKS[counter-1]
            return f"Book with id {book_id} has been deleted."
    raise HTTPException(status_code=404, detail="Book not found CANT DELETE"+{book_id})
