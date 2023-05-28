import { ref } from 'vue';
// import { axios } from 'axios';
import { API_URL } from '../../config.js';

console.log(API_URL);

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
  // };

  const getLavados = async () => {
    const response = await axios.get(`${API_URL}/Lavado`);
    return response.data;
  };
  const getTipoLavado = async () => {
    const response = await axios.get(`${API_URL}/TipoLavado`);
    return response.data;
  };

  const getTipoVehiculo = async () => {
    const response = await axios.get(`${API_URL}/TipoVehiculo`);
    return response.data;
  };

  const getLavadosByCaja = async (_cajaid) => {
    const response = await axios.get(`${API_URL}/Lavado/${_cajaid}/lavados`);
    return response.data;
  };

  const getCantidadLavados = async () => {
    return lavados.value.length;
  };

  const deleteLavado = async (lavadoId) => {
    try {
      const response = await axios.delete(`${API_URL}/Lavado/${lavadoId}`);
      // Realiza alguna lógica adicional si es necesario
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('No se pudo eliminar el lavado.');
    }
  };

  // const addLavado = async (newLavado) => {
  //   lavados.value.push(newLavado.value);
  //   console.log(newLavado.value);
  //   console.log(lavados.value);
  // };
  const addLavado = async (_data) => {
    try {
      const response = await fetch(`${API_URL}/Lavado`, {
        method: 'POST',
        body: JSON.stringify(_data.value),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Respuesta:', data);

      return _data.value;
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
  };
})();

export default lavadoService;
