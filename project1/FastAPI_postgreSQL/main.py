# main.py
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Annotated
from sqlalchemy.orm import Session, joinedload

import models
from database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

# ---- Schemas ----
class ChoiceIn(BaseModel):
    choice_text: str
    is_correct: bool

class ChoiceCreate(BaseModel):
    choice_text: str
    is_correct: bool
    question_id: int

class ChoiceOut(BaseModel):
    id: int
    choice_text: str
    is_correct: bool
    question_id: int

    model_config = {"from_attributes": True}

class QuestionCreate(BaseModel):
    question_text: str
    choices: List[ChoiceIn]

class QuestionOut(BaseModel):
    id: int
    question_text: str
    choices: List[ChoiceOut] = []

    model_config = {"from_attributes": True}

# ---- Endpoints ----
@app.post("/questions", response_model=QuestionOut)
async def create_question(payload: QuestionCreate, db: db_dependency):
    q = models.Question(question_text=payload.question_text)
    db.add(q)
    db.commit()
    db.refresh(q)

    for ch in payload.choices:
        db.add(models.Choice(
            choice_text=ch.choice_text,
            is_correct=ch.is_correct,
            question_id=q.id
        ))
    db.commit()
    db.refresh(q)

    q = db.query(models.Question)\
          .options(joinedload(models.Question.choices))\
          .filter(models.Question.id == q.id)\
          .first()
    return q

@app.post("/choices", response_model=ChoiceOut)
async def create_choice(payload: ChoiceCreate, db: db_dependency):
    # ensure question exists
    exists = db.query(models.Question.id)\
               .filter(models.Question.id == payload.question_id)\
               .first()
    if not exists:
        raise HTTPException(status_code=404, detail="Question not found")

    c = models.Choice(
        choice_text=payload.choice_text,
        is_correct=payload.is_correct,
        question_id=payload.question_id,
    )
    db.add(c)
    db.commit()
    db.refresh(c)
    return c

@app.get("/questions/{question_id}", response_model=QuestionOut)
async def read_question(question_id: int, db: db_dependency):
    result = db.query(models.Question).filter(models.Question.id == question_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Question not found")
    return result


@app.get("/choices/{choice_id}", response_model=ChoiceOut)
async def get_choice(choice_id: int, db: db_dependency):
    c = db.query(models.Choice).filter(models.Choice.id == choice_id).first()
    if not c:
        raise HTTPException(status_code=404, detail="Choice not found")
    return c

@app.get("/questions")
async def get_questions(db: db_dependency):
    return db.query(models.Question).all()

@app.get("/choices")
async def get_choices(db: db_dependency):
    return db.query(models.Choice).all()

@app.get("/questions/{question_id}/choices")
async def get_question_choices(question_id: int, db: db_dependency):
    return db.query(models.Choice).filter(models.Choice.question_id == question_id).all()


@app.delete("/questions/{question_id}")
async def delete_question(question_id: int, db: db_dependency):
    db.query(models.Question).filter(models.Question.id == question_id).delete()
    db.commit()
    return {"message": "Question deleted successfully"}

@app.delete("/choices/{choice_id}")
async def delete_choice(choice_id: int, db: db_dependency):
    db.query(models.Choice).filter(models.Choice.id == choice_id).delete()
    db.commit()
    return {"message": "Choice deleted successfully"}
    

@app.put("/questions/{question_id}")
async def update_question(question_id: int, question: QuestionCreate, db: db_dependency):
    db_question = db.query(models.Question).filter(models.Question.id == question_id).first()
    if not db_question:
        raise HTTPException(status_code=404, detail="Question not found")
    db_question.question_text = question.question_text
    db.commit()
    db.refresh(db_question)
    return db_question
    
@app.put("/choices/{choice_id}")
async def update_choice(choice_id: int, choice: ChoiceIn, db: db_dependency):
    db_choice = db.query(models.Choice).filter(models.Choice.id == choice_id).first()
    if not db_choice:
        raise HTTPException(status_code=404, detail="Choice not found")
    db_choice.choice_text = choice.choice_text
    db_choice.is_correct = choice.is_correct
    db.commit()
    db.refresh(db_choice)
    return db_choice

@app.get("/questions/{question_id}/choices")
async def get_question_choices(question_id: int, db: db_dependency):
    return db.query(models.Choice).filter(models.Choice.question_id == question_id).all()

@app.get("/choices/{choice_id}/question")
async def get_choice_question(choice_id: int, db: db_dependency):
    return db.query(models.Question).filter(models.Question.id == choice_id).first()

@app.get("/questions/{question_id}/choices/{choice_id}")
async def get_question_choice(question_id: int, choice_id: int, db: db_dependency):
    return db.query(models.Choice).filter(models.Choice.question_id == question_id, models.Choice.id == choice_id).first()
    