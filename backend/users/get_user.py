from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine
from db import get_db, SQLALCHEMY_DATABASE_URL

# Automap configuration
engine = create_engine(SQLALCHEMY_DATABASE_URL)
Base = automap_base()
Base.prepare(autoload_with=engine)

# Récupération du modèle User
User = getattr(Base.classes, 'User', None) or getattr(Base.classes, 'user', None)

router = APIRouter(prefix="/user", tags=["user"])

def row_to_dict(row):
    return {c.name: getattr(row, c.name) for c in row.__table__.columns}

@router.get("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    if User is None:
        raise HTTPException(status_code=500, detail="User model not found in automap")

    user = db.query(User).filter(User.user_id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return row_to_dict(user)