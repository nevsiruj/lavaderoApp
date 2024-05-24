<template>
  <div class="mt-10">
    <h1 class="text-3xl font-semibold mb-6 " >Ventas</h1>
    <Toast message="Lavado Eliminado" ref="toastComponent" />
    <Modal message="lavado" @confirm="deleteLavado" ref="modalComponent" />

    <div class="m-auto rounded-lg py-4 px-4">
      <div class="bg-white rounded-lg p-6 shadow-md mx-auto mb-0">
        <div class="flex items-center mb-4">
          <i class="fas fa-filter text-gray-600 mr-4"></i>
          <label class="text-gray-600 text-base">Filtrar por fecha:</label>
        </div>
        <div class="flex flex-col md:flex-row md:gap-6 md:items-center mb-4">
  <div class="flex flex-col md:flex-row md:items-center  md:mb-0 w-full md:w-auto">
    <input
      type="date"
      class="border-gray-300 rounded-md p-2 flex-grow text-base w-full md:w-auto mb-2 md:mb-0 md:mr-4"
      v-model="startDate"
      @change="filterLavados"
    />
    <span class="mx-4 text-gray-600 text-base hidden md:inline-block">-</span>
    <input
      type="date"
      class="border-gray-300 rounded-md p-2 flex-grow text-base w-full md:w-auto"
      v-model="endDate"
      @change="filterLavados"
    />
  </div>
  <div class="flex items-center">
    <router-link
      class="btn btn-base btn-success mr-4"
      :to="{ path: '/formlavado', query: { isAdmin: true } }"
    >
      <i class="fas fa-plus-circle mr-2"></i> Agregar Lavado
    </router-link>
    <button class="btn btn-base btn-primary" @click="fetchLavados">
      <i class="fas fa-sync-alt mr-2"></i> Actualizar
    </button>
  </div>
</div>

        <div v-if="showMessage" class="bg-green-100 text-green-800 px-4 py-2 rounded-md mt-4 text-base">
          <i class="fas fa-check-circle mr-2"></i> Actualizados
        </div>
        <!-- Visor de cantidad de lavados mostrados -->
        <div class="mt-6 flex justify-evenly items-center">
          <div class="flex items-center text-gray-600 text-base">
            <i class="fas fa-clipboard-list mr-2"></i>
            <span>Lavados: {{ filteredLavados.length }}</span>
          </div>
          <div class="flex items-center text-gray-600 text-base">
            <i class="fas fa-dollar-sign mr-2"></i>
            <span>Facturado: ${{ calculateTotalImporte() }}</span>
          </div>
        </div>
      </div>
    </div>

    <div>
      <select class="rounded-md mt-2" v-model="results" name="results" id="results">
        <option value="20">20 Resultados</option>
        <option value="30">30 Resultados</option>
        <option value="50">50 Resultados</option>
      </select>
    </div>

    
    <div class="md:w-fit w-full bg-white rounded-lg p-4 shadow-lg mx-auto mt-2 overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-300 mt-4">
        <!-- Table headers -->
        <thead class="bg-emerald-300">
          <tr>
            <th class="px-4 py-2 text-xs text-gray-700 uppercase tracking-wider">
              Fecha
            </th>
            <th class="px-4 py-2 text-xs text-gray-700 uppercase tracking-wider">
              Descripción
            </th>
            <th class="px-4 py-2 text-xs text-gray-700 uppercase tracking-wider">
              Importe
            </th>
            <th class="px-4 py-2 text-xs text-gray-700 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(lavado, index) in filteredLavados"
            v-show="(pag - 1) * results <= index && pag * results > index"
            :key="lavado.id"
          >
            <td class="px-6 py-3 whitespace-nowrap text-base">
              {{ formatDate(lavado.fecha) }}
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-base">
              {{ lavado.descripcion }}
            </td>
            <td class="px-4 py-2 whitespace-nowrap text-base">${{ lavado.importe }}</td>
            <td class="px-4 py-2 whitespace-nowrap text-base">
              <div class="flex space-x-2">
                <button class="text-blue-600 hover:text-blue-800 focus:outline-none text-xl" @click="editLavado(lavado)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="text-red-600 hover:text-red-800 focus:outline-none text-xl" @click="openModal(lavado.id)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <nav aria-label="Page navigation example">
      <ul class="flex justify-center">
        <li
          class="page-item bg-emerald-300 text-white font-semibold px-6 py-3 sm:w-auto rounded-md m-2"
          v-show="pag != 1"
          @click.prevent="pag -= 1"
        >
          <a href="#" aria-label="Previous">
            <span class="hover:text-white" aria-hidden="true">Anterior</span>
          </a>
        </li>
        <li
          class="page-item bg-emerald-300 text-white font-semibold px-6 py-3 sm:w-auto rounded-md m-2"
          v-show="(pag * results) / lavados.length < 1"
          @click.prevent="pag += 1"
        >
          <a href="#" aria-label="Next">
            <span class="hover:text-white" aria-hidden="true">Siguiente</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>




