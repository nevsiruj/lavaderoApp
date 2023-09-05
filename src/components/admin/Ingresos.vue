<template>
  <Modal message="ingreso" @confirm="deleteIngreso" ref="modalComponent" />

  <div>
    <router-link
      class="btn btn-sm btn-success mt-2 mr-1"
      :to="{ path: '/formingreso', query: { isAdmin: true } }"
    >
      <i class="fas fa-plus-circle mr-1"></i> Agregar Ingreso
    </router-link>
    <button class="btn btn-sm btn-primary mt-2" @click="fetchIngresos">
      <i class="fas fa-sync-alt"></i> Actualizar
    </button>
    <div
      v-if="showMessage"
      class="bg-green-100 text-green-800 px-4 py-2 rounded-md mt-2"
    >
      <i class="fas fa-check-circle mr-1"></i> Actualizados
    </div>

    <div class="bg-white rounded-lg p-4 shadow-md mx-auto max-w-sm mb-0">
      <div class="flex items-center mb-2">
        <i class="fas fa-filter text-gray-600 mr-2"></i>
        <label class="text-gray-600">Filtrar por fecha:</label>
      </div>
      <div class="flex space-x-2">
        <input
          type="date"
          class="border-gray-300 rounded-md p-1 flex-grow"
          v-model="startDate"
          @change="filterIngresos"
        />
        <span class="text-gray-600">-</span>
        <input
          type="date"
          class="border-gray-300 rounded-md p-1 flex-grow"
          v-model="endDate"
          @change="filterIngresos"
        />
      </div>
      <!-- Visor de cantidad de ingresos mostrados -->
      <div class="mt-4 flex justify-between items-center">
        <div class="flex items-center text-gray-600">
          <i class="fas fa-clipboard-list mr-1"></i>
          <span>Ingresos: {{ filteredIngresos.length }}</span>
        </div>
        <div class="flex items-center text-gray-600">
          <i class="fas fa-dollar-sign mr-1"></i>
          <span>Facturado: ${{ calculateTotalImporte() }}</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg p-4 shadow-md mx-auto mt-1">
      <table class="min-w-full divide-y divide-gray-200 mt-4">
        <!-- Table headers -->
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-2 py-1 text-xs text-gray-500 uppercase tracking-wider"
            >
              Fecha
            </th>
            <th
              class="px-2 py-1 text-xs text-gray-500 uppercase tracking-wider"
            >
              Descripción
            </th>
            <th
              class="px-2 py-1 text-xs text-gray-500 uppercase tracking-wider"
            >
              Importe
            </th>
            <th
              class="px-2 py-1 text-xs text-gray-500 uppercase tracking-wider"
            ></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="ingreso in filteredIngresos" :key="ingreso.id">
            <td class="px-2 py-1 whitespace-nowrap">
              {{ formatDate(ingreso.fechaRegistro) }}
            </td>
            <td class="px-2 py-1 whitespace-nowrap">
              {{ ingreso.descripcion }}
            </td>
            <td class="px-2 py-1 whitespace-nowrap">${{ ingreso.importe }}</td>
            <td class="px-2 py-1 whitespace-nowrap">
              <div class="flex space-x-2">
                <button
                  class="text-blue-600 hover:text-blue-800 focus:outline-none"
                  @click="editIngreso(ingreso)"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  class="text-red-600 hover:text-red-800 focus:outline-none"
                  @click="openModal(ingreso.id)"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ingresoService from '../../composables/api/ingresoService.js';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Modal from '../modalConfirmar/ModalConfirmar.vue';

export default {
  name: 'ingresos',
  components: {
    Modal
  },
  setup() {
    const ingresos = ref([]);
    const startDate = ref('');
    const endDate = ref('');
    const showMessage = ref(false);
    const router = useRouter();
    const modalComponent= ref(null)
    const modal= ref()

    const fetchIngresos = async () => {
      try {
        const response = await ingresoService.getIngresos();
        ingresos.value = response.sort((a, b) => {
          const fechaA = new Date(a.fechaRegistro);
          const fechaB = new Date(b.fechaRegistro);

          showMessage.value = true;
          setTimeout(() => {
            showMessage.value = false;
          }, 2000);

          return fechaB - fechaA;
        });
      } catch (error) {
        console.error(error);
      }
    };

    const filteredIngresos = computed(() => {
      const start = startDate.value ? new Date(startDate.value) : null;
      const end = endDate.value ? new Date(endDate.value) : null;

      const filtered = ingresos.value.filter((ingreso) => {
        const ingresoDate = new Date(ingreso.fechaRegistro);
        return (!start || ingresoDate >= start) && (!end || ingresoDate <= end);
      });

      return filtered.sort((a, b) => {
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);
        return fechaB - fechaA;
      });
    });
    const formatDate = (date) => {
      const formattedDate = new Date(date).toLocaleString('es', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
      return formattedDate;
    };

    const filterIngresos = async () => {
      const filtered = ingresos.value.filter((ingreso) => {
        const ingresoDate = new Date(ingreso.fechaRegistro);
        const start = startDate.value ? new Date(startDate.value) : null;
        const end = endDate.value ? new Date(endDate.value) : null;
        return (!start || ingresoDate >= start) && (!end || ingresoDate <= end);
      });
    };
    // Calcula el total de importe de los ingresos mostrados
    const calculateTotalImporte = () => {
      return filteredIngresos.value.reduce((total, ingreso) => {
        return total + ingreso.importe;
      }, 0);
    };

    const editIngreso = (ingreso) => {
      router.push({
        path: '/formingreso',
        query: { isAdmin: true, id: ingreso.id },
      });
    };

    const deleteIngreso = async (ingresoId) => {
      try {
        await ingresoService.deleteIngreso(ingresoId);
        modal.value.hide()
        fetchIngresos();
        // Realiza alguna lógica adicional si es necesario
      } catch (error) {
        console.error(error);
      }
    };
    const openModal = async (ingresoId)=>{
      modal.value = await modalComponent.value.getModal(ingresoId);
      modal.value.show()
    }
 
    onMounted(async () => {
      await fetchIngresos();
      await filterIngresos();
    });

    return {
      ingresos,
      startDate,
      endDate,
      formatDate,
      filterIngresos,
      filteredIngresos,
      calculateTotalImporte,
      showMessage,
      fetchIngresos,
      deleteIngreso,
      editIngreso,
      router,
      modalComponent,
      modal,
      openModal
    };
  },
};
</script>
