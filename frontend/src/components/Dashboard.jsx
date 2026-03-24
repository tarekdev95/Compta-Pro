import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasksToday, setTasksToday] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer l'utilisateur connecté depuis localStorage
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      // Vérifier que c'est un comptable
      if (userData.role === 'comptable') {
        setCurrentUser(userData);
        setTasksToday(Math.floor(Math.random() * 10) + 1);
      } else {
        // Rediriger vers le dashboard des entreprises
        navigate('/business-dashboard');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Mock data - replace with actual data from API/backend
  const pendingInvoices = [
    { id: 1, client: 'Client A', amount: 1500, dueDate: '2023-12-01' },
    { id: 2, client: 'Client B', amount: 2500, dueDate: '2023-12-05' },
    { id: 3, client: 'Client C', amount: 800, dueDate: '2023-12-10' },
  ];

  const expenses = 5000; // Total expenses
  const revenues = 12000; // Total revenues
  const netProfit = revenues - expenses; // Net profit

  const recentTransactions = [
    { id: 1, description: 'Vente produit X', amount: 2000, type: 'revenue', date: '2023-11-20' },
    { id: 2, description: 'Achat fournitures', amount: -500, type: 'expense', date: '2023-11-19' },
    { id: 3, description: 'Paiement facture', amount: -1500, type: 'expense', date: '2023-11-18' },
    { id: 4, description: 'Service client Y', amount: 3000, type: 'revenue', date: '2023-11-17' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-4">Tableau de Bord</h1>
        {currentUser && (
          <div className="text-center">
            <p className="text-lg text-gray-600">
              Bienvenue, <span className="font-semibold text-blue-600">{currentUser.name}</span>
              {currentUser.role === 'comptable' && (
                <span className="block mt-2 text-sm">
                  Vous avez <span className="font-bold text-orange-600">{tasksToday} tâches</span> à effectuer aujourd'hui
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {currentUser?.role === 'comptable' ? (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Tâches Aujourd'hui</h2>
              <p className="text-2xl font-bold text-blue-600">{tasksToday}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Clients Actifs</h2>
              <p className="text-2xl font-bold text-green-600">{Math.floor(Math.random() * 20) + 5}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Tâches Terminées</h2>
              <p className="text-2xl font-bold text-purple-600">{Math.floor(Math.random() * tasksToday)}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Rendez-vous</h2>
              <p className="text-2xl font-bold text-orange-600">{Math.floor(Math.random() * 5) + 1}</p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Factures en Attente</h2>
              <p className="text-2xl font-bold text-blue-600">{pendingInvoices.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Dépenses</h2>
              <p className="text-2xl font-bold text-red-600">{expenses} €</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Revenus</h2>
              <p className="text-2xl font-bold text-green-600">{revenues} €</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Bénéfice Net</h2>
              <p className="text-2xl font-bold text-purple-600">{netProfit} €</p>
            </div>
          </>
        )}
      </div>

      {/* Content based on role */}
      {currentUser?.role === 'comptable' ? (
        <>
          {/* Tasks for Today */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Tâches du Jour</h2>
            <div className="space-y-3">
              {Array.from({ length: tasksToday }, (_, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <div>
                      <p className="font-medium">Tâche #{i + 1}</p>
                      <p className="text-sm text-gray-500">Description de la tâche à effectuer</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">À faire</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clients to Contact */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Clients à Contacter</h2>
            <div className="space-y-3">
              {['Client A', 'Client B', 'Client C'].map((client, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{client}</p>
                    <p className="text-sm text-gray-500">Rappel de suivi nécessaire</p>
                  </div>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                    Contacter
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Pending Invoices */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Factures en Attente</h2>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Client</th>
                  <th className="px-4 py-2">Montant</th>
                  <th className="px-4 py-2">Échéance</th>
                </tr>
              </thead>
              <tbody>
                {pendingInvoices.map(invoice => (
                  <tr key={invoice.id} className="border-b">
                    <td className="px-4 py-2">{invoice.client}</td>
                    <td className="px-4 py-2">{invoice.amount} €</td>
                    <td className="px-4 py-2">{invoice.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Transactions Récentes</h2>
            <ul className="space-y-2">
              {recentTransactions.map(transaction => (
                <li key={transaction.id} className="flex justify-between items-center p-2 border-b">
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <p className={`font-bold ${transaction.type === 'revenue' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount} €
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;