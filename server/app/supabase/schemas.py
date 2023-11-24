from typing import List
from fastapi import Form
from pydantic import BaseModel


class UserBase(BaseModel):
    email: str

class UserRetrieval(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str
    passwordConfirm: str

class User(UserBase):
    id: int
    token: str
    is_active: bool

    class Config:
        orm_mode = True


class GameRecordBase(BaseModel):
    winner_username: str
    expansion: str
    date: str

class GameRecordCreate(GameRecordBase):
    players: list[str]

class GameRecord(GameRecordBase):
    id: int
