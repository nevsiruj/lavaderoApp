import { API_URL } from '../../config.js';

const ingresoService = (() => {
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

  const addTipoServicio = async (data) => {
    try {
      const response = await instance.post('/TipoLavado', data.value);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAll = async () => {
    try {
      const response = await instance.get('/TipoLavado');
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getById = async (id) => {
    try {
      const response = await instance.get(`/TipoLavado/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const edit = async (ingreso) => {
    try {
      const response = await instance.put(`/TipoLavado/${ingreso.id}`, ingreso);
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const remove = async (id) => {
    try {
      const response = await instance.delete(`/TipoLavado/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    addTipoServicio,
    getAll,
    getById,
    edit,
    remove
  };
})();

export default ingresoService;
