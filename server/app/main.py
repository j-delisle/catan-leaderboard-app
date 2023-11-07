from fastapi import FastAPI, HTTPException, Depends
from starlette import status
from typing import Annotated
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware import Middleware

from supabase import crud, models, schemas, auth
from supabase.database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth.router)


# TODO CORS DEPLOYMENT - check security
# origins = [
#     'http://localhost:5173/',
#     'localhost:5173'
# ]
# passing multiple hosts was causing CORS failure - preflight

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

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
    if user.password != user.passwordConfirm:
        raise HTTPException(status_code=400, detail='Passwords do not match')
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    created_user = crud.create_user(db=db, user=user)
    token = auth.create_access_token(username=created_user.email, user_id=created_user.id)
    created_user.token = token
    return created_user


@app.get("/users/", response_model=list[schemas.UserRetrieval])
def read_users(db: db_dep, skip: int = 0, limit: int = 100):
    users = crud.get_users_usernames(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: db_dep):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.get('/expansion_options')
async def get_expansion_options():
    return {models.EXPANSION_OPTIONS.name: models.EXPANSION_OPTIONS.enums}

@app.post("/record_game") #TODO add in reponse model
async def record_game(data: schemas.GameRecordCreate, db: db_dep):
    crud.create_game_record(data, db)

