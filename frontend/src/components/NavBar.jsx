import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const userJson = localStorage.getItem('currentUser');
  const currentUser = userJson ? JSON.parse(userJson) : null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const dashboardPath = currentUser
    ? currentUser.role === 'comptable'
      ? '/accountant-dashboard'
      : '/business-dashboard'
    : '/';

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div>
    
          <span className="ml-3 text-sm text-gray-600">{currentUser ? `${currentUser.name} (${currentUser.role})` : 'Invité'}</span>
        </div>
        <nav className="flex items-center gap-2">
          <Link to="/home" className="px-3 py-1 text-sm text-gray-700 hover:text-blue-600">
            Accueil
          </Link>
          {!currentUser && (
            <>
              <Link to="/" className="px-3 py-1 text-sm text-gray-700 hover:text-blue-600">
                Connexion
              </Link>
              <Link to="/signup" className="px-3 py-1 text-sm text-gray-700 hover:text-blue-600">
                Inscription
              </Link>
            </>
          )}
          {currentUser && (
            <>
              <Link to={dashboardPath} className="px-3 py-1 text-sm text-gray-700 hover:text-blue-600">
                Mon Dashboard
              </Link>
              <Link to="/invoices" className="px-3 py-1 text-sm text-gray-700 hover:text-blue-600">
                Facturation
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              >
                Déconnexion
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
