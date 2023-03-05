<template>
  <div class="container">
    <h1>Egresos</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Importe</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="egreso in egresos" :key="egreso.id">
          <td>{{ egreso.descripcion }}</td>
          <td>{{ egreso.importe }}</td>
        </tr>
      </tbody>
    </table>
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
    let egresos = ref([]);

    onMounted(async () => {
      cajaAbierta = cajaService.getCajaAbierta();
      egresos.value = await egresoService.getEgresosByCaja(
        cajaAbierta.value.id
      );
      console.log(egresos);
    });

    return {
      cajaAbierta,
      egresos,
    };
  },
  name: 'Egreso',
  props: {},
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
