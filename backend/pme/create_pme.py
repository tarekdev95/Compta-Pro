from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine
from db import get_db, SQLALCHEMY_DATABASE_URL

# Configuration automap pour la table pme
engine = create_engine(SQLALCHEMY_DATABASE_URL)
Base = automap_base()
Base.prepare(autoload_with=engine)
Pme = getattr(Base.classes, 'pme', None)

router = APIRouter(prefix="/pme", tags=["pme"])

def row_to_dict(row):
    return {c.name: getattr(row, c.name) for c in row.__table__.columns}

@router.post("/")
def create_pme(data: dict, db: Session = Depends(get_db)):
    if not Pme:
        raise HTTPException(status_code=404, detail="Table pme not found")
    pme = Pme(**data)
    db.add(pme)
    db.commit()
    db.refresh(pme)
    return row_to_dict(pme)
