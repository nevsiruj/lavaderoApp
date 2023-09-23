<template>
  <div class="container">
    <a href="/caja" @click="goBack">&lt; Volver atrás</a>
    <!-- <form @submit.prevent="CerrarCaja"> -->
      <h2>Cerrar caja</h2>

      <div class="mb-3">
        <label for="monto" class="form-label">Declarar Efectivo:</label>
        <input
          type="number"
          class="form-control"
          id="efectivoDeclarado"
          v-model="formData.efectivoDeclarado"
          required
        />
      </div>
      <button @click="CerrarCaja" type="submit" class="btn btn-primary
              mt-3
              bg-blue-500
              hover:bg-blue-600
              text-white
              font-bold
              py-2
              px-4
              rounded">Cerrar caja</button>
    <!-- </form> -->
  </div>
</template>

<script>
import { reactive, onMounted, ref } from 'vue';

import cajaService from '../../composables/api/cajaService.js';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'CerrarCaja',
  setup() {
    const router = useRouter();
    const route = useRoute();
    let cajaAbierta = ref({});

    const formData = reactive({
      efectivoDeclarado: 0,
    });

    const CerrarCaja = async () => {
      await cajaService
        .cerrarCaja(cajaAbierta.value.id, formData)
        .then((e) => console.log(e));
      // Reiniciamos los valores del formulario
      formData.efectivoDeclarado = '';
      setTimeout(function () {
        location.reload();
      }, 1000);
      router.push('/abrircaja');
    };

    onMounted(async() => {
      cajaAbierta.value = await cajaService.getCajaAbierta();
    });

    return {
      formData,
      CerrarCaja,
      cajaAbierta,
    };
  },
};
</script>

<style>
/* Estilos de Bootstrap */
</style>
