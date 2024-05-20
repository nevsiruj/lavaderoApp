<template>
  <div class="viewport">
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
  </div>
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
        modal.value.hide();

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
