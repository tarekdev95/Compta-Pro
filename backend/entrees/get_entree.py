from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine
from db import get_db, SQLALCHEMY_DATABASE_URL

# Configuration automap pour la table entree
engine = create_engine(SQLALCHEMY_DATABASE_URL)
Base = automap_base()
Base.prepare(autoload_with=engine)
Entree = getattr(Base.classes, 'entree', None)

router = APIRouter(prefix="/entrees", tags=["entrees"])

def row_to_dict(row):
    return {c.name: getattr(row, c.name) for c in row.__table__.columns}

@router.get("/{entree_id}")
def get_entree(entree_id: int, db: Session = Depends(get_db)):
    if not Entree:
        raise HTTPException(status_code=404, detail="Table entree not found")
    entree = db.query(Entree).filter(Entree.id == entree_id).first()
    if not entree:
        raise HTTPException(status_code=404, detail="Entree not found")
    return row_to_dict(entree)
