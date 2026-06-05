import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const leadsApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchLeadsApi = async (params) => {
  // Filter out empty params
  const cleanParams = {};
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      cleanParams[key] = params[key];
    }
  });

  const response = await leadsApi.get('/leads', { params: cleanParams });
  return response.data;
};

export const fetchStatsApi = async () => {
  const response = await leadsApi.get('/leads/stats');
  return response.data;
};

export const createLeadApi = async (leadData) => {
  const response = await leadsApi.post('/leads', leadData);
  return response.data;
};

export const updateLeadApi = async (id, leadData) => {
  const response = await leadsApi.put(`/leads/${id}`, leadData);
  return response.data;
};

export const deleteLeadApi = async (id) => {
  const response = await leadsApi.delete(`/leads/${id}`);
  return response.data;
};

export default leadsApi;
