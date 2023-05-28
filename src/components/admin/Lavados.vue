<template>
  <div>
    <router-link
      class="btn btn-sm btn-success mt-2"
      :to="{ path: '/formlavado' }"
    >
      <i class="fas fa-plus-circle mr-1"></i> Agregar Lavado
    </router-link>

    <div class="mt-4 flex flex-col items-center sm:flex-row sm:justify-center">
      <label class="mb-1 text-gray-600">Filtrar por fecha:</label>
      <div class="flex space-x-2">
        <input
          type="datetime-local"
          class="border-gray-300 rounded-md p-1"
          v-model="startDate"
          @change="filterLavados"
        />
        <span class="text-gray-600">-</span>
        <input
          type="datetime-local"
          class="border-gray-300 rounded-md p-1"
          v-model="endDate"
          @change="filterLavados"
        />
      </div>
    </div>

    <table class="min-w-full divide-y divide-gray-200 mt-4">
      <!-- Table headers -->
      <thead class="bg-gray-50">
        <tr>
          <th class="px-2 py-1 text-xs text-gray-500 uppercase tracking-wider">
            Fecha
          </th>
          <th class="px-2 py-1 text-xs text-gray-500 uppercase tracking-wider">
            Descripción
          </th>
          <th
            class="px-2 py-1 text-xs text-gray-500 uppercase tracking-wider"
          ></th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="lavado in filteredLavados" :key="lavado.id">
          <td class="px-2 py-1 whitespace-nowrap">
            {{ formatDate(lavado.fecha) }}
          </td>
          <td class="px-2 py-1 whitespace-nowrap">{{ lavado.descripcion }}</td>
          <td class="px-2 py-1 whitespace-nowrap">
            <div class="flex space-x-2">
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
import { ref, onMounted, computed } from 'vue';

export default {
  setup() {
    const lavados = ref([]);
    const startDate = ref('');
    const endDate = ref('');

    const fetchLavados = async () => {
      try {
        const response = await lavadoService.getLavados();
        lavados.value = await response.sort((a, b) => {
          const fechaA = new Date(a.fecha);
          const fechaB = new Date(b.fecha);
          return fechaB - fechaA;
        });
      } catch (error) {
        console.error(error);
      }
    };

    const formatDate = (date) => {
      const formattedDate = new Date(date).toLocaleString('es', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
      return formattedDate;
    };

    const filterLavados = () => {
      const filtered = lavados.value.filter((lavado) => {
        const lavadoDate = new Date(lavado.fecha);
        const start = startDate.value ? new Date(startDate.value) : null;
        const end = endDate.value ? new Date(endDate.value) : null;
        return (!start || lavadoDate >= start) && (!end || lavadoDate <= end);
      });
      filteredLavados.value = filtered;
    };

    const filteredLavados = computed(() => {
      if (startDate.value || endDate.value) {
        return lavados.value.filter((lavado) => {
          const lavadoDate = new Date(lavado.fecha);
          const start = startDate.value ? new Date(startDate.value) : null;
          const end = endDate.value ? new Date(endDate.value) : null;
          return (!start || lavadoDate >= start) && (!end || lavadoDate <= end);
        });
      } else {
        return lavados.value;
      }
    });

    onMounted(fetchLavados);

    return {
      lavados,
      startDate,
      endDate,
      formatDate,
      filterLavados,
      filteredLavados,
    };
  },
};
</script>
