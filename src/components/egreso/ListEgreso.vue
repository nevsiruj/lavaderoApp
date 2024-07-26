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
      Lista de Egresos
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
              v-for="egreso in egresos" :key="egreso.id"
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              
              <td class="whitespace-nowrap px-6 py-4">
                {{ egreso.descripcion }}
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                {{ Number(egreso.importe) }}
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                <div class="flex space-x-2">
                  <button
                    class="text-blue-600 hover:text-blue-800 focus:outline-none"
                    @click="editEgreso(egreso)"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    class="text-red-600 hover:text-red-800 focus:outline-none"
                     @click="deleteModal(egreso.id)"
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
        Num. de transacciones: {{ egresos.length }}
      </p></div>
  <div><p class="text-sm lg:p-2">Total facturado:</p></div>
  
</div>

    <Modal message="egreso" @confirm="deleteEgreso" ref="modalComponent" />
  </div>
  <!--<div class="viewport">
    <Modal message="egreso" @confirm="deleteEgreso" ref="modalComponent" />

    <div class="w-fit mx-auto rounded-lg p-4 px-2 shadow-md bg-white">
      <div class="mb-3">
        <router-link class="mt-2 text-emerald-300 hover:text-emerald-600" to="/caja"> &lt;Volver atrás </router-link>
      </div>
      <h1>Egresos</h1>
      <table class="table">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Importe</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="egreso in egresos" :key="egreso.id">
            <td>{{ egreso.descripcion }}</td>
            <td>{{ egreso.importe }}</td>
            <td class="px-2 py-1 whitespace-nowrap">
              <div class="flex space-x-2">
                <button
                  class="text-blue-600 hover:text-blue-800 focus:outline-none"
                  @click="editEgreso(egreso)"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  class="text-red-600 hover:text-red-800 focus:outline-none"
                  @click="deleteModal(egreso.id)"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="w-full my-2 flex gap-2 justify-center">
        <p class="text-sm p-1 rounded-md">Num. de egresos: {{ egresos.length }}</p>
        <p class="text-sm p-1 rounded-md">Total egresos: </p>
      </div>
    </div>
  </div>-->
</template>

<script>
// import cajaService from '../services/caja.service.js';
import cajaService from "../../composables/api/cajaService.js";
import egresoService from "../../composables/api/egresoService.js";

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
    let egresos = ref([]);
    const modalComponent = ref(null);
    const modal = ref();

    // let totalEgresos = ref(null)

    // const sumarEgresos = (egreso) =>{
    //   totalEgresos.value += egreso.importe
    // }

    onMounted(async () => {
      console.log(egresos);
      // cajaAbierta = cajaService.getCajaAbierta();
      // egresos.value = await egresoService.getEgresosByCaja(
      //   cajaAbierta.value.id
      // );
      // console.log(egresos);
      fetchEgresos();
    });
    const editEgreso = (egreso) => {
      router.push({
        path: "/formegreso",
        query: { isAdmin: false, id: egreso.id },
      });
    };
    const fetchEgresos = async () => {
      try {
        cajaAbierta.value = await cajaService.getCajaAbierta();
        egresos.value = await egresoService.getEgresosByCaja(
          cajaAbierta.value.id
        );
        console.log(egresos);
      } catch (error) {
        console.error(error);
      }
    };

    const deleteEgreso = async (egresoId) => {
      try {
        await egresoService.deleteEgreso(egresoId);
        fetchEgresos();
        modal.value.hide();
        // Realiza alguna lógica adicional si es necesario
      } catch (error) {
        console.error(error);
      }
    };
    
    const deleteModal = async (egresoId) => {
      modal.value = await modalComponent.value.getModal(egresoId);
      //modal.value.show();
    };

    return {
      cajaAbierta,
      egresos,
      modalComponent,
      modal,
      // sumarEgresos,
      editEgreso,
      deleteEgreso,
      fetchEgresos,
      deleteModal,
      showMessage
    };
  },
  name: "Egreso",
  props: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
