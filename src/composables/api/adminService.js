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
    // const options = {
    //   headers: {
    //     fechaInicio: fechaInicio,
    //     fechaFin: fechaFin,
    //   },
    // };
    const response = await axios.get(`${API_URL}/lavado/GetDetalles`, {
      params: {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
      },
      withCredentials: true  // Agrega esta línea

    });
    return response.data;
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
