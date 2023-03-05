<template>
  <div class="container">
    <h1>Ingresos</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Importe</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ingreso in ingresos" :key="ingreso.id">
          <td>{{ ingreso.descripcion }}</td>
          <td>{{ ingreso.importe }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
    let ingresos = ref([]);

    onMounted(async () => {
      cajaAbierta = cajaService.getCajaAbierta();
      ingresos.value = await ingresoService.getIngresosByCaja(
        cajaAbierta.value.id
      );
      console.log(ingresos);
    });

    return {
      cajaAbierta,
      ingresos,
    };
  },
  name: 'Ingreso',
  props: {},
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
