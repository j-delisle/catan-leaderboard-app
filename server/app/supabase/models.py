from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .database import Base


def get_default_username(ctx):
    return ctx.get_current_parameters()["email"].split('@')[0]

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, default=get_default_username, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    # Define a one-to-many relationship with GameRecord
    game_records = relationship('GameRecord', back_populates='winner')

class GameRecord(Base):
    __tablename__ = 'game_records'
    
    id = Column(Integer, primary_key=True, index=True)
    winner_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    expansion = Column(String, index=True)
    date = Column(DateTime, default=func.now())
    
    # Define a many-to-one relationship with User (the winner)
    winner = relationship('User', back_populates='game_records')