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

// import { useLavado } from '../services/useLavado';

export default {
  setup() {
    let autosLavados = ref([]);
    // let tipoLavado = ref([]);

    let cajaAbierta = ref({});

    // tipoLavado = lavadoService.getTipoLavado();

    onMounted(async () => {
      cajaAbierta = cajaService.getCajaAbierta();
      autosLavados.value = await lavadoService.getLavadosByCaja(
        cajaAbierta.value.id
      );
      // console.log(tipoLavado);
    });

    return {
      autosLavados,
      cajaAbierta,
      // tipoLavado,
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
