@echo off
echo Démarrage de Compta-Pro...
echo.

echo Installation des dépendances backend...
cd backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Erreur lors de l'installation des dépendances backend
    pause
    exit /b 1
)

echo.
echo Démarrage du backend...
start "Backend Compta-Pro" cmd /k "cd backend && python main.py"

echo.
echo Attente de 3 secondes pour que le backend démarre...
timeout /t 3 /nobreak > nul

echo.
echo Démarrage du frontend...
cd ..
npm install
if %errorlevel% neq 0 (
    echo Erreur lors de l'installation des dépendances frontend
    pause
    exit /b 1
)

start "Frontend Compta-Pro" cmd /k "npm run dev"

echo.
echo Compta-Pro est maintenant opérationnel !
echo - Backend: http://localhost:8000
echo - Frontend: http://localhost:5173
echo.
echo Appuyez sur une touche pour fermer cette fenêtre...
pause > nul