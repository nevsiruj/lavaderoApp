<template>
  <div class="grid grid-flow-row gap-4">
    <div class="flex justify-center min-height-auto">
      <h1
        class="text-3xl text-center font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white"
      >
        Ventas
      </h1>
    </div>
    
    <span>
      <svg
        class="w-5 h-5 inline-block text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="2"
          d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
        />
      </svg>
      Filtro por fecha:
    </span>
    <!--Fechas y flitro-->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <input
          type="date"
          v-model="startDate"
          @change="filterLavados"
          class="form-control block px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          type="date"
          v-model="endDate"
          @change="filterLavados"
          class="form-control block px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div>
        <router-link :to="{ path: '/formlavado', query: { isAdmin: true } }">
          <button
            type="button"
            class="focus:outline-none text-white bg-[#3edfa9] hover:bg-[#ffe068] focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 md:px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            <svg
              class="w-6 h-6 inline-block text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Agregar Venta
          </button></router-link
        >
      </div>
      <div>
        <button
          type="button"
          @click="fetchLavados"
          class="text-white bg-[#3edfa9] hover:bg-[#ffe068] font-medium rounded-lg text-sm px-2 md:px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          <svg
            class="w-6 h-6 inline-block text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
            />
          </svg>
          Actualizar
        </button>
      </div>
    </div>
    <!--Fechas y flitro-->
    <div
      class="grid grid-flow-row gap-4 md:flex inline-block lg:flex inline-block"
    >
      <span
        class="bg-green-100 text-green-800 text-md font-medium me-2 px-3.5 py-2 rounded dark:bg-green-900 dark:text-green-300"
        ><svg
          class="w-6 h-6 inline-block text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 3v4a1 1 0 0 1-1 1H5m8-2h3m-3 3h3m-4 3v6m4-3H8M19 4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM8 12v6h8v-6H8Z"
          />
        </svg>
        Registros: {{ filteredLavados.length }}</span
      >

      <span
        class="bg-green-100 text-green-800 text-md font-medium me-2 px-3.5 py-2 rounded dark:bg-green-900 dark:text-green-300"
        ><svg
          class="w-6 h-6 inline-block text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
          />
        </svg>
        Facturados: ${{ calculateTotalImporte() }}</span
      >
    </div>
    <hr class="divide-y divide-gray-100" />
    <div class="flex justify-start min-height-auto">
      <form>
        <select
        v-model="results"
        name="results"
        id="results"
          class="bg-gray-50 border border-[#3edfa9] text-gray-900 text-sm rounded-lg focus:ring-[#3edfa9] focus:border-[#3edfa9] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Mostrar resultados</option>
          <option value="20">20 Resultados</option>
          <option value="30">30 Resultados</option>
          <option value="50">50 Resultados</option>
        </select>
      </form>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-[#96ffdf] dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Fecha</th>
            <th scope="col" class="px-6 py-3">Descripción</th>
            <th scope="col" class="px-6 py-3">Metodo de Pago</th>
            <th scope="col" class="px-6 py-3">Importe</th>
            <th scope="col" class="px-6 py-3">Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            v-for="(lavado, index) in filteredLavados"
            v-show="(pag - 1) * results <= index && pag * results > index"
            :key="lavado.id"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ formatDate(lavado.fecha) }}
            </th>
            <td class="px-6 py-4">{{ lavado.descripcion }}</td>

            <td class="px-6 py-4">${{ lavado.metodoPago }}</td>
            <td class="px-6 py-4">${{ lavado.importe }}</td><br/>
            <td class="grid lg:flex md:flex px-2 md:px-6 py-4 lg:text-left md:text-center">
              <a
                href="#"
                @click="editLavado(lavado)"
                class="font-medium text-gray-800 dark:text-white hover:underline"
                ><svg
                  class="w-4 h-4 inline-block text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                  />
                </svg>
                Editar</a
              >
              <a
                href="#"
                @click="deleteModal(lavado.id)"
                class="font-medium text-red-500 dark:text-white hover:underline lg:ml-5"
                ><svg
                  class="w-4 h-4 inline-block text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="#ef4444"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
                Eliminar</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <Modal message="Registro" @confirm="deleteLavado" ref="modalComponent" />
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
        //modal.value.hidde();
        fetchLavados();
        
      } catch (error) {
        console.error(error);
      }
    };
    const deleteModal = async (lavadoId) => {
      modal.value = await modalComponent.value.getModal(lavadoId);
      //modal.value.show();
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
      deleteModal
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
