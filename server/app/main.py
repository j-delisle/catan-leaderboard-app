from fastapi import FastAPI, HTTPException, Depends
from starlette import status
from typing import Annotated
from sqlalchemy.orm import Session

from supabase import crud, models, schemas, auth
from supabase.database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth.router)

# Dependency Injection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dep = Annotated[Session, Depends(get_db)]
user_dep = Annotated[dict, Depends(auth.get_current_user)]


@app.get("/", status_code=status.HTTP_200_OK)
async def user(user: user_dep, db: db_dep):
    if user is None:
        raise HTTPException(status_code=401, detail='Authorization Failed')
    return {'user': user}

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: db_dep):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=list[schemas.User])
def read_users(db: db_dep, skip: int = 0, limit: int = 100):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: db_dep):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.get('/expansion_options')
async def get_expansion_options():
    from supabase.models import EXPANSION_OPTIONS
    return {'expansion_options': EXPANSION_OPTIONS.enums}

@app.post("/record_game") #TODO add in reponse model
async def record_game(data: schemas.GameRecordBase, db: db_dep):
    crud.create_game_record(data, db)

# @app.post("/users/{user_id}/items/", response_model=schemas.Item)
# def create_item_for_user(
#     user_id: int, item: schemas.ItemCreate, db: db_dep
# ):
#     return crud.create_user_item(db=db, item=item, user_id=user_id)


# @app.get("/items/", response_model=list[schemas.Item])
# def read_items(db: db_dep, skip: int = 0, limit: int = 100):
#     items = crud.get_items(db, skip=skip, limit=limit)
#     return items
