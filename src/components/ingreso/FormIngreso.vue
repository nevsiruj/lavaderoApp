<template>
  <div class="container mt-3">
    <div class="mb-3">
      <router-link to="/"> &lt;Volver atrás </router-link>
    </div>
    <h1>Ingresos</h1>
    <form>
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <input
          type="text"
          class="form-control"
          id="descripcion"
          v-model="form.descripcion"
          required
        />
      </div>
      <div class="form-group">
        <label for="importe">Importe</label>
        <input
          type="number"
          class="form-control"
          id="importe"
          v-model="form.importe"
          required
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
// import cajaService from '../services/caja.service.js';
import cajaService from '../../composables/api/cajaService.js';
import ingresoService from '../../composables/api/ingresoService.js';
import { reactive, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    let cajaAbierta = ref({});
    const router = useRouter();
    const route = useRoute();
    cajaAbierta = cajaService.getCajaAbierta();
    let form = ref({
      id: 0,
      descripcion: '',
      importe: 0,
      cajaId: 0,
      fechaIngreso: '',
    });
    const submitForm = () => {
      form.value.cajaId = cajaAbierta.value.id;
      form.value.fechaIngreso = new Date();

      ingresoService.addIngreso(form);
      form.value = {};
      form.descripcion = '';
      form.importe = '';
      form.fechaIngreso = '';
      router.push('/');
    };

    onMounted(() => {
      cajaAbierta = cajaService.getCajaAbierta();
    });

    return {
      cajaAbierta,
      form,
      submitForm,
    };
  },
  name: 'IngresoForm',
  props: {},
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
