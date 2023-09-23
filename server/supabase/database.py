import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from dotenv import load_dotenv
load_dotenv()

def get_db_url():
    user = os.getenv("POSTGRES_USER", "postgres")
    password = os.getenv("SUPABASE_DB_PASSWORD", "")
    server = os.getenv("POSTGRES_SERVER", "db")
    db = os.getenv("POSTGRES_DB", "app")
    port = os.getenv("POSTGRES_PORT", 5432)
    return f"postgresql://{user}:{password}@{server}:{port}/{db}"


SQLALCHEMY_DATABASE_URL = get_db_url()

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
