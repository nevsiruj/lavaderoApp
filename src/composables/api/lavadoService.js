import { ref } from 'vue';

const lavadoService = (() => {
  const lavados = ref([
    {
      id: 0,
      descripcion: 'Corolla',
      fecha: new Date(),
      importe: 750,
      cajaId: 1,
    },
    {
      id: 1,
      descripcion: 'Chevrolet Onix',
      fecha: new Date(),
      importe: 900,
      cajaId: 1,
    },
    {
      id: 2,
      descripcion: 'Ford Fiesta',
      fecha: new Date(),
      importe: 650,
      cajaId: 2,
    },
  ]);
  const error = ref(null);

  // const loadLavados = async () => {
  //   try {
  //     const response = await axios.get('/api/lavados');
  //     lavados.value = response.data;
  //   } catch (err) {
  //     error.value = err.message;
  //   }
  // };

  const getLavados = () => {
    lavados.value;
    return lavados;
  };

  const getLavadosByCaja = (_cajaid) => {
    let lavados = getLavados();
    // return lavados.filter((lavado) => lavado.cajaId === _cajaid);
    return lavados.value.filter((l) => l.cajaId === _cajaid);
  };

  const getCantidadLavados = async () => {
    return lavados.value.length;
  };

  // const addLavado = async (newLavado) => {
  //   try {
  //     const response = await axios.post('/api/lavados', newLavado);
  //     lavados.value.push(response.data);
  //   } catch (err) {
  //     error.value = err.message;
  //   }
  // };

  const addLavado = async (newLavado) => {
    lavados.value.push(newLavado.value);
    console.log(newLavado.value);
    console.log(lavados.value);
    // try {
    //   const response = await axios.post('/api/lavados', newLavado);
    //   lavados.value.push(response.data);
    // } catch (err) {
    //   error.value = err.message;
    // }
  };

  return {
    lavados,
    error,
    getLavados,
    addLavado,
    getCantidadLavados,
    getLavadosByCaja,
  };
})();

export default lavadoService;
