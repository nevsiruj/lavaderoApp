<template>
  <div class="viewport">
    <Modal message="lavado" @confirm="deleteLavado" ref="modalComponent" />
    <div class="mx-auto rounded-lg py-3 px-2 shadow-md bg-white">
      <router-link class="mt-2" to="/caja"> &lt;Volver atrás</router-link>
      <div class="mb-3">
      </div>
      <h1 class="font-bold text-center">Facturas</h1>
      <div class="card-body">
        <table class="table table-responsive table-hover table-striped table-sm">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Importe</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lavado in autosLavados" :key="lavado.id">
              <td>
                {{ formatDate(lavado.fecha) }}
              </td>
              <td>{{ lavado.descripcion }}</td>
              <td>{{ Number(lavado.importe) }}</td>
              <td class="px-2 py-1 whitespace-nowrap">
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-800 focus:outline-none" @click="editLavado(lavado)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="text-red-600 hover:text-red-800 focus:outline-none" @click="openModal(lavado.id)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-full my-2 flex gap-2 justify-center">
        <p class="text-sm p-1 rounded-md">Num. de transacciones: {{ autosLavados.length }}</p>
        <p class="text-sm p-1 rounded-md">Total facturado:</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
// import { useLavados } from './composables/api';

// import lavadoService from '../services/lavado.service.js';
import lavadoService from '../../composables/api/lavadoService.js';
import cajaService from '../../composables/api/cajaService.js';
import { useRoute, useRouter } from 'vue-router';
import Modal from '../modalConfirmar/ModalConfirmar.vue';


// import { useLavado } from '../services/useLavado';

export default {
  components: {
    Modal,
  },
  setup() {
    let autosLavados = ref([]);
    let cajaAbierta = ref({});

    const router = useRouter();
    const modalComponent = ref(null);
    const modal = ref()

    // tipoLavado = lavadoService.getTipoLavado();

    onMounted(async () => {
      cajaAbierta.value = await cajaService.getCajaAbierta();
      autosLavados.value = await lavadoService.getLavadosByCaja(
        cajaAbierta.value.id
      );
      // console.log(tipoLavado);
    });
    const editLavado = (lavado) => {
      router.push({
        path: '/formlavado',
        query: { isAdmin: false, id: lavado.id },
      });
    };

    const deleteLavado = async (lavadoId) => {
      try {
        await lavadoService.deleteLavado(lavadoId);
        autosLavados.value = await lavadoService.getLavadosByCaja(
          cajaAbierta.value.id
        );
        modal.value.hide()

        // Realiza alguna lógica adicional si es necesario
      } catch (error) {
        console.error(error);
      }
    };
    const openModal = async (lavadoId) => {
      modal.value = await modalComponent.value.getModal(lavadoId);
      modal.value.show()
    }
    const formatDate = (date) => {
      const formattedDate = new Date(date).toLocaleString('es', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
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
      formatDate

    };
  },
  name: 'LavadoList',
  props: {},
  created() { },
  data() {
    return {};
  },
  methods: {},
};
</script>
