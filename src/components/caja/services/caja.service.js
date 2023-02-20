import { reactive } from 'vue';

const cajaService = (() => {
  const state = reactive({
    caja: { responsable: '', monto: 0, isOpen: false },
  });

  const abrirCaja = async (_data) => {
    state.caja.responsable = _data.responsable;
    state.caja.monto = _data.monto;
    state.caja.isOpen = true;

    return await state.caja;
  };

  const cerrarCaja = async () => {
    // state.caja = false;
    state.monto = 0;
  };

  const getCajaAbierta = () => {
    return state.caja;
  };

  const ingresar = (monto) => {
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
    ingresar,
    retirar,
  };
})();

export default cajaService;
