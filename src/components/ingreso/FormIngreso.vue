<template>
 <div class="container mt-3">
   
  <div class="container mt-3">
     <div class="mb-3">
      <router-link :to="isAdmin ? '/ingresos' : '/'" class="text-blue-500"
        >&lt; Volver atrás</router-link
      >
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
    const isAdmin = ref(false);

    let form = ref({
      id: 0,
      descripcion: '',
      importe: 0,
      cajaId: 0,
      fechaIngreso: '',
    });
    const submitForm =async  () => {
      form.value.cajaId = cajaAbierta.value.id;
      form.value.fechaIngreso = new Date();

       if (form.value.id == 0) {
        await ingresoService.addIngreso(form);

      } else {
        await ingresoService.editIngreso(form.value);
      }
      form.value = {};
      form.descripcion = '';
      form.importe = '';
      form.fechaIngreso = '';
      if (isAdmin.value) {
        router.push('/ingresos');
        return;
      }
      router.push('/');
    };

    onMounted(async () => {
      cajaAbierta = cajaService.getCajaAbierta();
      const query = router.currentRoute.value.query;
      if (query.isAdmin === 'true') {
        isAdmin.value = true;
      }
      if (query.id != null) {
        console.log(query);
        form.value.id = query.id;
        form.value = await ingresoService.getIngresoById(query.id);
      }
    });

    return {
      cajaAbierta,
      form,
      submitForm,
      isAdmin,
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
