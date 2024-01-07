<template>
  <div class="viewport">
    <Modal message="ingreso" @confirm="deleteIngreso" ref="modalComponent" />
    <div class="card p-4 m-auto shadow-md overflow-hidden w-fit md:self-center">
      <div class="mb-3">
        <router-link to="/caja"> &lt;Volver atrás </router-link>
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
                <button class="text-blue-600 hover:text-blue-800 focus:outline-none" @click="editIngreso(ingreso)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="text-red-600 hover:text-red-800 focus:outline-none" @click="openModal(ingreso.id)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="w-full my-2 flex gap-2 justify-center">
        <p class="text-sm p-1 rounded-md">Num. de transacciones: {{ ingresos.length }}</p>
        <p class="text-sm p-1 rounded-md">Total facturado:</p>
      </div>
    </div>
  </div>
</template>

<script>
import cajaService from '../../composables/api/cajaService.js';
import ingresoService from '../../composables/api/ingresoService.js';

import { reactive, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Modal from '../modalConfirmar/ModalConfirmar.vue';


export default {
  components: {
    Modal
  },
  setup() {
    let cajaAbierta = ref({});
    const router = useRouter();
    const route = useRoute();
    // cajaAbierta = cajaService.getCajaAbierta(); 
    let ingresos = ref([]);
    const modalComponent = ref(null)
    const modal = ref()

    onMounted(async () => {
      fetchIngresos();
    });
    const editIngreso = (ingreso) => {
      router.push({
        path: '/formingreso',
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
        modal.value.hide()

        fetchIngresos();
        // Realiza alguna lógica adicional si es necesario
      } catch (error) {
        console.error(error);
      }
    };
    const openModal = async (ingresoId) => {
      modal.value = await modalComponent.value.getModal(ingresoId);
      modal.value.show()
    }

    return {
      cajaAbierta,
      ingresos,
      editIngreso,
      deleteIngreso,
      modalComponent,
      modal,
      openModal

    };
  },
  name: 'Ingreso',
  props: {},
  created() { },
  data() {
    return {};
  },
  methods: {},
};
</script>
