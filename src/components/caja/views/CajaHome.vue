<template>
  <div class="row">
    <h3 class="mt-3">Bienvenido</h3>
  </div>

  <div class="container">
    <div class="card">
      <div class="card-header">
        <!-- <h2>{{ new Date().toLocaDateString() }}</h2> -->
      </div>
      <div class="card-body">
        <p class="card-text">Descripción: {{ cajaAbierta.responsable }}</p>
        <p class="card-text">Dinero en la caja: {{ cajaAbierta.monto }}</p>
        <button class="btn btn-primary" @click="cerrarCaja">Cerrar</button>
      </div>
    </div>
  </div>

  <div class="row" v-if="!cajaAbierta.isOpen">
    <span class="text-danger"> No hay cajas abiertas </span>
    <router-link to="/abrircaja">Abrir caja</router-link>
  </div>

  <!-- <button class="btn btn-outline-dark mt-2" to="/abrircaja">Abrir caja</button> -->
</template>

<script>
import cajaService from '../services/caja.service.js';
import { reactive, onMounted } from 'vue';

export default {
  setup() {
    let cajaAbierta = cajaService.getCajaAbierta();

    const cerrarCaja = () => {};

    onMounted(() => {
      console.log(cajaAbierta);
    });

    return {
      cajaAbierta,
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
