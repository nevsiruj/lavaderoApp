import { API_URL } from '../../config.js';

const ingresoService = (() => {
  const axios = require('axios');

  const addIngreso = async (data) => {
    await axios
      .post(`${API_URL}/Ingreso`, data.value)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getIngresosByCaja = async (_cajaId) => {
    const response = await axios.get(
      `https://localhost:44312/api/Ingreso/${_cajaId}/ingresos`
    );
    return response.data;
  };
  return {
    addIngreso,
    getIngresosByCaja,
  };
})();

export default ingresoService;
