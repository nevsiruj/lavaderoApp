<template>
  <div>
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
        const response = await lavadoService.
        lavados.value = await reponse
        console.log(lavados.value)
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
