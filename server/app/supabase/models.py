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


class GameRecord(Base):
    __tablename__ = 'game_records'
    
    id = Column(Integer, primary_key=True, index=True)
    winner_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    expansion = Column(String, index=True)
    date = Column(DateTime, default=func.now())
    
    # Define the many-to-many relationship with User
    players = relationship('User', secondary='game_record_players')


class GameRecordPlayer(Base):
    __tablename__ = 'game_record_players'
    
    id = Column(Integer, primary_key=True, index=True)
    game_record_id = Column(Integer, ForeignKey('game_records.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    
    # Define a back-reference to GameRecord
    game_record = relationship('GameRecord', back_populates='game_record_players')
    
    # Define a back-reference to User
    user = relationship('User', back_populates='game_record_players')
