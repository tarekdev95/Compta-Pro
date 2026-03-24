# Compta-Pro - Application Comptable

Une application web moderne de gestion comptable avec frontend React et backend FastAPI pour les cabinets comptables gérant les dossiers des PME.

## 🚀 Démarrage Rapide

### Prérequis
- Python 3.8+
- Node.js 16+
- Git

### Installation et Lancement

1. **Cloner le repository**
   ```bash
   git clone <votre-repo>
   cd Compta-Pro
   ```

2. **Lancement automatique (Windows)**
   ```bash
   # Double-cliquez sur start.bat ou exécutez:
   ./start.bat
   ```

3. **Lancement manuel**

   **Backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   python main.py
   ```

   **Frontend:**
   ```bash
   npm install
   npm run dev
   ```

## 📋 Fonctionnalités

### Backend (FastAPI)
- ✅ API REST complète
- ✅ Gestion des utilisateurs, PME, dépenses, entrées, bilans
- ✅ Authentification JWT
- ✅ Base de données SQLAlchemy
- ✅ CORS configuré pour le frontend

### Frontend (React)
- ✅ Interface moderne avec Tailwind CSS
- ✅ Connexion aux API backend
- ✅ Dashboard comptable
- ✅ Gestion des utilisateurs et entreprises

## 🔗 Endpoints API

### Utilisateurs
- `POST /users/` - Créer un utilisateur
- `GET /users/` - Lister tous les utilisateurs
- `GET /users/{id}` - Récupérer un utilisateur
- `PUT /users/{id}` - Modifier un utilisateur
- `DELETE /users/{id}` - Supprimer un utilisateur

### Authentification
- `POST /auth/login` - Connexion
- `POST /auth/register` - Inscription

### PME
- `POST /pmes/` - Créer une PME
- `GET /pmes/` - Lister toutes les PME
- `GET /pmes/{id}` - Récupérer une PME
- `PUT /pmes/{id}` - Modifier une PME
- `DELETE /pmes/{id}` - Supprimer une PME

### Dépenses
- `POST /depenses/` - Créer une dépense
- `GET /depenses/` - Lister toutes les dépenses
- `GET /depenses/{id}` - Récupérer une dépense
- `PUT /depenses/{id}` - Modifier une dépense
- `DELETE /depenses/{id}` - Supprimer une dépense

### Entrées
- `POST /entrees/` - Créer une entrée
- `GET /entrees/` - Lister toutes les entrées
- `GET /entrees/{id}` - Récupérer une entrée
- `PUT /entrees/{id}` - Modifier une entrée
- `DELETE /entrees/{id}` - Supprimer une entrée

### Bilans
- `POST /bilans/` - Créer un bilan
- `GET /bilans/` - Lister tous les bilans
- `GET /bilans/{id}` - Récupérer un bilan
- `PUT /bilans/{id}` - Modifier un bilan
- `DELETE /bilans/{id}` - Supprimer un bilan

## 🛠 Technologies Utilisées

### Backend
- **FastAPI** - Framework API moderne
- **SQLAlchemy** - ORM pour la base de données
- **Pydantic** - Validation des données
- **bcrypt** - Hashage des mots de passe
- **JWT** - Authentification par token

### Frontend
- **React** - Bibliothèque UI
- **Vite** - Outil de build rapide
- **Tailwind CSS** - Framework CSS
- **Axios** - Client HTTP
- **React Router** - Routage

## 📁 Structure du Projet

```
Compta-Pro/
├── backend/                 # API FastAPI
│   ├── main.py             # Point d'entrée principal
│   ├── db.py               # Configuration base de données
│   ├── models.py           # Modèles Pydantic
│   ├── schemas.py          # Schémas de réponse
│   ├── requirements.txt    # Dépendances Python
│   ├── users/              # Module utilisateurs
│   ├── pme/                # Module PME
│   ├── depenses/           # Module dépenses
│   ├── entrees/            # Module entrées
│   └── bilan/              # Module bilans
├── src/                    # Code source React
│   ├── components/         # Composants React
│   ├── services/           # Services API
│   └── styles/             # Styles CSS
├── package.json            # Dépendances Node.js
├── start.bat               # Script de démarrage Windows
└── README.md               # Documentation
```

## 🔧 Configuration

### Base de Données
Modifiez `backend/db.py` pour configurer votre base de données:

```python
SQLALCHEMY_DATABASE_URL = "mysql://user:password@localhost/compta_pro"
# ou
SQLALCHEMY_DATABASE_URL = "sqlite:///./compta_pro.db"
```

### Variables d'Environnement
Créez un fichier `.env` dans le dossier backend:

```
SECRET_KEY=votre-cle-secrete-ici
DATABASE_URL=votre-url-base-donnees
```

## 🚀 Déploiement

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
npm run build
npm run preview
# ou pour le développement
npm run dev
```

## 📞 Support

Pour toute question ou problème, consultez les issues du repository ou contactez l'équipe de développement.
