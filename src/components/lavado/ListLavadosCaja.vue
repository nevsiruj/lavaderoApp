<template>
  <div class="grid grid-rows-1 gap-3">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <router-link to="/caja">
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-white bg-[#3edfa9] border border-gray-200 rounded-lg hover:bg-[#ffe068]"
        >
          Volver atras
        </button>
      </router-link>
    </div>

    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <h1
        class="mb-4 text-2xl font-bold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-2xl dark:text-white text-center"
      >
        Facturas
      </h1>
      <div class="overflow-x-auto">
        <table class="min-w-full text-left text-sm font-light">
          <thead
            class="text-xs text-gray-700 uppercase bg-[#96ffdf] dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-4">Fecha</th>
              <th scope="col" class="px-6 py-4">Descripcion</th>
              <th scope="col" class="px-6 py-4">Metodo de pago</th>
              <th scope="col" class="px-6 py-4">Importe</th>
              <th scope="col" class="px-6 py-4">Accion</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="lavado in autosLavados"
              :key="lavado.id"
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td class="whitespace-nowrap px-6 py-4">
                {{ formatDate(lavado.fecha) }}
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                {{ lavado.descripcion }}
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                {{ lavado.metodoPago }}
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                {{ Number(lavado.importe) }}
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                <div class="flex space-x-2">
                  <button
                    class="text-blue-600 hover:text-blue-800 focus:outline-none"
                    @click="editLavado(lavado)"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    class="text-red-600 hover:text-red-800 focus:outline-none"
                    @click="openModal(lavado.id)"
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
    <div class="flex flex-col justify-start md:flex-row md:justify-center  lg:flex-row lg:justify-center lg:gap-8 md:gap-8">
  <div><p class="text-sm lg:p-2">
        Num. de transacciones: {{ autosLavados.length }}
      </p></div>
  <div><p class="text-sm lg:p-2">Total facturado:</p></div>
  
</div>

    <Modal message="lavado" @confirm="deleteLavado" ref="modalComponent" />
  </div>

  <!--<section class="bg-white dark:bg-gray-900">
    <div class="px-4 mx-auto max-w-screen-xl text-start">
      <router-link to="/caja">
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-white bg-[#3edfa9] border border-gray-200 rounded-lg hover:bg-[#ffe068]"
        >
          Volver atras
        </button>
      </router-link>
    </div>
    <div class="py-4 px-4 mx-auto max-w-screen-xl text-center">
      <h1
        class="mb-4 text-2xl font-bold tracking-tight leading-none text-gray-900 md:text-2xl lg:text-2xl dark:text-white"
      >
        Facturas
      </h1>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
        
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
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
              v-for="lavado in autosLavados"
              :key="lavado.id"
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <td class="whitespace-nowrap px-6 py-4">
                {{ formatDate(lavado.fecha) }}
              </td>
              <td class="whitespace-nowrap px-6 py-4">{{ lavado.descripcion }}</td>
              <td class="whitespace-nowrap px-6 py-4">{{ lavado.metodoPago }}</td>
              <td class="whitespace-nowrap px-6 py-4">{{ Number(lavado.importe) }}</td>
              <td class="whitespace-nowrap px-6 py-4">
                <div class="flex space-x-2">
                  <button
                    class="text-blue-600 hover:text-blue-800 focus:outline-none"
                    @click="editLavado(lavado)"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    class="text-red-600 hover:text-red-800 focus:outline-none"
                    @click="openModal(lavado.id)"
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
    <div
      class="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0"
    >
      <p class="text-sm p-2">
        Num. de transacciones: {{ autosLavados.length }}
      </p>
      <p class="text-sm p-2">|</p>
      <p class="text-sm p-2">Total facturado:</p>
    </div>
    <Modal message="lavado" @confirm="deleteLavado" ref="modalComponent" />
  </section>-->

  <!--<div class="">
      <Modal message="lavado" @confirm="deleteLavado" ref="modalComponent" />
      <div class="mx-auto rounded-lg py-3 px-2 shadow-md bg-white">
        <router-link
          class="mt-2 text-emerald-300 hover:text-emerald-600"
          to="/caja"
        >
          &lt;Volver atrás</router-link
        >
        <div class="mb-3"></div>
        <h1 class="font-bold text-center">Facturas</h1>
        <div class="card-body">
          <table
            class="table table-responsive table-hover table-striped table-sm"
          >
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Metodo de Pago</th>
                <th>Importe</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="lavado in autosLavados" :key="lavado.id">
                <td>
                  {{ formatDate(lavado.fecha) }}
                </td>
                <td>{{ lavado.descripcion }}</td>
                <td>{{ lavado.metodoPago }}</td>
                <td>{{ Number(lavado.importe) }}</td>
                <td class="px-2 py-1 whitespace-nowrap">
                  <div class="flex space-x-2">
                    <button
                      class="text-blue-600 hover:text-blue-800 focus:outline-none"
                      @click="editLavado(lavado)"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      class="text-red-600 hover:text-red-800 focus:outline-none"
                      @click="openModal(lavado.id)"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="w-full my-2 flex gap-2 justify-center">
          <p class="text-sm p-1 rounded-md">
            Num. de transacciones: {{ autosLavados.length }}
          </p>
          <p class="text-sm p-1 rounded-md">Total facturado:</p>
        </div>
      </div>
    </div>-->
</template>

<script>
import { ref, onMounted, reactive } from "vue";
// import { useLavados } from './composables/api';

// import lavadoService from '../services/lavado.service.js';
import lavadoService from "../../composables/api/lavadoService.js";
import cajaService from "../../composables/api/cajaService.js";
import { useRoute, useRouter } from "vue-router";
import Modal from "../modalConfirmar/ModalConfirmar.vue";
import { initFlowbite } from "flowbite";

// import { useLavado } from '../services/useLavado';

export default {
  components: {
    Modal,
  },
  setup() {
    let autosLavados = ref([]);
    let cajaAbierta = ref({});
    const showMessage = ref(false);
    const router = useRouter();
    const modalComponent = ref(null);
    const modal = ref();

    // tipoLavado = lavadoService.getTipoLavado();

    onMounted(async () => {
      cajaAbierta.value = await cajaService.getCajaAbierta();
      autosLavados.value = await lavadoService.getLavadosByCaja(
        cajaAbierta.value.id
      );
      // console.log(tipoLavado);
    });

    onMounted(() => {
      initFlowbite();
    });

    const editLavado = (lavado) => {
      router.push({
        path: "/formlavado",
        query: { isAdmin: false, id: lavado.id },
      });
    };

    const deleteLavado = async (lavadoId) => {
      try {
        await lavadoService.deleteLavado(lavadoId);
        autosLavados.value = await lavadoService.getLavadosByCaja(
          cajaAbierta.value.id
        );
        modal.value.hide();

        // Realiza alguna lógica adicional si es necesario
      } catch (error) {
        console.error(error);
      }
    };
    const openModal = async (lavadoId) => {
      modal.value = await modalComponent.value.getModal(lavadoId);
      //modal.value.show();
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

    return {
      autosLavados,
      cajaAbierta,
      router,
      modalComponent,
      modal,
      editLavado,
      deleteLavado,
      openModal,
      formatDate,
      showMessage,
    };
  },
  name: "LavadoList",
  props: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
