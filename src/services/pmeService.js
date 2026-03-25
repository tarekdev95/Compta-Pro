import api from './api';

// Service pour les PME
export const pmeService = {
  // Créer une PME
  createPME: async (pmeData) => {
    try {
      const response = await api.post('/pmes/', pmeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer toutes les PME
  getPMEs: async () => {
    try {
      const response = await api.get('/pmes/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer une PME par ID
  getPME: async (pmeId) => {
    try {
      const response = await api.get(`/pmes/${pmeId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Mettre à jour une PME
  updatePME: async (pmeId, pmeData) => {
    try {
      const response = await api.put(`/pmes/${pmeId}`, pmeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Supprimer une PME
  deletePME: async (pmeId) => {
    try {
      const response = await api.delete(`/pmes/${pmeId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};