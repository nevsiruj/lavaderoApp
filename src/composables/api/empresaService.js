import { API_URL } from '../../config.js';

const empresaService = (() => {
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

  const addEmpresa = async (empresa) => {
    try {
      const response = await instance.post('/api/Tenant', empresa);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
   
  const getAllEmpresa = async () => {
    try {
      const response = await instance.get('/api/Tenant');
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getById = async (id) => {
    try {
      const response = await instance.get(`/api/Tenant/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const editEmpresa = async (id, empresa) => {
    try {
      const response = await instance.put(`/api/Tenant/${id}`, empresa);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const removeEmpresa = async (id) => {
    try {
      const response = await instance.delete(`/api/Tenant/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    addEmpresa,
    getAllEmpresa,
    getById,
    editEmpresa,
    removeEmpresa
  };
})();

export default empresaService;
