<template>
  <div>
    <router-link class="btn btn-sm btn-success mt-2" to="/formlavado">
      <i class="fas fa-plus-circle mr-1"></i> Agregar Lavado
    </router-link>

    <ul>
      <li v-for="lavado in lavados" :key="lavado.id">
        {{ lavado.fecha }} - {{ lavado.descripcion }}
        <!-- Mostrar otros detalles del lavado -->
      </li>
    </ul>
  </div>
</template>

<script>
import lavadoService from '../../composables/api/lavadoService.js';

import { ref, onMounted } from 'vue';

export default {
  setup() {
    const lavados = ref([]);

    const fetchLavados = async () => {
      try {
        const response = await lavadoService.getLavados();
        lavados.value = await response;
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(fetchLavados);

    return {
      lavados,
    };
  },
};
</script>
