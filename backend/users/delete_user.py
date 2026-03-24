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

<<<<<<< HEAD
@router.delete("/delete_user/{user_id}")
=======
@router.delete("/{user_id}")
>>>>>>> 1516a7ba73ea0cdfbf1cf6f587e0ba59b57f3eff
def delete_user(user_id: int, db: Session = Depends(get_db)):
    if not User:
        raise HTTPException(status_code=404, detail="Table user not found")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}
