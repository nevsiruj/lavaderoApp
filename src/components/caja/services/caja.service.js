import { reactive } from 'vue';

const cajaService = (() => {
  const state = reactive({
    cajaAbierta: {},
    monto: 0,
  });

  const abrirCaja = (montoInicial) => {
    state.cajaAbierta = true;
    state.monto = montoInicial;
  };

  const cerrarCaja = () => {
    state.cajaAbierta = false;
    state.monto = 0;
  };

  const getCajaAbierta = () => {
    state.cajaAbierta.responsable = 'Kevin';
    state.cajaAbierta.monto = 0;

    return state.cajaAbierta;
  };

  const depositar = (monto) => {
    state.monto += monto;
  };

  const retirar = (monto) => {
    state.monto -= monto;
  };

  return {
    state,
    getCajaAbierta,
    abrirCaja,
    cerrarCaja,
    depositar,
    retirar,
  };
})();

export default cajaService;
