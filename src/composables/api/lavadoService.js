import { ref } from 'vue';
import { axios } from 'axios';
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
  // };
  const getTipoLavado = async () => {
    const response = await axios.get(`https://localhost:44312/api/TipoLavado`);
    return response.data;
  };
  const getTipoVehiculo = async () => {
    const response = await axios.get(
      `https://localhost:44312/api/TipoVehiculo`
    );
    return response.data;
  };

  const getLavadosByCaja = async (_cajaid) => {
    const response = await axios.get(
      `https://localhost:44312/api/Lavado/${_cajaid}/lavados`
    );
    return response.data;
  };

  const getCantidadLavados = async () => {
    return lavados.value.length;
  };

  // const addLavado = async (newLavado) => {
  //   lavados.value.push(newLavado.value);
  //   console.log(newLavado.value);
  //   console.log(lavados.value);
  // };
  const addLavado = async (_data) => {
    fetch(`https://localhost:44312/api/Lavado`, {
      method: 'POST',
      body: JSON.stringify(_data.value),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Respuesta:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    return await _data.value;
  };

  return {
    lavados,
    error,
    addLavado,
    getCantidadLavados,
    getLavadosByCaja,
    getTipoLavado,
    getTipoVehiculo,
  };
})();

export default lavadoService;
