<template>
  <div class="row">
    <h3 class="mt-3">Bienvenido</h3>
  </div>

  <div class="row">
    <span v-if="!cajaAbierta" class="text-danger"> No hay cajas abiertas </span>
  </div>

  <!-- <button class="btn btn-outline-dark mt-2" to="/abrircaja">Abrir caja</button> -->
  <router-link to="/abrircaja">Abrir caja</router-link>
</template>

<script>
export default {
  setup() {
    let cajaAbierta = null;
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
