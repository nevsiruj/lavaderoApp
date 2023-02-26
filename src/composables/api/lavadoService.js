import { ref } from 'vue';
import { axios } from 'axios';

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

  const loadLavados = async () => {
    try {
      const response = await axios
        .get('https://localhost:44312/api/lavado')
        .then((response) => {
          return response.data;
        });
      lavados.value = response.data;
      console.log(response);
    } catch (err) {
      error.value = err.message;
    }
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

  const addLavado = async (newLavado) => {
    try {
      debugger;
      const response = await axios.post(
        'https://localhost:44312/api/Lavado/',
        newLavado.value
      );
      lavados.value.push(response.data);
    } catch (err) {
      error.value = err.message;
    }
  };

  // const addLavado = async (newLavado) => {
  //   lavados.value.push(newLavado.value);
  //   console.log(newLavado.value);
  //   console.log(lavados.value);
  //   // try {
  //   //   const response = await axios.post('/api/lavados', newLavado);
  //   //   lavados.value.push(response.data);
  //   // } catch (err) {
  //   //   error.value = err.message;
  //   // }
  // };

  return {
    lavados,
    error,
    addLavado,
    loadLavados,
    getCantidadLavados,
    getLavadosByCaja,
  };
})();

export default lavadoService;
