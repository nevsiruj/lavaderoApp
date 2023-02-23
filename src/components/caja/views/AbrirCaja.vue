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
          v-model.trim="formData.responsable"
          required
          pattern="^[a-zA-Z]+$"
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
import cajaService from '../services/caja.service.js';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'AbrirCaja',
  setup() {
    const router = useRouter();
    const route = useRoute();

    const formData = reactive({
      responsable: '',
      monto: '',
    });

    const responsables = reactive([]);

    const abrirCaja = async () => {
      // Aquí podrías enviar la información a una API o almacenarla en la base de datos
      console.log(
        'Abriendo caja con responsable',
        formData.responsable,
        'y monto',
        formData.monto
      );

      await cajaService.abrirCaja(formData).then((e) => console.log(e));
      // Reiniciamos los valores del formulario
      formData.responsable = '';
      formData.monto = null;
      router.push('/');
    };

    onMounted(() => {
      console.log(cajaService.getCajaAbierta());
      console.log(cajaService.getCajas());
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
