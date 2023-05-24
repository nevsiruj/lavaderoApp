<template>
  <div>
    <router-link
      class="btn btn-sm btn-success mt-2"
      :to="{ path: '/formlavado' }"
    >
      <!-- <router-link
      class="btn btn-sm btn-success mt-2"
      :to="{ path: '/formlavado', query: { idCaja: idCaja } }"
    > -->
      <i class="fas fa-plus-circle mr-1"></i> Agregar Lavado
    </router-link>

    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <!-- Encabezados de la tabla -->
        <tr>
          <th
            scope="col"
            class="
              px-6
              py-3
              text-left text-sm
              font-medium
              text-gray-500
              uppercase
              tracking-wider
            "
          >
            Fecha
          </th>
          <th
            scope="col"
            class="
              px-6
              py-3
              text-left text-sm
              font-medium
              text-gray-500
              uppercase
              tracking-wider
            "
          >
            Descripción
          </th>
          <th
            scope="col"
            class="
              px-6
              py-3
              text-left text-sm
              font-medium
              text-gray-500
              uppercase
              tracking-wider
            "
          >
            <!-- Descripción -->
          </th>
          <!-- Agrega columnas adicionales según los detalles del lavado -->
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="lavado in lavados" :key="lavado.id">
          <td class="px-6 py-4 whitespace-nowrap">
            {{ formatDate(lavado.fecha) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ lavado.descripcion }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex space-x-4 items-center">
              <button
                class="text-blue-600 hover:text-blue-800 focus:outline-none"
                @click="editLavado(lavado.id)"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                class="text-red-600 hover:text-red-800 focus:outline-none"
                @click="deleteLavado(lavado.id)"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import lavadoService from '../../composables/api/lavadoService.js';

import { ref, onMounted } from 'vue';

export default {
  setup() {
    const lavados = ref([]);
    const menuOpen = ref(new Map());

    const toggleMenu = (id) => {
      const isOpen = menuOpen.value.get(id) || false;
      menuOpen.value.set(id, !isOpen);
    };

    const isMenuOpen = (id) => {
      return menuOpen.value.get(id) || false;
    };

    const fetchLavados = async () => {
      try {
        const response = await lavadoService.getLavados();
        lavados.value = await response;
      } catch (error) {
        console.error(error);
      }
    };

    const formatDate = (date) => {
      const fechaOriginal = date;
      const fechaFormateada = `${fechaOriginal.substr(
        8,
        2
      )}/${fechaOriginal.substr(5, 2)} ${fechaOriginal.substr(11, 5)}`;

      return fechaFormateada;
    };

    onMounted(fetchLavados);

    return {
      lavados,
      formatDate,
      toggleMenu,
      isMenuOpen,
    };
  },
};
</script>
