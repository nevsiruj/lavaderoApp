<template>
  <div class="row">
    <h3 class="mt-3">Bienvenido</h3>
  </div>

  <div class="container">
    <div class="card">
      <div class="card-header">
        <h5>
          {{ new Date().toLocaleDateString() }}
        </h5>
      </div>
      <div class="card-body">
        <div v-if="cajaAbierta.isOpen">
          <p class="card-text">Responsable: {{ cajaAbierta.responsable }}</p>
          <label class="card-text"
            >Dinero en la caja: {{ cajaAbierta.monto }}</label
          >
          <button class="btn btn-sm btn-danger ms-2" @click="cerrarCaja">
            <i class="fa fa-times-circle" style="font-size: 1rem"></i>
          </button>
          <br />
          <br />
          <label class="card-text">
            Cantidad Lavados: {{ cajaAbierta.cantidadLavados }}
          </label>
          <router-link class="btn btn-sm btn-success ms-2" to="/formlavado"
            ><i class="fas fa-plus-circle" style="font-size: 1rem"></i>
          </router-link>
          <router-link
            class="btn btn-sm btn-outline-success ms-2"
            to="/listlavado"
          >
            <i class="fas fa-list-ul" style="font-size: 1rem"></i>
          </router-link>
        </div>
        <div class="row" v-if="!cajaAbierta.isOpen">
          <span class="text-danger"> No hay cajas abiertas </span>
          <router-link to="/abrircaja">Abrir caja</router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- <button class="btn btn-outline-dark mt-2" to="/abrircaja">Abrir caja</button> -->
</template>

<script>
// import cajaService from '../services/caja.service.js';
import cajaService from '../../composables/api/cajaService.js';
import { reactive, onMounted, ref } from 'vue';

export default {
  setup() {
    let cajaAbierta = ref({});

    cajaAbierta = cajaService.getCajaAbierta();

    const cerrarCaja = () => {
      cajaService.cerrarCaja();
      cajaAbierta.value = {};
      console.log('Caja cerrada', cajaAbierta.value);
    };

    onMounted(() => {
      cajaAbierta = cajaService.getCajaAbierta();
    });

    return {
      cajaAbierta,
      cerrarCaja,
    };
  },
  name: 'CajaHome',
  props: {},
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
