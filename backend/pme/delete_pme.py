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


@router.delete("/delete_pme/{pme_id}")

@router.delete("/{pme_id}")
def delete_pme(pme_id: int, db: Session = Depends(get_db)):
    if not Pme:
        raise HTTPException(status_code=404, detail="Table pme not found")
    pme = db.query(Pme).filter(Pme.id == pme_id).first()
    if not pme:
        raise HTTPException(status_code=404, detail="PME not found")
    db.delete(pme)
    db.commit()
    return {"message": "PME deleted"}
