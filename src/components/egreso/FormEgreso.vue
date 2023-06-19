<template>
  <div class="container mt-3">
    <div class="mb-3">
      <router-link :to="isAdmin ? '/egresos' : '/'" class="text-blue-500"
        >&lt; Volver atrás</router-link
      >
    </div>
    <h1>Egresos</h1>
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
      <div class="form-group" v-if="isAdmin">
        <label for="importe">Fecha</label>
        <input
          type="date"
          class="form-control"
          id="importe"
          v-model="form.fechaIngreso"
          required
        />
      </div>
      <div class="form-check">
        <label class="form-check-label" for="flexCheckDefault">
          Es un Gasto
        </label>
        <input
          class="form-check-input"
          type="checkbox"
          v-model="form.isGasto"
          id="flexCheckDefault"
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
import egresoService from '../../composables/api/egresoService.js';

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
      isGasto: false,
    });
    let isAdmin = ref(false);
    const submitForm = async () => {
      form.value.cajaId = cajaAbierta.value.id;
      debugger;
      if (form.value.fechaIngreso === '') {
        const fecha = new Date();
        const fechita = fecha.toLocaleString('en-US', { timeZone: 'UTC' });
        form.value.fechaIngreso = fechita;
      }
      if (form.value.id == 0) {
        egresoService.addEgreso(form);
      } else {
        await egresoService.editEgreso(form.value);
      }
      form.value = {};
      form.descripcion = '';
      form.importe = '';
      form.fechaIngreso = '';
      if (isAdmin.value) {
        router.push('/egresos');
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
        form.value = await egresoService.getEgresoById(query.id);
      }
    });

    return {
      cajaAbierta,
      form,
      submitForm,
      isAdmin,
    };
  },
  name: 'EgresoForm',
  props: {},
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
