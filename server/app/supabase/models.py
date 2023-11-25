from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Enum, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .database import Base


def get_default_username(ctx):
    return ctx.get_current_parameters()["email"].split('@')[0]

EXPANSION_OPTIONS = Enum(
    'Catan Base',
    'Seafarers',
    'Cities & Knights',
    'Explorers & Pirates',
    'Extended',
    'Game of Thrones',
    name='expansion_options'
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, default=get_default_username, unique=True, index=True)
    win_count = Column(Integer, default=0, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)

    # Define a one-to-many relationship with GameRecord
    game_records = relationship('GameRecord', back_populates='winner')

class GameRecord(Base):
    __tablename__ = 'game_records'
    
    id = Column(Integer, primary_key=True, index=True)
    winner_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    expansion = Column(EXPANSION_OPTIONS, index=True)
    date = Column(DateTime, default=func.now())
    players = Column(ARRAY(String))
    
    # Define a many-to-one relationship with User (the winner)
    winner = relationship('User', back_populates='game_records')