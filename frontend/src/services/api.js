import axios from 'axios';

const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authAPI = {
  sendOTP: (phone) => apiClient.post('/auth/send-otp', { phone }),
  verifyOTP: (phone, otp) => apiClient.post('/auth/verify-otp', { phone, otp }),
  getProfile: (userId) => apiClient.get(`/auth/profile?userId=${userId}`),
  updateProfile: (profileData) => apiClient.put('/auth/profile', profileData)
};

export const incidentAPI = {
  createSOS: (incidentData) => apiClient.post('/incidents/sos', incidentData),
  getAllIncidents: (filters = {}) => apiClient.get('/incidents', { params: filters }),
  getIncidentById: (id) => apiClient.get(`/incidents/${id}`),
  updateStatus: (id, status) => apiClient.patch(`/incidents/${id}/status`, { status })
};

export const responderAPI = {
  getResponders: (filters = {}) => apiClient.get('/responders', { params: filters }),
  updateLocation: (code, lat, lng, speed) => apiClient.patch(`/responders/${code}/location`, { latitude: lat, longitude: lng, speedKmH: speed }),
  respond: (code, incidentId, action) => apiClient.post(`/responders/${code}/incident/${incidentId}/respond`, { action })
};

export const analyticsAPI = {
  getDashboardStats: () => apiClient.get('/analytics/dashboard')
};

export default apiClient;
