import { API_URL } from '../../config.js';

const agendaService = (() => {
  const axios = require('axios');

  const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Include cookies in requests
  });

  instance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('jwt-token');
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  const addAgenda = async (agenda) => {
    try {
      const response = await instance.post('/api/Agenda', agenda);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
   
  const getAllAgenda = async () => {
    try {
      const response = await instance.get('/api/Agenda');
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getById = async (id) => {
    try {
      const response = await instance.get(`/api/Agenda/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const editAgenda = async (id, agenda) => {
    try {
      const response = await instance.put(`/api/Agenda/${id}`, agenda);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const removeAgenda = async (id) => {
    try {
      const response = await instance.delete(`/api/Agenda/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    addAgenda,
    getAllAgenda,
    getById,
    editAgenda,
    removeAgenda
  };
})();

export default agendaService;
