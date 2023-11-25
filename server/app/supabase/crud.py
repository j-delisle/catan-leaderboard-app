from sqlalchemy.orm import Session

from . import models, schemas, auth


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(username: str, db: Session):
    return db.query(models.User).filter(models.User.username == username).first().id

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def get_users_usernames(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User.username, models.User.id).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.bcrypt_context.hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_game_record(data: schemas.GameRecordCreate, db: Session):
    winner_id = get_user_by_username(data.winner_username, db)
    record = models.GameRecord(winner_id=winner_id, expansion=data.expansion,
                      date=data.date, players=data.players)
    db.add(record)
    db.commit()
    db.refresh(record)
    return record

def update_user_win_count(user_id: int, db: Session):
    user = get_user(db, user_id)
    user.win_count += 1
    db.commit()
    db.refresh(user)
    return user