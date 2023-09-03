import { ref } from 'vue';
import { API_URL } from '../../config.js';

const lavadoService = (() => {
  const lavados = ref([
    {
      descripcion: '',
      fecha: new Date(),
      importe: 0,
      cajaId: 0,
    },
  ]);
  const error = ref(null);
  const axios = require('axios');

  const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Include cookies in requests
  });

  const getLavados = async () => {
    try {
      const response = await instance.get('/Lavado');
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const getTipoLavado = async () => {
    try {
      const response = await instance.get('/TipoLavado');
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const getTipoVehiculo = async () => {
    try {
      const response = await instance.get('/TipoVehiculo');
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const getLavadosByCaja = async (_cajaid) => {
    try {
      const response = await instance.get(`/Lavado/${_cajaid}/lavados`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const getCantidadLavados = async () => {
    return lavados.value.length;
  };

  const getLavadoById = async (id) => {
    try {
      const response = await instance.get(`/Lavado/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const editLavado = async (lavado) => {
    try {
      const lavadoId = lavado.id;
      const response = await instance.put(`/Lavado/${lavadoId}`, lavado);
      return response;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const deleteLavado = async (lavadoId) => {
    try {
      const response = await instance.delete(`/Lavado/${lavadoId}`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('No se pudo eliminar el lavado.');
    }
  };

  const addLavado = async (_data) => {
    try {
      const response = await instance.post('/Lavado', _data.value);
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return {
    lavados,
    error,
    addLavado,
    getCantidadLavados,
    getLavadosByCaja,
    getTipoLavado,
    getTipoVehiculo,
    getLavados,
    deleteLavado,
    getLavadoById,
    editLavado,
  };
})();

export default lavadoService;
