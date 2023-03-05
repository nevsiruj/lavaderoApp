<template>
  <div class="container mt-3">
    <form>
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <input
          type="text"
          class="form-control form-control-sm"
          id="descripcion"
          v-model="form.descripcion"
        />
      </div>
      <div class="form-group">
        <label for="tipo-vehiculo">Tipo de vehículo</label>
        <select
          class="form-control form-control-sm"
          id="tipo-vehiculo"
          v-model="form.tipoVehiculoId"
        >
          <option value="">Seleccionar tipo de vehículo</option>
          <option
            v-for="tipoVehiculo in tiposVehiculos"
            :key="tipoVehiculo.id"
            :value="tipoVehiculo.id"
          >
            {{ tipoVehiculo.descripcion }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="tipo-lavado">Tipo de lavado</label>
        <select
          class="form-control form-control-sm"
          id="tipo-lavado"
          v-model="form.tipoLavadoId"
        >
          <option value="">Seleccionar tipo de lavado</option>
          <option
            v-for="tipoLavado in tiposLavados"
            :key="tipoLavado.id"
            :value="tipoLavado.id"
          >
            {{ tipoLavado.descripcion }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="importe">Importe</label>
        <input
          type="number"
          class="form-control form-control-sm"
          id="importe"
          v-model="form.importe"
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary mt-3"
        @click.prevent="submitForm"
      >
        Guardar
      </button>
    </form>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import lavadoService from '../../composables/api/lavadoService.js';
import cajaService from '../../composables/api/cajaService.js';

// import { useLavados } from '../services';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const form = ref({
      id: 0,
      cajaId: 0,
      fecha: '',
      tipoVehiculoId: '',
      tipoLavadoId: '',
      descripcion: '',
      importe: '',
      // tipoVehiculo: {
      //   id: 0,
      //   descripcion: '',
      // },
      // tipoLavado: {
      //   id: 0,
      //   descripcion: '',
      // },
    });
    let tiposLavados = ref([]);
    let tiposVehiculos = ref([]);
    let cajaAbierta = ref({});
    cajaAbierta = cajaService.getCajaAbierta();
    console.log(cajaAbierta);
    // const tiposLavados = ref([{ id: 1, nombre: 'Lavado Común' }]);
    // const tiposVehiculos = useTiposVehiculos();
    // const tiposLavados = useTiposLavados();
    // const lavados = useLavados();

    // const tiposVehiculos = ref([
    //   { id: 1, nombre: 'Camioneta' },
    //   { id: 2, nombre: 'Auto' },
    // ]);

    const submitForm = () => {
      form.value.cajaId = cajaAbierta.value.id;
      form.value.fecha = new Date();
      // form.value.tipoLavado.id = form.value.tipoLavadoId;
      // form.value.tipoVehiculo.id = form.value.tipoVehiculoId;
      lavadoService.addLavado(form);
      form.value = {};
      form.fecha = '';
      form.tipoVehiculoId = '';
      form.tipoLavadoId = '';
      form.descripcion = '';
      form.importe = '';
      router.push('/');
    };
    onMounted(async () => {
      tiposLavados.value = await lavadoService.getTipoLavado();
      tiposVehiculos.value = await lavadoService.getTipoVehiculo();

      // console.log(tipoLavado);
    });

    return {
      form,
      tiposVehiculos,
      tiposLavados,
      submitForm,
      cajaAbierta,
    };
  },
};
</script>
