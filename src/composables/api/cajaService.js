import { ref } from 'vue';
import lavadoService from './lavadoService.js';

const cajaService = (() => {
  const axios = require('axios');
  const caja = ref({
    responsable: '',
    montoInicial: 0,
    isOpen: false,
    cantidadLavados: 0,
  });
  const abrirCaja = async (_data) => {
    caja.value.responsable = _data.responsable;
    caja.value.montoInicial = _data.montoInicial;
    caja.value.isOpen = true;
    caja.value.cantidadLavados = 0;
    fetch(`https://localhost:44312/api/caja`, {
      method: 'POST',
      body: JSON.stringify(caja.value),
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
    return await caja.value;
  };

  // const cerrarCaja = async (_data) => {
  //   fetch(`https://localhost:44312/api/caja/cerrarCaja?cajaId=${_data}`, {
  //     method: 'POST',
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         // El cierre de la caja fue exitoso
  //         console.log('La caja fue cerrada exitosamente');
  //       } else {
  //         throw new Error('Ocurrió un error al cerrar la caja');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };
  const cerrarCaja = async (id, data) => {
    debugger;
    await axios
      .post(`https://localhost:44312/api/caja/cerrarCaja?cajaId=${id}`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCajaAbierta = () => {
    fetch(`https://localhost:44312/api/caja/cajaabierta`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        caja.value = data;
        return data.value;
      })
      .catch((e) => false);

    // var lavadosRelacionados = lavadoService.getLavadosByCaja(caja.value.id);
    // lavadosRelacionados.forEach((e) => {
    //   caja.value.monto += e.importe;
    // });
    // caja.value.cantidadLavados = lavadosRelacionados.length;

    return caja.value;
  };

  const getLavadosByCaja = () => {
    const lavados = lavadoService.getLavados();
    caja.value.cantidadLavados = lavados.find((e) => (e.cajaId = 1)).length;
  };

  const getCajas = () => {
    fetch(`https://localhost:44312/api/caja`).then((response) =>
      response.json()
    );
    // .then((data) => console.log(data));
  };

  const ingresar = (monto) => {
    caja.monto += monto;
  };

  const retirar = (monto) => {
    caja.monto -= monto;
  };

  return {
    caja,
    getCajaAbierta,
    abrirCaja,
    cerrarCaja,
    ingresar,
    retirar,
    getCajas,
    getLavadosByCaja,
  };
})();

export default cajaService;
