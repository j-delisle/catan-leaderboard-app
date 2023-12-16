import os

from sqlalchemy.orm import Session
from sqlalchemy import desc

from typing import List

from . import models, schemas, auth
from services.supa import supabase_cli


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

def get_leaderboard_users(db: Session):
    return db.query(models.User).with_entities(models.User.id, models.User.email,
                                               models.User.username, models.User.win_count,
                                               models.User.games_played, models.User.win_percent).order_by(desc(models.User.win_count)).all()

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(username: str, db: Session):
    return db.query(models.User).filter(models.User.username == username).first().id

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def update_user_image(pfp, user_id, db: Session):
    try:
        bucket_loc = os.path.join('.', str(user_id), pfp.filename)
        m_ext = os.path.splitext(pfp.filename)[1].lower()
        mtype = f'image/{m_ext[1:]}'
        image_local_path = os.path.join('assets', pfp.filename)
        with open(image_local_path, 'rb') as f:
            supabase_cli.storage.from_("profile-images").upload(file=f,path=bucket_loc, file_options={"content-type": mtype})
    except Exception as e:
        msg = 'Error during upload to bucket: ' + str(e)
        return {'message': msg}
    finally:
        pfp.file.close()
    pub_img_url = supabase_cli.storage.from_('profile-images').get_public_url(bucket_loc)
    print(pub_img_url)
    return pub_img_url

def update_user_img_db_url(img_url, user_id, db: Session):
    user = get_user(user_id=user_id, db=db)
    user.pfp_url = img_url
    db.commit()
    db.refresh(user)
    return user

def update_players_game_stats(db: Session, players: List[int]):
    for player in players:
        user = get_user(db=db, user_id=player)
        user.games_played += 1
        user.win_percent = _get_win_percentage(user.win_count, user.games_played)
        db.commit()

def update_user_settings(exist_user: models.User, update_user: schemas.UserSettings, db: Session):
    update_data = update_user.model_dump(exclude_unset=True)
    for k,v in update_data.items():
        setattr(exist_user, k, v)
    db.commit()
    db.refresh(exist_user)
    return exist_user

def update_user_win_count(user_id: int, db: Session):
    user = get_user(db, user_id)
    user.win_count = user.win_count + 1
    db.commit()
    db.refresh(user)
    return user

def _get_win_percentage(wins, games_played):
    if games_played == 0:
        return 0
    return float(round((wins/games_played)*100, 1))