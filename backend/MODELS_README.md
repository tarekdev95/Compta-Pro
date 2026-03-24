# Modèles de Base - ComptaPro API

Ce fichier contient tous les modèles Pydantic et schémas SQLAlchemy pour l'API ComptaPro.

## Structure des Modèles

### Modèles Pydantic (`models.py`)

Chaque entité a 4 modèles :
- **Base** : Champs communs requis
- **Create** : Pour la création (hérite de Base)
- **Update** : Champs optionnels pour les mises à jour
- **Response** : Modèle complet avec ID (pour les réponses)

### Schémas SQLAlchemy (`schemas.py`)

Modèles déclaratifs SQLAlchemy avec relations définies (alternative à automap).

## Utilisation

### Import des modèles

```python
from backend.models import UserCreate, User, PME, APIResponse
from backend.schemas import User as UserSchema, PME as PMESchema
```

### Exemple d'utilisation dans une route

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.models import UserCreate, APIResponse
from db import get_db

router = APIRouter()

@router.post("/users/", response_model=APIResponse)
def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
    # Validation automatique des données
    # user_data est maintenant validé selon le schéma UserCreate
    new_user = UserTable(**user_data.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return APIResponse(
        success=True,
        message="Utilisateur créé avec succès",
        data=row_to_dict(new_user)
    )
```

## Avantages des Modèles Pydantic

1. **Validation automatique** : Types de données, formats, contraintes
2. **Documentation OpenAPI** : Génération automatique de la doc API
3. **Sécurité** : Protection contre les données malformées
4. **Sérialisation** : Conversion automatique vers/dès JSON
5. **IntelliSense** : Meilleure autocomplétion dans l'IDE

## Migration depuis Automap (Optionnel)

Pour utiliser les schémas SQLAlchemy déclaratives au lieu d'automap :

1. Dans `db.py`, remplacez l'automap par :
```python
from backend.schemas import Base
Base.metadata.create_all(bind=engine)
```

2. Importez les modèles directement :
```python
from backend.schemas import User, PME, Entree, Depense, Bilan
```

## Modèles Disponibles

### Utilisateur (User)
- `UserBase`, `UserCreate`, `UserUpdate`, `User`

### PME
- `PMEBase`, `PMECreate`, `PMEUpdate`, `PME`

### Entrée (Entree)
- `EntreeBase`, `EntreeCreate`, `EntreeUpdate`, `Entree`

### Dépense (Depense)
- `DepenseBase`, `DepenseCreate`, `DepenseUpdate`, `Depense`

### Bilan
- `BilanBase`, `BilanCreate`, `BilanUpdate`, `Bilan`

### Réponses API
- `APIResponse` : Réponse standardisée
- `PaginatedResponse` : Pour les listes paginées

### Authentification
- `LoginRequest`, `TokenResponse`, `RegisterRequest`