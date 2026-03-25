from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine
from db import get_db, SQLALCHEMY_DATABASE_URL
from ..models import UserCreate, User, APIResponse

# Configuration automap pour la table user
engine = create_engine(SQLALCHEMY_DATABASE_URL)
Base = automap_base()
Base.prepare(autoload_with=engine)
UserTable = getattr(Base.classes, 'user', None)

router = APIRouter(prefix="/users", tags=["users"])

def row_to_dict(row):
    return {c.name: getattr(row, c.name) for c in row.__table__.columns}

@router.post("/", response_model=APIResponse)
def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
    if not UserTable:
        raise HTTPException(status_code=404, detail="Table user not found")

    # Validation automatique via Pydantic
    user = UserTable(**user_data.model_dump())
    db.add(user)
    db.commit()
    db.refresh(user)

    return APIResponse(
        success=True,
        message="Utilisateur créé avec succès",
        data=row_to_dict(user)
    )
