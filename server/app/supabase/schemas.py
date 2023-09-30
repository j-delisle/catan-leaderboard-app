from typing import List

from pydantic import BaseModel


class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True


class GameRecordBase(BaseModel):
    winner_username: str
    expansion: str
    date: str

class GameRecordCreate(GameRecordBase):
    pass

class GameRecord(GameRecordBase):
    id: int
