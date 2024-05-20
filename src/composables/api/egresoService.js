import { API_URL } from '../../config.js';

const egresoService = (() => {
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

  const addEgreso = async (data) => {
    try {
      const response = await instance.post('/Egreso', data.value);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getEgresosByCaja = async (_cajaId) => {
    try {
      const response = await instance.get(`/egreso/${_cajaId}/egresos`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getEgresos = async () => {
    try {
      const response = await instance.get('/egreso');
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getEgresoById = async (id) => {
    try {
      const response = await instance.get(`/egreso/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const editEgreso = async (egresos) => {
    try {
      const response = await instance.put(`/egreso/${egresos.id}`, egresos);
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const deleteEgreso = async (id) => {
    try {
      const response = await instance.delete(`/egreso/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    addEgreso,
    getEgresosByCaja,
    editEgreso,
    getEgresoById,
    getEgresos,
    deleteEgreso,
  };
})();

export default egresoService;
