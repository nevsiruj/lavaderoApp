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
    const response = await axios.get(`${API_URL}/ingreso/${_cajaId}/ingresos`);
    return response.data;
  };
  const getIngresos = async () => {
    const response = await axios.get(`${API_URL}/ingreso`);
    return response.data;
  };
  const getIngresoById = async (id) => {
    const response = await axios.get(`${API_URL}/ingreso/${id}`);
    return response.data;
  };
  const editIngreso = async (ingreso) => {
    const response = await axios.put(
      `${API_URL}/ingreso/${ingreso.id}`,
      ingreso
    );
    return response;
  };
  const deleteIngreso = async (id) => {
    const response = await axios.delete(`${API_URL}/ingreso/${id}`);
    return response.data;
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
