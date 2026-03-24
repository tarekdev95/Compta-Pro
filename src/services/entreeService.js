import api from './api';

// Service pour les entrées
export const entreeService = {
  // Créer une entrée
  createEntree: async (entreeData) => {
    try {
      const response = await api.post('/entrees/', entreeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer toutes les entrées
  getEntrees: async () => {
    try {
      const response = await api.get('/entrees/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer une entrée par ID
  getEntree: async (entreeId) => {
    try {
      const response = await api.get(`/entrees/${entreeId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Mettre à jour une entrée
  updateEntree: async (entreeId, entreeData) => {
    try {
      const response = await api.put(`/entrees/${entreeId}`, entreeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Supprimer une entrée
  deleteEntree: async (entreeId) => {
    try {
      const response = await api.delete(`/entrees/${entreeId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};