<script>
import lavadoService from "../../composables/api/lavadoService.js";
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Toast from "../Toast/Toast.vue";
import Modal from "../modalConfirmar/ModalConfirmar.vue";
export default {
  components: {
    Toast,
    Modal,
  },
  name: "lavados",
  data() {
    return {
      results: 20,
      pag: 1,
    };
  },
  setup() {
    const lavados = ref([]);
    const startDate = ref("");
    const endDate = ref("");
    const showMessage = ref(false);
    const router = useRouter();
    const toastComponent = ref(null);
    const modalComponent = ref(null);
    const modal = ref();

    const fetchLavados = async () => {
      try {
        const response = await lavadoService.getLavados();
        lavados.value = await response.sort((a, b) => {
          const fechaA = new Date(a.fecha);
          const fechaB = new Date(b.fecha);

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

    const formatDate = (date) => {
      const formattedDate = new Date(date).toLocaleString("es", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
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
    };

    const filteredLavados = computed(() => {
      if (startDate.value || endDate.value) {
        return lavados.value.filter((lavado) => {
          const lavadoDate = new Date(lavado.fecha);
          const start = startDate.value ? new Date(startDate.value) : null;
          const end = endDate.value ? new Date(endDate.value) : null;
          if (end) {
            end.setDate(end.getDate() + 1);
          }
          return (!start || lavadoDate >= start) && (!end || lavadoDate <= end);
        });
      } else {
        return lavados.value;
      }
    });

    // Calcula el total de importe de los lavados mostrados
    const calculateTotalImporte = () => {
      return filteredLavados.value.reduce((total, lavado) => {
        return total + lavado.importe;
      }, 0);
    };
    const editLavado = (lavado) => {
      router.push({
        path: "/formlavado",
        query: { isAdmin: true, id: lavado.id },
      });
    };

    const deleteLavado = async (lavadoId) => {
      try {
        await lavadoService.deleteLavado(lavadoId);
        modal.value.hide();
        let toast = toastComponent.value.getToast();
        toast[0].show();
        fetchLavados();
        // Realiza alguna lógica adicional si es necesario
      } catch (error) {
        console.error(error);
      }
    };
    const openModal = async (lavadoId) => {
      modal.value = await modalComponent.value.getModal(lavadoId);
      modal.value.show();
    };

    onMounted(async () => {
      await fetchLavados();
      await filterLavados();
    });

    return {
      lavados,
      startDate,
      endDate,
      showMessage,
      filteredLavados,
      router,
      toastComponent,
      modalComponent,
      modal,
      formatDate,
      filterLavados,
      calculateTotalImporte,
      fetchLavados,
      deleteLavado,
      editLavado,
      openModal,
    };
  },
};
</script>

<style>
.viewport {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
}

.table-container {
  max-width: 100%;
  overflow-x: auto;
}

table {
  min-width: 100%;
}
</style>



