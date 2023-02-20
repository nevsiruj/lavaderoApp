<template>
  <div class="container">
    <h3 class="text-center">Fruta form</h3>
    <router-link to="/" class="text-right">Volver</router-link>
    <div class="card">
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input
              type="text"
              class="form-control"
              id="nombre"
              v-model="fruta.nombre"
            />
          </div>
          <div class="form-group">
            <label for="color">Color</label>
            <input
              type="text"
              class="form-control"
              id="color"
              v-model="fruta.color"
            />
          </div>
          <div class="form-group">
            <label for="fechaVencimiento">Fecha de Vencimiento</label>
            <input
              type="date"
              class="form-control"
              id="fechaVencimiento"
              v-model="fruta.fechaVencimiento"
            />
          </div>
        </form>
        <button type="button" class="btn btn-success mt-3" @click="submitForm">
          {{ modo === 'agregar' ? 'Agregar' : 'Editar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FrutaService from '../services/fruta.service.js';
const frutaService = new FrutaService();

export default {
  name: 'FrutaForm',
  props: {
    msg: String,
  },
  created() {
    this.getData();
  },
  data() {
    return {
      fruta: {},
      modo: 'agregar',
    };
  },
  methods: {
    submitForm() {
      console.log(this.fruta);
      frutaService.postFruta(this.fruta);
      this.$router.replace('/');
    },
    getData() {
      // frutaService.getFrutas().then((e) => (this.frutas = e));
    },
  },
};
</script>
