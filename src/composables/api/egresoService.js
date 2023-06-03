import { API_URL } from '../../config.js';

const egresoService = (() => {
  const axios = require('axios');

  const addEgreso = async (data) => {
    await axios
      .post(`${API_URL}/Egreso`, data.value)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getEgresosByCaja = async (_cajaId) => {
    const response = await axios.get(`${API_URL}/egreso/${_cajaId}/egresos`);
    return response.data;
  };
  const getEgresos = async () => {
    const response = await axios.get(`${API_URL}/egreso`);
    return response.data;
  };
  const getEgresoById = async (id) => {
    const response = await axios.get(`${API_URL}/egreso/${id}`);
    return response.data;
  };
  const editEgreso = async (egresos) => {
    const response = await axios.put(
      `${API_URL}/egreso/${egresos.id}`,
      egresos
    );
    return response;
  };
  const deleteEgreso = async (id) => {
    const response = await axios.delete(`${API_URL}/egreso/${id}`);
    return response.data;
  };
  return {
    addEgreso,
    getEgresosByCaja,
    editEgreso,
    getEgresoById,
    getEgresos,
    deleteEgreso,
  };
})();

export default egresoService;
