import { API_URL } from '../../config.js';

const tipoServicioService = (() => {
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

  
  const addTipoServicio = async (tipoServicio) => {
    try {
      const response = await instance.post('/api/TipoServicio', tipoServicio);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
   

  const getAllTipoServicio = async () => {
    try {
      const response = await instance.get('/api/TipoServicio');
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getById = async (id) => {
    try {
      const response = await instance.get(`/api/TipoServicio/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  
  
  const editTipoServicio = async (id, tipoServicio) => {
    console.log("lin93", id)
    try {
      const response = await instance.put(`/api/TipoServicio/${id}`, tipoServicio);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  

  const removeTipoServicio = async (id) => {
    try {
      const response = await instance.delete(`/api/TipoServicio/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    addTipoServicio,
    getAllTipoServicio,
    getById,
    editTipoServicio,
    removeTipoServicio
  };
})();

export default tipoServicioService;
