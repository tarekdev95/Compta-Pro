import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bilanServices } from "../services/bilanService";
import { depenseServices} from "../services/depenseService";


const BusinessDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

 useEffect(() => {
  const user = localStorage.getItem('currentUser');

  if (user) {
    const userData = JSON.parse(user);

    if (userData.role === 'entreprise') {
      setCurrentUser(userData);

      // 🔥 APPELS API ICI
      fetchDashboardData();

    } else {
      navigate('/accountant-dashboard');
    }
  } else {
    navigate('/');
  }
}, [navigate]);


const fetchDashboardData = async () => {
  try {
    // exemple (à adapter selon ton backend)
    const depensesRes = await depenseServices.getAll();
    const bilanRes = await bilanServices.getBilan();

    setExpenses(depensesRes.data.totalDepenses);
    setRevenues(bilanRes.data.totalRevenus);
    setPendingInvoices(bilanRes.data.facturesEnAttente);
    setRecentTransactions(bilanRes.data.transactions);

  } catch (error) {
    console.error("Erreur API:", error);
  }
};

  // Mock data
  const pendingInvoices = [
    { id: 1, client: 'Client A', amount: 1500, dueDate: '2026-04-01' },
    { id: 2, client: 'Client B', amount: 2500, dueDate: '2026-04-05' },
    { id: 3, client: 'Client C', amount: 800, dueDate: '2026-04-10' },
  ];

  const [expenses, setExpenses] = useState(0);
  const [revenues, setRevenues] = useState(0);

  const netProfit = revenues - expenses;

  const recentTransactions = [
    { id: 1, description: 'Vente produit X', amount: 2000, type: 'revenue', date: '2026-03-20' },
    { id: 2, description: 'Achat fournitures', amount: -500, type: 'expense', date: '2026-03-19' },
    { id: 3, description: 'Paiement facture', amount: -1500, type: 'expense', date: '2026-03-18' },
    { id: 4, description: 'Service client Y', amount: 3000, type: 'revenue', date: '2026-03-17' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!currentUser) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-600">Compta-Pro</h1>
            <p className="text-gray-600 text-sm">Dashboard Entreprise</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold text-gray-800">{currentUser.name}</p>
              <p className="text-xs text-gray-500">Entreprise</p>
            </div>
           
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-2">Bienvenue {currentUser.name}!</h2>
          <p className="text-green-100">Gestion financière de votre entreprise</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">FACTURES EN ATTENTE</h3>
            <p className="text-3xl font-bold text-blue-600">{pendingInvoices.length}</p>
            <p className="text-xs text-gray-500 mt-2">À traiter</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">DÉPENSES</h3>
            <p className="text-3xl font-bold text-red-600">{expenses} €</p>
            <p className="text-xs text-gray-500 mt-2">Ce mois</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">REVENUS</h3>
            <p className="text-3xl font-bold text-green-600">{revenues} €</p>
            <p className="text-xs text-gray-500 mt-2">Ce mois</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">BÉNÉFICE NET</h3>
            <p className="text-3xl font-bold text-purple-600">{netProfit} €</p>
            <p className="text-xs text-gray-500 mt-2">Marge positive</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Invoices */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Factures en Attente</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-semibold text-gray-700">Client</th>
                  <th className="text-left py-2 font-semibold text-gray-700">Montant</th>
                  <th className="text-left py-2 font-semibold text-gray-700">Échéance</th>
                  <th className="text-left py-2 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingInvoices.map(invoice => (
                  <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 text-gray-800">{invoice.client}</td>
                    <td className="py-3 font-semibold text-gray-800">{invoice.amount} €</td>
                    <td className="py-3 text-gray-600">{invoice.dueDate}</td>
                    <td className="py-3">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                        Voir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Résumé</h2>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600">À recevoir</p>
                <p className="text-2xl font-bold text-blue-600">
                  {pendingInvoices.reduce((sum, inv) => sum + inv.amount, 0)} €
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xs text-gray-600">Rentabilité</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round((netProfit / revenues) * 100)}%
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-gray-600">Solde net</p>
                <p className="text-2xl font-bold text-purple-600">{netProfit} €</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Transactions Récentes</h2>
          <div className="space-y-3">
            {recentTransactions.map(transaction => (
              <div
                key={transaction.id}
                className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div>
                  <p className="font-semibold text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <p
                  className={`font-bold ${
                    transaction.type === 'revenue' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount} €
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusinessDashboard;