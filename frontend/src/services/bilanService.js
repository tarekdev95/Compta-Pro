import api from "../api/api";

export const bilanServices = {
  getBilan: () => api.get("/bilan"),
};

// Service pour les bilans
export const bilanService = {
  // Créer un bilan
  createBilan: async (bilanData) => {
    try {
      const response = await api.post('/bilans/', bilanData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer tous les bilans
  getBilans: async () => {
    try {
      const response = await api.get('/bilans/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Récupérer un bilan par ID
  getBilan: async (bilanId) => {
    try {
      const response = await api.get(`/bilans/${bilanId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Mettre à jour un bilan
  updateBilan: async (bilanId, bilanData) => {
    try {
      const response = await api.put(`/bilans/${bilanId}`, bilanData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Supprimer un bilan
  deleteBilan: async (bilanId) => {
    try {
      const response = await api.delete(`/bilans/${bilanId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};