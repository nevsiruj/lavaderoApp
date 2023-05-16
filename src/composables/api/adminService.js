const adminService = (() => {
  const axios = require('axios');

  const getDatosPorFecha = async (fechaInicio, fechaFin) => {
    // const options = {
    //   headers: {
    //     fechaInicio: fechaInicio,
    //     fechaFin: fechaFin,
    //   },
    // };
    const response = await axios.get(
      `https://localhost:44312/DatosEntreFechas`,
      {
        params: {
          fechaInicio: fechaInicio,
          fechaFin: fechaFin,
        },
      }
    );
    return response.data;
  };
  return {
    getDatosPorFecha,
  };
})();

export default adminService;
