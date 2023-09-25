from fastapi import Depends
from .database import SessionLocal
from sqlalchemy.orm import Session
from typing import Annotated


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dep = Annotated[Session, Depends(get_db)]

