import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const modules = [
    {
      icon: '📊',
      title: 'gestion des transactions',
      description: 'Enregistrez et suivez toutes vos transactions'
    },

     {
      icon: '📋',
      title: 'Facturation simplifiee',
      description: 'Créez et gérez vos factures'
    },

   
    {
      icon: '📈',
      title: 'Rapports detailles',
      description: 'Générez des rapports financiers détaillés'
    },
    
    {
      icon: '📈',
      title: 'Analyses financieres',
      description: 'Gestion complète de votre base clients'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">Compta-Pro</h1>
            <p className="text-gray-600 text-sm">Gestion Comptable Simplifiée</p>
          </div>
          <nav className="flex items-center gap-4">
            <button className="px-4 py-2 text-gray-700 hover:text-gray-900">Profil</button>
            <Link to="/" className="btn-primary text-sm">
              Déconnexion
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white">
            <h2 className="text-4xl font-bold mb-4">Gerez votre comptabilite en toute simplicite</h2>
            <p className="text-lg opacity-90">La plateforme tout-en-un pour vos finances , creer des factures et suivez vos performances en temps reel</p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">0</p>
            <p className="text-gray-600">solde</p>
          </div>
          <div className="card text-center">
            <p className="text-4xl font-bold text-green-600 mb-2">0 €</p>
            <p className="text-gray-600">Revenu</p>
          </div>
          <div className="card text-center">
            <p className="text-4xl font-bold text-red-600 mb-2">0 €</p>
            <p className="text-gray-600">Dépenses</p>
          </div>
        </section>

        {/* Modules Grid */}
        <section>
          <h3 className="text-2xl font-bold text-gray-800 mb-8">Tous ce dont vous avez besoin</h3>
          <p>Une suite complete d'outils pour gerer votre comptabilite en toute simplicite</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{module.icon}</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{module.title}</h4>
                <p className="text-gray-600">{module.description}</p>
                <button className="mt-4 text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2">
                  Accéder <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2026 Compta-Pro. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;