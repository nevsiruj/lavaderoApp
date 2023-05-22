<template>
  <div class="flex flex-col items-center">
    <h3 class="mt-3 text-2xl font-bold">Bienvenido</h3>
  </div>

  <div class="container mx-auto">
    <div class="card shadow-lg">
      <div class="card-header bg-blue-500 py-2">
        <h5 class="text-white text-lg font-semibold">
          {{ new Date().toLocaleDateString() }}
        </h5>
      </div>
      <div class="card-body p-4">
        <div v-if="cajaAbierta.isOpen">
          <p class="card-text">
            <strong>Responsable:</strong> {{ cajaAbierta.responsable }}
          </p>
          <label class="card-text">
            <strong>Inicial: </strong>: ${{
              cajaAbierta.montoInicial ?? '0.00'
            }}
          </label>
          <br />
          <router-link class="btn btn-sm btn-danger mt-2" to="/cerrarcaja">
            <i class="fa fa-times-circle mr-1"></i> Cerrar caja
          </router-link>
          <br />
          <label class="card-text">
            <strong>Cantidad Lavados:</strong>
            {{ cajaAbierta.cantidadLavados ?? 0 }}
            <br />
            <strong>Importe Lavados:</strong>
            $ {{ cajaAbierta.totalImporteLavados ?? 0 }}
          </label>
          <br />

          <router-link class="btn btn-sm btn-success mt-2 m-2" to="/formlavado">
            <i class="fas fa-plus-circle mr-1"></i> Agregar lavado
          </router-link>
          <router-link
            class="btn btn-sm btn-outline-success mt-2 m-2"
            to="/ListLavadosCaja"
          >
            <i class="fas fa-list-ul mr-1"></i> Listado de lavados
          </router-link>
          <br />
          <label class="card-text">
            <strong>Ingresos:</strong> ${{
              cajaAbierta.totalImporteIngresos ?? '0.00'
            }}
          </label>
          <br />
          <router-link
            class="btn btn-sm btn-success mt-2 m-2"
            to="/formingreso"
          >
            <i class="fas fa-plus-circle mr-1"></i> Agregar ingreso
          </router-link>
          <router-link
            class="btn btn-sm btn-outline-success mt-2 m-2"
            to="/listingreso"
          >
            <i class="fas fa-list-ul mr-1"></i> Listado de ingresos
          </router-link>
          <br />
          <label class="card-text">
            <strong>Egresos: </strong> ${{
              cajaAbierta.totalImporteEgresos ?? '0.00'
            }}
          </label>
          <br />
          <router-link class="btn btn-sm btn-success mt-2 m-2" to="/formegreso">
            <i class="fas fa-plus-circle mr-1"></i> Agregar egreso
          </router-link>
          <router-link
            class="btn btn-sm btn-outline-success mt-2 m-2"
            to="/listegreso"
          >
            <i class="fas fa-list-ul mr-1"></i> Listado de egresos
          </router-link>
          <br />
          <label class="card-text">
            Efectivo en caja:
            <strong>${{ cajaAbierta.efectivoEnCaja ?? '0.00' }}</strong>
          </label>
        </div>
        <div class="flex flex-col items-center mt-4" v-if="!cajaAbierta.isOpen">
          <span class="text-red-500 font-bold">No hay cajas abiertas</span>
          <router-link class="text-blue-500 mt-2" to="/abrircaja"
            >Abrir caja</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import cajaService from '../services/caja.service.js';
import cajaService from '../../composables/api/cajaService.js';
import { reactive, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    let cajaAbierta = ref({});
    const router = useRouter();
    const route = useRoute();
    cajaAbierta = cajaService.getCajaAbierta();

    onMounted(() => {
      cajaAbierta = cajaService.getCajaAbierta();
      cajaService.getCajas();
    });

    return {
      cajaAbierta,
    };
  },
  name: 'Caja',
  props: {},
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
