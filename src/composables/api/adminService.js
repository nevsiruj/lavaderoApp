import { API_URL } from '../../config.js';

const adminService = (() => {
  const axios = require('axios');
  const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Include cookies in requests
  });

  // Agregar interceptor para incluir token en las cabeceras
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

  const getDatosPorFecha = async (fechaInicio, fechaFin) => {
    /* const options = {
      headers: {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
      },
    };*/
    try {
      const response = await instance.get(`${API_URL}/lavado/GetDetalles`, {
        params: {
          fechaInicio: fechaInicio,
          fechaFin: fechaFin,
        },
        // withCredentials: true  // Agrega esta línea
      });
      if (response.status === 200) {
        // Check if the response status is OK (status code 200)
        return response.data;
      } else {
        // Handle non-200 status codes
        console.error('Request failed with status code ' + response.status);
        throw new Error('Request failed with status code ' + response.status);
      }
    } catch (error) {
      console.error('Network error:', error);
      throw error; // You can rethrow the error to handle it further up the call stack
    }
  };
  const getCajasPorFecha = async (fechaInicio, fechaFin) => {
    const response = await axios.get(`${API_URL}/caja/GetCajaByFechas`, {
      params: {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
      },
      withCredentials: true  // Agrega esta línea

    });
    return response.data;
  };
  return {
    getDatosPorFecha,
    getCajasPorFecha,
  };
})();

export default adminService;
