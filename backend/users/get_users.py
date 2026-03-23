from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine
from db import get_db, SQLALCHEMY_DATABASE_URL

# Configuration automap pour la table user
engine = create_engine(SQLALCHEMY_DATABASE_URL)
Base = automap_base()
Base.prepare(autoload_with=engine)
User = getattr(Base.classes, 'user', None)

router = APIRouter(prefix="/users", tags=["users"])

def row_to_dict(row):
    return {c.name: getattr(row, c.name) for c in row.__table__.columns}

@router.get("/")
def get_users(db: Session = Depends(get_db)):
    if not User:
        raise HTTPException(status_code=404, detail="Table user not found")
    return [row_to_dict(user) for user in db.query(User).all()]
