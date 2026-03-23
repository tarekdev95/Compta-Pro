from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine
from db import get_db, SQLALCHEMY_DATABASE_URL

# Configuration automap pour la table bilan
engine = create_engine(SQLALCHEMY_DATABASE_URL)
Base = automap_base()
Base.prepare(autoload_with=engine)
Bilan = getattr(Base.classes, 'bilan', None)

router = APIRouter(prefix="/bilan", tags=["bilan"])

def row_to_dict(row):
    return {c.name: getattr(row, c.name) for c in row.__table__.columns}

@router.get("/")
def get_bilans(db: Session = Depends(get_db)):
    if not Bilan:
        raise HTTPException(status_code=404, detail="Table bilan not found")
    return [row_to_dict(bilan) for bilan in db.query(Bilan).all()]
