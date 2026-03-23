from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine
from db import get_db, SQLALCHEMY_DATABASE_URL

# Configuration automap pour la table depense_id
engine = create_engine(SQLALCHEMY_DATABASE_URL)
Base = automap_base()
Base.prepare(autoload_with=engine)
Depense = getattr(Base.classes, 'depense_id', None)

router = APIRouter(prefix="/depenses", tags=["depenses"])

def row_to_dict(row):
    return {c.name: getattr(row, c.name) for c in row.__table__.columns}

@router.put("/{depense_id}")
def update_depense(depense_id: int, data: dict, db: Session = Depends(get_db)):
    if not Depense:
        raise HTTPException(status_code=404, detail="Table depense_id not found")
    depense = db.query(Depense).filter(Depense.id == depense_id).first()
    if not depense:
        raise HTTPException(status_code=404, detail="Depense not found")
    for key, value in data.items():
        setattr(depense, key, value)
    db.commit()
    return row_to_dict(depense)
