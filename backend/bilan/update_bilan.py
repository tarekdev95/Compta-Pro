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

@router.put("/{bilan_id}")
def update_bilan(bilan_id: int, data: dict, db: Session = Depends(get_db)):
    if not Bilan:
        raise HTTPException(status_code=404, detail="Table bilan not found")
    bilan = db.query(Bilan).filter(Bilan.id == bilan_id).first()
    if not bilan:
        raise HTTPException(status_code=404, detail="Bilan not found")
    for key, value in data.items():
        setattr(bilan, key, value)
    db.commit()
    return row_to_dict(bilan)
