import api from './api';

// Service pour les dépenses
export const depenseService = {
  // Créer une dépense
  createDepense: async (depenseData) => {
    try {
      const response = await api.post('/depenses/', depenseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer toutes les dépenses
  getDepenses: async () => {
    try {
      const response = await api.get('/depenses/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer une dépense par ID
  getDepense: async (depenseId) => {
    try {
      const response = await api.get(`/depenses/${depenseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Mettre à jour une dépense
  updateDepense: async (depenseId, depenseData) => {
    try {
      const response = await api.put(`/depenses/${depenseId}`, depenseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Supprimer une dépense
  deleteDepense: async (depenseId) => {
    try {
      const response = await api.delete(`/depenses/${depenseId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};