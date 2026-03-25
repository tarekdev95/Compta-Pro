from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

# Import de la configuration DB
from db import get_db

# Import des routers individuels depuis chaque fichier
from users.get_users import router as get_users_router
from users.get_user import router as get_user_router
from users.create_user import router as create_user_router
from users.update_user import router as update_user_router
from users.delete_user import router as delete_user_router
from users.auth import router as auth_router

from pme.get_pmes import router as get_pmes_router
from pme.get_pme import router as get_pme_router
from pme.create_pme import router as create_pme_router
from pme.update_pme import router as update_pme_router
from pme.delete_pme import router as delete_pme_router

from depenses.get_depenses import router as get_depenses_router
from depenses.get_depense import router as get_depense_router
from depenses.create_depense import router as create_depense_router
from depenses.update_depense import router as update_depense_router
from depenses.delete_depense import router as delete_depense_router

from entrees.get_entrees import router as get_entrees_router
from entrees.get_entree import router as get_entree_router
from entrees.create_entree import router as create_entree_router
from entrees.update_entree import router as update_entree_router
from entrees.delete_entree import router as delete_entree_router

from bilan.get_bilans import router as get_bilans_router
from bilan.get_bilan import router as get_bilan_router
from bilan.create_bilan import router as create_bilan_router
from bilan.update_bilan import router as update_bilan_router
from bilan.delete_bilan import router as delete_bilan_router

app = FastAPI(title="ComptaPro API - Architecture Ultra-Modulaire")

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # URL du frontend Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion de tous les routers individuels
app.include_router(get_users_router)
app.include_router(get_user_router)
app.include_router(create_user_router)
app.include_router(update_user_router)
app.include_router(delete_user_router)
app.include_router(auth_router)

app.include_router(get_pmes_router)
app.include_router(get_pme_router)
app.include_router(create_pme_router)
app.include_router(update_pme_router)
app.include_router(delete_pme_router)

app.include_router(get_depenses_router)
app.include_router(get_depense_router)
app.include_router(create_depense_router)
app.include_router(update_depense_router)
app.include_router(delete_depense_router)

app.include_router(get_entrees_router)
app.include_router(get_entree_router)
app.include_router(create_entree_router)
app.include_router(update_entree_router)
app.include_router(delete_entree_router)

app.include_router(get_bilans_router)
app.include_router(get_bilan_router)
app.include_router(create_bilan_router)
app.include_router(update_bilan_router)
app.include_router(delete_bilan_router)

@app.get("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8003)
