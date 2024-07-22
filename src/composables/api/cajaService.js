import { ref } from 'vue';
import lavadoService from './lavadoService.js';
import { API_URL } from '../../config.js';

const cajaService = (() => {
  const axios = require('axios');
  const caja = ref({
    responsable: '',
    montoInicial: 0,
    turno: 0,
    isOpen: false,
    cantidadLavados: 0,
  });

  const abrirCaja = async (_data) => {
    caja.value = {};
    caja.value.responsable = _data.responsable;
    caja.value.turno = _data.turno;
    caja.value.montoInicial = _data.montoInicial;
    caja.value.isOpen = true;
    caja.value.cantidadLavados = 0;
    try {
      const response = await fetchWithToken(`${API_URL}/caja`, {
        method: 'POST',
        body: JSON.stringify(caja.value),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials for cookies
      });

      const data = await response.json();
      console.log('Respuesta:', data);
    } catch (error) {
      console.error('Error:', error);
    }
    return caja.value;
  };

  const cerrarCaja = async (id, data) => {
    try {
      /* await axios.post(`${API_URL}/caja/cerrarCaja?cajaId=${id}`, data, {
        withCredentials: true, // Include credentials for cookies
      }); */
      const response = await fetchWithToken(`${API_URL}/caja/cerrarCaja?cajaId=${id}`, { 
      credentials: 'include', method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }, });
      const respuesta = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const getCajaAbierta = async () => {
    try {
      const response = await fetchWithToken(`${API_URL}/caja/cajaabierta`, { credentials: 'include' });
      const data = await response.json();
      caja.value = data;
      return caja.value;
    } catch (error) {
      console.error('Error al obtener caja abierta:', error);
    }

    // Code related to fetching related lavados can be added here
  };

  const getLavadosByCaja = async () => {
    try {
      const lavados = await lavadoService.getLavados();
      caja.value.cantidadLavados = lavados.filter((lavado) => lavado.cajaId === caja.value.id).length;
    } catch (error) {
      console.error('Error al obtener lavados por caja:', error);
    }
  };

  const getCajas = async () => {
    try {
      const response = await fetchWithToken(`${API_URL}/caja`, { credentials: 'include' });
      const data = await response.json();
    } catch (error) {
      console.error('Error al obtener cajas:', error);
    }
  };

  const ingresar = (monto) => {
    caja.value.monto += monto;
  };

  const retirar = (monto) => {
    caja.value.monto -= monto;
  };

  async function fetchWithToken(url, options = {}) {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      options.headers = options.headers || {};
      options.headers['Authorization'] = 'Bearer ' + token;
    }
    options.credentials = 'include';
    const response = await fetch(url, options);
    return response;
  }

  return {
    caja,
    getCajaAbierta,
    abrirCaja,
    cerrarCaja,
    ingresar,
    retirar,
    getCajas,
    getLavadosByCaja,
    fetchWithToken
  };
})();

export default cajaService;
