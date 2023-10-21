<template>
  <div class="viewport-lists mt-10">
    <Toast message="Egreso Eliminado" ref="toastComponent" />
    <Modal message="egreso" @confirm="deleteEgreso" ref="modalComponent" />
    <div class="bg-white rounded-lg p-4 shadow-md mt-2 mx-auto mb-0">
      <div class="flex items-center mb-2">
        <i class="fas fa-filter text-gray-600 mr-2"></i>
        <label class="text-gray-600">Filtrar por fecha:</label>
      </div>
      <div class="flex items-center space-x-2">
        <input type="date" class="border-gray-300 rounded-md p-1 flex-grow" v-model="startDate" @change="filterEgresos" />
        <span class="text-gray-600">-</span>
        <input type="date" class="border-gray-300 rounded-md p-1 flex-grow" v-model="endDate" @change="filterEgresos" />
        <router-link class="btn btn-sm btn-success mr-1" :to="{ path: '/formegreso', query: { isAdmin: true } }">
          <i class="fas fa-plus-circle mr-1"></i> Agregar Egreso
        </router-link>
        <button class="btn btn-sm btn-primary" @click="fetchEgresos">
          <i class="fas fa-sync-alt"></i> Actualizar
        </button>
      </div>
      <div v-if="showMessage" class="bg-green-100 text-green-800 px-4 py-2 rounded-md mt-2">
        <i class="fas fa-check-circle mr-1"></i> Actualizados
      </div>
      <!-- Visor de cantidad de egresos mostrados -->
      <div class="mt-4 flex justify-evenly items-center">
        <div class="flex items-center text-gray-600">
          <i class="fas fa-clipboard-list mr-1"></i>
          <span>Egresos: {{ filteredEgresos.length }}</span>
        </div>
        <div class="flex items-center text-gray-600">
          <i class="fas fa-dollar-sign mr-1"></i>
          <span>Total: ${{ calculateTotalImporte() }}</span>
        </div>
        <div class="flex items-center text-gray-600">
          <input type="checkbox" class="mr-1" v-model="esUnGasto" @change="filterEgresos" />
          <span>Es un Gasto</span>
        </div>
      </div>
    </div>

    <div>
      <select class="rounded-md mt-2" v-model="results" name="results" id="results">
        <option value="20">20 Resultados</option>
        <option value="30">30 Resultados</option>
        <option value="50">50 Resultados</option>
      </select>

      <div class="bg-white rounded-lg p-4 shadow-md mx-auto mt-1">
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
              <th class="px-2 py-1 text-xs text-gray-500 uppercase tracking-wider">
                Importe
              </th>
              <th class="px-2 py-1 text-xs text-gray-500 uppercase tracking-wider">
                Gasto
              </th>
              <th class="px-2 py-1 text-xs text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(egreso, index) in filteredEgresos" v-show="(pag - 1) * results <= index && pag * results > index">
              <td class="px-2 py-1 whitespace-nowrap">
                {{ formatDate(egreso.fechaRegistro) }}
              </td>
              <td class="px-2 py-1 whitespace-nowrap">
                {{ egreso.descripcion }}
              </td>
              <td class="px-2 py-1 whitespace-nowrap">${{ egreso.importe }}</td>
              <td class="px-2 py-1 whitespace-nowrap">
                <input type="checkbox" :checked="egreso.isGasto" disabled />
              </td>
              <td class="px-2 py-1 whitespace-nowrap">
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-800 focus:outline-none" @click="editEgreso(egreso)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="text-red-600 hover:text-red-800 focus:outline-none" @click="deleteModal(egreso.id)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="flex justify-center">
        <li class="
          page-item
          bg-blue-500
          text-white
          font-semibold
          px-6
          py-3
          sm:w-auto
          rounded-md
          m-2
        " v-show="pag != 1" @click.prevent="pag -= 1">
          <a href="#" aria-label="Previous">
            <span class="hover:text-white" aria-hidden="true">Anterior</span>
          </a>
        </li>
        <li class="
          page-item
          bg-blue-500
          text-white
          font-semibold
          px-6
          py-3
          sm:w-auto
          rounded-md
          m-2
        " v-show="(pag * results) / egresos.length < 1" @click.prevent="pag += 1">
          <a href="#" aria-label="Next">
            <span class="hover:text-white" aria-hidden="true">Siguiente</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import egresoService from '../../composables/api/egresoService.js';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Toast from '../Toast/Toast.vue';
