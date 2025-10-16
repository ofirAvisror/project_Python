# database.py
# this file is used to connect to the database
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker, declarative_base

url = URL.create(
    drivername="postgresql+psycopg2",
    username="postgres",
    password="ofir2002",  # plain text; SQLAlchemy will handle escaping
    host="localhost",
    port=5432,
    database="QuizApplicationOA",
)
engine = create_engine(url, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()
