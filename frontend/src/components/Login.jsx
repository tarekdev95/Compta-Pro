import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('entreprise'); // 'entreprise' ou 'comptable'
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // gestion simple de la connexion (à remplacer par une vraie authentification avec backend)
    if (email && password) {
      // Récupérer les données utilisateur depuis localStorage (simulation)
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        // Vérifier si l'email correspond
        if (userData.email === email) {
          // Mettre à jour le rôle selon la sélection
          userData.role = role;
          // Sauvegarder l'utilisateur connecté
          localStorage.setItem('currentUser', JSON.stringify(userData));
          // Rediriger selon le rôle
          if (userData.role === 'comptable') {
            navigate('/dashboard');
          } else {
            navigate('/business-dashboard');
          }
          return;
        }
      }
      
      // Si pas d'utilisateur trouvé, créer un utilisateur de test
      const testUser = {
        name: 'Utilisateur Test',
        email: email,
        role: role,
        id: Date.now()
      };
      localStorage.setItem('user', JSON.stringify(testUser));
      localStorage.setItem('currentUser', JSON.stringify(testUser));
      
      if (role === 'comptable') {
        navigate('/dashboard');
      } else {
        navigate('/business-dashboard');
      }
    }
  };

  return (

    


    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Compta-Pro</h1>
            <p className="text-gray-600">Gestion Comptable Simplifiée</p>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Connexion</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Type de compte</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-input pl-10"
                  required
                >
                  <option value="entreprise">Entreprise</option>
                  <option value="comptable">Comptable</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="form-label">Adresse email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@exemple.com"
                  required
                  className="form-input pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="form-label">Mot de passe</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="form-input pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full mt-6">
              Se connecter
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Pas de compte ? 
              <Link to="/signup" className="text-blue-600 font-semibold ml-1 hover:underline">
                Créer un compte
              </Link>
            </p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-500">Identifiants de test: test@example.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;