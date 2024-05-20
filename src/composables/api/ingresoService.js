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

  const addIngreso = async (data) => {
    try {
      const response = await instance.post('/Ingreso', data.value);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getIngresosByCaja = async (_cajaId) => {
    try {
      const response = await instance.get(`/ingreso/${_cajaId}/ingresos`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getIngresos = async () => {
    try {
      const response = await instance.get('/ingreso');
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getIngresoById = async (id) => {
    try {
      const response = await instance.get(`/ingreso/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const editIngreso = async (ingreso) => {
    try {
      const response = await instance.put(`/ingreso/${ingreso.id}`, ingreso);
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const deleteIngreso = async (id) => {
    try {
      const response = await instance.delete(`/ingreso/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    addIngreso,
    getIngresosByCaja,
    editIngreso,
    getIngresoById,
    getIngresos,
    deleteIngreso,
  };
})();

export default ingresoService;
