from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, date
from decimal import Decimal

# ==================== USER MODELS ====================

class UserBase(BaseModel):
    nom: str
    email: EmailStr
    telephone: int

class UserCreate(UserBase):
    mot_de_passe: str

class UserUpdate(BaseModel):
    nom: Optional[str] = None
    email: Optional[EmailStr] = None
    telephone: Optional[int] = None
    mot_de_passe: Optional[str] = None

class User(UserBase):
    user_id: int

    class Config:
        from_attributes = True

# ==================== PME MODELS ====================

class PMEBase(BaseModel):
    nom: str
    ville: str
    user_id: int
    num_registre: int
    email: EmailStr
    tel: int
    type_dabonnement: str

class PMECreate(PMEBase):
    pass

class PMEUpdate(BaseModel):
    nom: Optional[str] = None
    ville: Optional[str] = None
    user_id: Optional[int] = None
    num_registre: Optional[int] = None
    email: Optional[EmailStr] = None
    tel: Optional[int] = None
    type_dabonnement: Optional[str] = None

class PME(PMEBase):
    pme_id: int

    class Config:
        from_attributes = True

# ==================== ENTREE MODELS ====================

class EntreeBase(BaseModel):
    montant_entree: str  # Gardé en string selon la DB
    date: datetime
    User_id: int
    categorie_entree: str
    statut_entree: str
    description_entree: str
    pme_id_entree: int

class EntreeCreate(EntreeBase):
    pass

class EntreeUpdate(BaseModel):
    montant_entree: Optional[str] = None
    date: Optional[datetime] = None
    User_id: Optional[int] = None
    categorie_entree: Optional[str] = None
    statut_entree: Optional[str] = None
    description_entree: Optional[str] = None
    pme_id_entree: Optional[int] = None

class Entree(EntreeBase):
    entree_id: int
    update_date: datetime

    class Config:
        from_attributes = True

# ==================== DEPENSE MODELS ====================

class DepenseBase(BaseModel):
    montant_depense: int
    user_id_depense: int
    categorie_depense: str
    statut_depense: str
    description_depense: str
    pme_id_depense: int

class DepenseCreate(DepenseBase):
    pass

class DepenseUpdate(BaseModel):
    montant_depense: Optional[int] = None
    user_id_depense: Optional[int] = None
    categorie_depense: Optional[str] = None
    statut_depense: Optional[str] = None
    description_depense: Optional[str] = None
    pme_id_depense: Optional[int] = None

class Depense(DepenseBase):
    depense_id_depense: int
    create_date: datetime
    update_date: datetime

    class Config:
        from_attributes = True

# ==================== BILAN MODELS ====================

class BilanBase(BaseModel):
    create_date: date
    user_id: int
    pme_id: int
    Periode: int
    total_entrees: int
    total_depenses: int

class BilanCreate(BilanBase):
    pass

class BilanUpdate(BaseModel):
    create_date: Optional[date] = None
    user_id: Optional[int] = None
    pme_id: Optional[int] = None
    Periode: Optional[int] = None
    total_entrees: Optional[int] = None
    total_depenses: Optional[int] = None

class Bilan(BilanBase):
    bilan_id: int

    class Config:
        from_attributes = True

# ==================== RESPONSE MODELS ====================

class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None

class PaginatedResponse(BaseModel):
    success: bool
    message: str
    data: list
    total: int
    page: int
    limit: int

# ==================== AUTHENTICATION MODELS ====================

class LoginRequest(BaseModel):
    email: EmailStr
    mot_de_passe: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: User

class RegisterRequest(UserCreate):
    pass