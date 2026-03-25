from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine
from db import get_db, SQLALCHEMY_DATABASE_URL
from ..models import UserCreate, User, APIResponse
from pydantic import BaseModel
import bcrypt
import jwt
from datetime import datetime, timedelta

# Configuration automap pour la table user
engine = create_engine(SQLALCHEMY_DATABASE_URL)
Base = automap_base()
Base.prepare(autoload_with=engine)
UserTable = getattr(Base.classes, 'user', None)

router = APIRouter(prefix="/auth", tags=["auth"])

# Modèles pour l'authentification
class LoginRequest(BaseModel):
    email: str
    mot_de_passe: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

SECRET_KEY = "your-secret-key-here"  # À changer en production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_password_hash(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def row_to_dict(row):
    return {c.name: getattr(row, c.name) for c in row.__table__.columns}

@router.post("/login", response_model=TokenResponse)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    if not UserTable:
        raise HTTPException(status_code=404, detail="Table user not found")

    # Rechercher l'utilisateur par email
    user = db.query(UserTable).filter(UserTable.email == login_data.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")

    # Vérifier le mot de passe
    if not verify_password(login_data.mot_de_passe, user.mot_de_passe):
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")

    # Créer le token d'accès
    access_token = create_access_token(data={"sub": str(user.user_id)})

    return TokenResponse(
        access_token=access_token,
        user=row_to_dict(user)
    )

@router.post("/register", response_model=APIResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    if not UserTable:
        raise HTTPException(status_code=404, detail="Table user not found")

    # Vérifier si l'utilisateur existe déjà
    existing_user = db.query(UserTable).filter(UserTable.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Un utilisateur avec cet email existe déjà")

    # Hasher le mot de passe
    hashed_password = get_password_hash(user_data.mot_de_passe)

    # Créer l'utilisateur
    user_dict = user_data.model_dump()
    user_dict['mot_de_passe'] = hashed_password

    user = UserTable(**user_dict)
    db.add(user)
    db.commit()
    db.refresh(user)

    return APIResponse(
        success=True,
        message="Utilisateur créé avec succès",
        data=row_to_dict(user)
    )