import Modal from '../modalConfirmar/ModalConfirmar.vue';
export default {
  components: {
    Toast,
    Modal,
  },
  name: 'egresos',
  data() {
    return {
      results: 20,
      pag: 1,
    };
  },
  setup() {
    const egresos = ref([]);
    const esUnGasto = ref(false);
    const startDate = ref('');
    const endDate = ref('');
    const showMessage = ref(false);
    const router = useRouter();
    const toastComponent = ref(null);
    const modalComponent = ref(null);
    const modal = ref();

    const fetchEgresos = async () => {
      try {
        const response = await egresoService.getEgresos();
        egresos.value = response.sort((a, b) => {
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

    const formatDate = (date) => {
      const formattedDate = new Date(date).toLocaleString('es', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
      return formattedDate;
    };

    const filterEgresos = () => {
      let filtered = egresos.value.slice();

      if (startDate.value || endDate.value) {
        filtered = filtered.filter((egreso) => {
          const egresoDate = new Date(egreso.fechaRegistro);
          const start = startDate.value ? new Date(startDate.value) : null;
          const end = endDate.value ? new Date(endDate.value) : null;
          const isGasto = egreso.isGasto === true;

          if (end) {
            end.setDate(end.getDate() + 1);
          }

          return (
            (!start || egresoDate >= start) &&
            (!end || egresoDate <= end) &&
            (!esUnGasto.value || isGasto)
          );
        });
      } else {
        if (esUnGasto.value) {
          filtered = filtered.filter((egreso) => {
            const isGasto = egreso.isGasto === true;
            return isGasto;
          });
        }
      }
      filteredEgresos.value = filtered.sort(
        (a, b) => new Date(a.fechaRegistro) - new Date(b.fechaRegistro)
      );
    };

    const filteredEgresos = computed(() => {
      let filtered = egresos.value.slice();

      if (startDate.value || endDate.value) {
        filtered = filtered.filter((egreso) => {
          const egresoDate = new Date(egreso.fechaRegistro);
          const start = startDate.value ? new Date(startDate.value) : null;
          const end = endDate.value ? new Date(endDate.value) : null;
          const isGasto = egreso.isGasto === true;

          if (end) {
            end.setDate(end.getDate() + 1);
          }

          return (
            (!start || egresoDate >= start) &&
            (!end || egresoDate <= end) &&
            (!esUnGasto.value || isGasto)
          );
        });
      } else {
        if (esUnGasto.value) {
          filtered = filtered.filter((egreso) => {
            const isGasto = egreso.isGasto === true;
            return isGasto;
          });
        }
      }

      return filtered.sort((a, b) => {
        const fechaA = new Date(a.fechaRegistro);
        const fechaB = new Date(b.fechaRegistro);
        return fechaB - fechaA;
      });
    });

    // Calcula el total de importe de los egresos mostrados
    const calculateTotalImporte = () => {
      return filteredEgresos.value.reduce((total, egreso) => {
        return total + egreso.importe;
      }, 0);
    };

    const editEgreso = (egreso) => {
      router.push({
        path: '/formegreso',
        query: { isAdmin: true, id: egreso.id },
      });
    };

    const deleteEgreso = async (egresoId) => {
      try {
        await egresoService.deleteEgreso(egresoId);
        modal.value.hide();
        let toast = toastComponent.value.getToast();
        toast[0].show();
        fetchEgresos();

        // Realiza alguna lógica adicional si es necesario
      } catch (error) {
        console.error(error);
      }
    };
    const deleteModal = async (egresoId) => {
      modal.value = await modalComponent.value.getModal(egresoId);
      modal.value.show();
    };

    onMounted(async () => {
      await fetchEgresos();
      await filterEgresos();
    });

    return {
      egresos,
      startDate,
      endDate,
      formatDate,
      filterEgresos,
      filteredEgresos,
      calculateTotalImporte,
      showMessage,
      fetchEgresos,
      deleteEgreso,
      editEgreso,
      router,
      esUnGasto,
      toastComponent,
      modalComponent,
      deleteModal,
      modal,
    };
  },
};
</script>
