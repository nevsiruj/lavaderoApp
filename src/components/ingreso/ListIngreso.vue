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
      Lista de Ingresos
      </h1>
      <div class="overflow-x-auto">
        <table class="min-w-full text-left text-sm font-light">
          <thead
            class="text-xs text-gray-700 uppercase bg-[#96ffdf] dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              
              <th scope="col" class="px-6 py-4">Descripcion</th>              
              <th scope="col" class="px-6 py-4">Importe</th>
              <th scope="col" class="px-6 py-4">Accion</th>
              
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="ingreso in ingresos" :key="ingreso.id"
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              
              <td class="whitespace-nowrap px-6 py-4">
                {{ ingreso.descripcion }}
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                {{ Number(ingreso.importe) }}
              </td>
              <td class="whitespace-nowrap px-6 py-4">
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
    <div class="flex flex-col justify-start md:flex-row md:justify-center  lg:flex-row lg:justify-center lg:gap-8 md:gap-8">
  <div><p class="text-sm lg:p-2">
        Num. de transacciones: {{ ingresos.length }}
      </p></div>
  <div><p class="text-sm lg:p-2">Total facturado:</p></div>
  
</div>

    <Modal message="ingreso" @confirm="deleteIngreso" ref="modalComponent" />
  </div>

   <!--<div class="viewport">
    <div class="card p-4 m-auto shadow-md overflow-hidden w-fit md:self-center">
      <div class="mb-3">
        <router-link
          class="mt-2 text-emerald-300 hover:text-emerald-600"
          to="/caja"
        >
          &lt;Volver atrás
        </router-link>
      </div>
      <h1 class="font-bold">Lista de Ingresos</h1>
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
      <div class="w-full my-2 flex gap-2 justify-center">
        <p class="text-sm p-1 rounded-md">
          Num. de transacciones: {{ ingresos.length }}
        </p>
        <p class="text-sm p-1 rounded-md">Total facturado:</p>
      </div>
    </div>
  </div>
  <Modal message="ingreso" @confirm="deleteIngreso" ref="modalComponent" />-->
</template>

<script>
import cajaService from "../../composables/api/cajaService.js";
import ingresoService from "../../composables/api/ingresoService.js";

import { reactive, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Modal from "../modalConfirmar/ModalConfirmar.vue";

export default {
  components: {
    Modal,
  },
  setup() {
    let cajaAbierta = ref({});
    const router = useRouter();
    const route = useRoute();
    const showMessage = ref(false);
    // cajaAbierta = cajaService.getCajaAbierta();
    let ingresos = ref([]);
    const modalComponent = ref(null);
    const modal = ref();

    onMounted(async () => {
      fetchIngresos();
    });
    const editIngreso = (ingreso) => {
      router.push({
        path: "/formingreso",
        query: { isAdmin: false, id: ingreso.id },
      });
    };
    const fetchIngresos = async () => {
      try {
        cajaAbierta.value = await cajaService.getCajaAbierta();
        ingresos.value = await ingresoService.getIngresosByCaja(
          cajaAbierta.value.id
        );
        console.log(ingresos);
      } catch (error) {
        console.error(error);
      }
    };

    const deleteIngreso = async (ingresoId) => {
      try {
        await ingresoService.deleteIngreso(ingresoId);
        fetchIngresos();
        modal.value.hide();
        // Realiza alguna lógica adicional si es necesario
      } catch (error) {
        console.error(error);
      }
    };
    const openModal = async (ingresoId) => {
      modal.value = await modalComponent.value.getModal(ingresoId);
      //modal.value.show()
    };

    return {
      cajaAbierta,
      ingresos,
      editIngreso,
      deleteIngreso,
      modalComponent,
      modal,
      openModal,
      showMessage,
    };
  },
  name: "Ingreso",
  props: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
