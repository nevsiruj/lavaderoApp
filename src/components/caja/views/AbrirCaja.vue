<template>
  <div class="container">
    <form @submit.prevent="abrirCaja">
      <h2>Abrir caja</h2>
      <div class="mb-3">
        <label for="responsable" class="form-label">Responsable:</label>
        <input
          type="text"
          class="form-control"
          id="responsable"
          v-model="formData.responsable"
          required
        />
      </div>
      <div class="mb-3">
        <label for="monto" class="form-label">Monto de apertura:</label>
        <input
          type="number"
          class="form-control"
          id="monto"
          v-model="formData.monto"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Abrir caja</button>
    </form>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import { CajaService } from '../services/caja.service.js';

export default {
  setup() {
    const formData = reactive({
      responsable: '',
      monto: '',
    });

    const responsables = reactive([]);

    const abrirCaja = () => {
      // Aquí podrías enviar la información a una API o almacenarla en la base de datos
      console.log(
        'Abriendo caja con responsable',
        formData.responsable,
        'y monto',
        formData.monto
      );

      // Reiniciamos los valores del formulario
      formData.responsable = '';
      formData.monto = null;
    };

    onMounted(() => {
      // console.log(CajaService.getInstance().cajaAbierta);
    });

    return {
      formData,
      responsables,
      abrirCaja,
    };
  },
};
</script>

<style>
/* Estilos de Bootstrap */
</style>
