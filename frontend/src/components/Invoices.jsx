import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const invoicesData = [
  { id: 1, owner: 'comptable', client: 'Client A', company: 'Entreprise ABC SARL', amount: 1500, status: 'payée', dueDate: '2026-04-01' },
  { id: 2, owner: 'comptable', client: 'Client B', company: 'Société XYZ Inc', amount: 2500, status: 'en attente', dueDate: '2026-04-05' },
  { id: 3, owner: 'entreprise', client: 'Client C', company: 'Services Pro Ltd', amount: 8000, status: 'payée', dueDate: '2026-03-30' },
  { id: 4, owner: 'entreprise', client: 'Client D', company: 'Commerce Global SAS', amount: 4200, status: 'en attente', dueDate: '2026-04-10' },
  { id: 5, owner: 'comptable', client: 'Client E', company: 'Tech Solutions EIRL', amount: 1900, status: 'payée', dueDate: '2026-04-02' },
];

function Invoices() {
  const [user, setUser] = useState(null);
  const [filterStatus, setFilterStatus] = useState('tout');
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem('currentUser');
    if (!raw) {
      navigate('/');
      return;
    }
    setUser(JSON.parse(raw));
  }, [navigate]);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  const roleInvoices = invoicesData.filter(invoice => invoice.owner === user.role);
  const filteredInvoices =
    filterStatus === 'tout'
      ? roleInvoices
      : roleInvoices.filter(invoice => invoice.status === filterStatus);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Facturation - {user.role === 'comptable' ? 'Comptable' : 'Entreprise'}</h1>
        <p className="mb-6 text-gray-600">Liste des factures récentes liées à votre rôle.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Total factures</p>
            <p className="text-2xl font-bold">{roleInvoices.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Factures payées</p>
            <p className="text-2xl font-bold text-green-600">{roleInvoices.filter(i => i.status === 'payée').length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Factures en attente</p>
            <p className="text-2xl font-bold text-orange-600">{roleInvoices.filter(i => i.status === 'en attente').length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Montant total</p>
            <p className="text-2xl font-bold text-blue-600">
              {roleInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)} €
            </p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div>
            <label htmlFor="filterStatus" className="text-sm font-medium text-gray-700 mr-2">
              Filtrer par état :
            </label>
            <select
              id="filterStatus"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="tout">Tout</option>
              <option value="payée">Payée</option>
              <option value="en attente">En attente</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-xs font-semibold text-gray-700 uppercase tracking-wide">#</th>
                <th className="p-4 text-xs font-semibold text-gray-700 uppercase tracking-wide">Client</th>
                <th className="p-4 text-xs font-semibold text-gray-700 uppercase tracking-wide">Entreprise</th>
                <th className="p-4 text-xs font-semibold text-gray-700 uppercase tracking-wide">Montant</th>
                <th className="p-4 text-xs font-semibold text-gray-700 uppercase tracking-wide">Statut</th>
                <th className="p-4 text-xs font-semibold text-gray-700 uppercase tracking-wide">Échéance</th>
              </tr>
            </thead>
            <tbody>
              {roleInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-t">
                  <td className="p-4">{invoice.id}</td>
                  <td className="p-4">{invoice.client}</td>
                  <td className="p-4">{invoice.company}</td>
                  <td className="p-4 font-bold">{invoice.amount} €</td>
                  <td className={`p-4 font-semibold ${invoice.status === 'payée' ? 'text-green-600' : 'text-orange-600'}`}>
                    {invoice.status}
                  </td>
                  <td className="p-4">{invoice.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Invoices;
