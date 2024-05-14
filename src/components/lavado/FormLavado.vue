<template>
  <div class="viewport">
    <div class="card p-4 mx-2 shadow-md overflow-hidden w-fit self-center">
      <div class="mb-3">
        <router-link :to="isAdmin ? '/lavados' : '/ListLavadosCaja'" class="text-emerald-300">&lt; Volver atrás</router-link>
      </div>
      <h1 class="font-bold">Factura</h1>
      <form>
        <div class="form-group">
          <label for="descripcion" class="text-black">Descripción</label>
          <input type="text" class="
                form-input
                mt-1
                block
                w-full
                rounded-md
                border-emerald-300
                shadow-sm
                focus:border-emerald-500 focus:ring focus:ring-emerald-200
              " id="descripcion" v-model="form.descripcion" />
        </div>
        <div class="form-group">
          <label for="tipo-vehiculo" class="text-black">Servicio</label>
          <select class="
                form-select
                mt-1
                block
                w-full
                rounded-md
                border-emerald-300
                shadow-sm
                focus:border-emerald-500 focus:ring focus:ring-emerald-200
              " id="tipo-vehiculo" v-model="form.tipoVehiculoId">
            <option value="">Seleccionar servicio</option>
            <option v-for="tipoVehiculo in tiposVehiculos" :key="tipoVehiculo.id" :value="tipoVehiculo.id">
              {{ tipoVehiculo.descripcion }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="tipo-lavado" class="text-black">Tipo de servicio</label>
          <select class="
                form-select
                mt-1
                block
                w-full
                rounded-md
                border-emerald-300
                shadow-sm
                focus:border-emerald-500 focus:ring focus:ring-emerald-200
              " id="tipo-lavado" v-model="form.tipoLavadoId">
            <option value="">Seleccionar tipo de servicio</option>
            <option v-for="tipoLavado in tiposLavados" :key="tipoLavado.id" :value="tipoLavado.id">
              {{ tipoLavado.descripcion }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="importe" class="text-black">Importe</label>
          <input type="number" class="
                form-input
                mt-1
                block
                w-full
                rounded-md
                border-emerald-300
                shadow-sm
                focus:border-emerald-500 focus:ring focus:ring-emerald-200
              " id="importe" v-model="form.importe" />
        </div>
        <div v-if="isNegativeImport">
          <p class='text-red-600'>No ingresar valores negativos</p>
        </div>
        <div class="form-group" v-if="isAdmin">
          <label for="importe">Fecha</label>
          <input type="date" class="form-control" id="importe" v-model="form.fecha" required />
        </div>
        <button type="submit" class="
              mt-3
              bg-emerald-300
              hover:bg-emerald-500
              text-white
              font-bold
              py-2
              px-4
              rounded
              border-emerald-300
              focus:border-emerald-500 focus:ring focus:ring-emerald-200
            " @click.prevent="submitForm">
          Guardar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import lavadoService from '../../composables/api/lavadoService.js';
import cajaService from '../../composables/api/cajaService.js';

// import { useLavados } from '../services';

export default {
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const idCaja = route.query.idCaja;
    let isAdmin = ref(false);
    let cajaAbierta = ref({});
    let tiposLavados = ref([]);
    let tiposVehiculos = ref([]);
    let isNegativeImport = ref(false)

    // alert(idCaja);
    let form = ref({
      id: 0,
      cajaId: 0,
      fecha: '',
      tipoVehiculoId: '',
      tipoLavadoId: '',
      descripcion: '',
      importe: null,
      responsable: '',
      fecha: ''
      // tipoVehiculo: {
      //   id: 0,
      //   descripcion: '',
      // },
      // tipoLavado: {
      //   id: 0,
      //   descripcion: '',
      // },
    });

    console.log(cajaAbierta);
    // const tiposLavados = ref([{ id: 1, nombre: 'Lavado Común' }]);
    // const tiposVehiculos = useTiposVehiculos();
    // const tiposLavados = useTiposLavados();
    // const lavados = useLavados();

    // const tiposVehiculos = ref([
    //   { id: 1, nombre: 'Camioneta' },
    //   { id: 2, nombre: 'Auto' },
    // ]);

    const submitForm = async () => {
      form.value.cajaId = cajaAbierta.value.id;
      form.value.responsable = cajaAbierta.value.responsable;
      if (form.value.importe < 1) {
        isNegativeImport.value = true
        return
      }
      if (form.value.fecha != '') {
        const fecha = new Date(form.value.fecha)
        const fechaFormateada = fecha.toISOString();
        form.value.fecha = fechaFormateada
      } else {
        form.value.fecha = new Date().toISOString()
      }
      if (form.value.id == 0) {
        await lavadoService.addLavado(form);
      } else {
        await lavadoService.editLavado(form.value);
      }
      form.value = {};
      form.fecha = '';
      form.tipoVehiculoId = '';
      form.tipoLavadoId = '';
      form.descripcion = '';
      form.importe = null;
      form.responsable = '';
      form.fecha = '';
      if (isAdmin.value) {
        router.push('/lavados');
        return;
      } else {
        router.push('/ListLavadosCaja');
      }
    };

    onMounted(async () => {
      cajaAbierta.value = await cajaService.getCajaAbierta();
      tiposLavados.value = await lavadoService.getTipoLavado();
      tiposVehiculos.value = await lavadoService.getTipoVehiculo();

      const query = router.currentRoute.value.query;
      if (query.isAdmin === 'true') {
        isAdmin.value = true;
      }
      if (query.id != null) {
        console.log(query);
        form.value.id = query.id;
        form.value = await lavadoService.getLavadoById(query.id);
      }

      // alert(isAdmin.value);

      // console.log(tipoLavado);
    });

    return {
      isNegativeImport,
      form,
      tiposVehiculos,
      tiposLavados,
      submitForm,
      cajaAbierta,
      idCaja,
      isAdmin,
    };
  },
};
</script>
