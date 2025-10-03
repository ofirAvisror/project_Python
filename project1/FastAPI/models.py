from databace import Base, engine

class Book(Base):
    __tablename__ = "books"
    id = Column(integer, primary_key=True, index=True)
    title = Column(Stringe)
    author = Column(String)
    description = Column(String)
    rating = Column(Integer)