import { ref } from 'vue';
import lavadoService from './lavadoService.js';

const cajaService = (() => {
  const caja = ref({
    responsable: '',
    monto: 0,
    isOpen: false,
    cantidadLavados: 0,
  });

  const abrirCaja = async (_data) => {
    caja.value.id = 1;
    caja.value.responsable = _data.responsable;
    caja.value.monto = _data.monto;
    caja.value.isOpen = true;
    caja.value.cantidadLavados = 0;

    return await caja.value;
  };

  const cerrarCaja = async () => {
    caja.value = {};
  };

  const getCajaAbierta = () => {
    // console.log(lavados);
    // caja.value.cantidadLavados;
    var lavadosRelacionados = lavadoService.getLavadosByCaja(caja.value.id);
    lavadosRelacionados.forEach((e) => {
      caja.value.monto += e.importe;
    });
    caja.value.cantidadLavados = lavadosRelacionados.length;

    return caja;
  };

  const getLavadosByCaja = () => {
    const lavados = lavadoService.getLavados();
    caja.value.cantidadLavados = lavados.find((e) => (e.cajaId = 1)).length;
  };

  const getCajas = () => {
    console.log(`${process.env.VUE_APP_API_URL}`);
    fetch(`${process.env.VUE_APP_API_URL}/cajas`)
      .then((response) => response.json())
      .then((data) => console.log(data));
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
