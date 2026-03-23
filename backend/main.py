from fastapi import FastAPI, Depends
from sqlalchemy import create_engine
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session

from db import SQLALCHEMY_DATABASE_URL, get_db

app = FastAPI()

engine = create_engine(SQLALCHEMY_DATABASE_URL)
Base = automap_base()
Base.prepare(engine, reflect=True)

TABLES = {
    "bilan": getattr(Base.classes, "bilan", None),
    "depense": getattr(Base.classes, "depense", None),
    "entree": getattr(Base.classes, "entree", None),
    "pme": getattr(Base.classes, "pme", None),
    "user": getattr(Base.classes, "user", None),
}

def row_to_dict(row):
    return {c.name: getattr(row, c.name) for c in row.__table__.columns}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/bilan", response_model=None)
def get_bilan(db: Session = Depends(get_db)):
    model = TABLES.get("bilan")
    if model is None:
        return {"error": "Table not found"}
    return [row_to_dict(r) for r in db.query(model).all()]

@app.get("/depense", response_model=None)
def get_depense(db: Session = Depends(get_db)):
    model = TABLES.get("depense")
    if model is None:
        return {"error": "Table not found"}
    return [row_to_dict(r) for r in db.query(model).all()]

@app.get("/entree", response_model=None)
def get_entree(db: Session = Depends(get_db)):
    model = TABLES.get("entree")
    if model is None:
        return {"error": "Table not found"}
    return [row_to_dict(r) for r in db.query(model).all()]

@app.get("/pme", response_model=None)
def get_pme(db: Session = Depends(get_db)):
    model = TABLES.get("pme")
    if model is None:
        return {"error": "Table not found"}
    return [row_to_dict(r) for r in db.query(model).all()]

@app.get("/user", response_model=None)
def get_user(db: Session = Depends(get_db)):
    model = TABLES.get("user")
    if model is None:
        return {"error": "Table not found"}
    return [row_to_dict(r) for r in db.query(model).all()]

@app.post("/user", response_model=None)
def create_user(name: str, email: str, db: Session = Depends(get_db)):
    model = TABLES.get("user")
    if model is None:
        return {"error": "Table not found"}
    new_user = model(name=name, email=email)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return row_to_dict(new_user)