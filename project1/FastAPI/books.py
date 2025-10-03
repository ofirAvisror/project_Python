from uuid import UUID, uuid4
from typing import List
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session


app = FastAPI()

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
def delete_book(book_id: UUID):
    counter = 0
    for b in BOOKS:
        counter += 1
        if b.id == book_id:
            del BOOKS[counter-1]
            return f"Book with id {book_id} has been deleted."
    raise HTTPException(status_code=404, detail=f"Book not found CANT DELETE {book_id}")
