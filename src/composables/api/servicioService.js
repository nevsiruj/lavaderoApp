import { API_URL } from '../../config.js';

const servicioService = (() => {
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

  
  const addServicio = async (Servicio) => {
    try {
      const response = await instance.post('/api/Servicio', Servicio);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
   

  const getAllServicio = async () => {
    try {
      const response = await instance.get('/api/Servicio');
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getById = async (id) => {
    try {
      const response = await instance.get(`/api/Servicio/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  
  
  const editServicio = async (id, Servicio) => {
    // debugger
    // console.log("EditServicio",servicio)
    try {
      const response = await instance.put(`/api/Servicio/${id}`, Servicio);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  

  const removeServicio = async (id) => {
    try {
      const response = await instance.delete(`/api/Servicio/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    addServicio,
    getAllServicio,
    getById,
    editServicio,
    removeServicio
  };
})();

export default servicioService;
