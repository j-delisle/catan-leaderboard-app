import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from dotenv import load_dotenv
load_dotenv()

SQLALCHEMY_DATABASE_URL = f"postgresql://postgres:{os.environ.get('SUPABASE_DB_PASSWORD')}@db.yxbqqxcdppdqapplvefk.supabase.co:5432/postgres"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
