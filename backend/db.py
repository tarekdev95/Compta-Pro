from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Configuration base de données
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:root@localhost/comptapro_db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()