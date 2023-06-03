<template>
  <div>
    <div class="mb-3">
      <router-link to="/"> &lt;Volver atrás </router-link>
    </div>

    <div class="card m-4">
      <div class="card-header">Lavados</div>
      <div class="card-body">
        <table
          class="table table-responsive table-hover table-striped table-sm"
        >
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
                {{ lavado.fecha }}
              </td>
              <td>{{ lavado.descripcion }}</td>
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
                    @click="deleteLavado(lavado.id)"
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
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
// import { useLavados } from './composables/api';

// import lavadoService from '../services/lavado.service.js';
import lavadoService from '../../composables/api/lavadoService.js';
import cajaService from '../../composables/api/cajaService.js';
import { useRoute, useRouter } from 'vue-router';

// import { useLavado } from '../services/useLavado';

export default {
  setup() {
    let autosLavados = ref([]);
    // let tipoLavado = ref([]);
    const router = useRouter();
    let cajaAbierta = ref({});

    // tipoLavado = lavadoService.getTipoLavado();

    onMounted(async () => {
      cajaAbierta = cajaService.getCajaAbierta();
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
        // Realiza alguna lógica adicional si es necesario
      } catch (error) {
        console.error(error);
      }
    };

    return {
      autosLavados,
      cajaAbierta,
      editLavado,
      deleteLavado,
      router,
    };
  },
  name: 'LavadoList',
  props: {},
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
