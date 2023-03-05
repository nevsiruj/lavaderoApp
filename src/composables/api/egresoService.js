const egresoService = (() => {
  const axios = require('axios');

  const addEgreso = async (data) => {
    await axios
      .post('https://localhost:44312/api/Egreso', data.value)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getEgresosByCaja = async (_cajaId) => {
    const response = await axios.get(
      `https://localhost:44312/api/Egreso/${_cajaId}/egresos`
    );
    return response.data;
  };
  return {
    addEgreso,
    getEgresosByCaja,
  };
})();

export default egresoService;
