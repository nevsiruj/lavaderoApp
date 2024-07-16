<template>
<div class="grid grid-flow-row gap-4">
    <div
      class="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
      Cerrar caja
      </h5>

      <form class="max-w-sm mx-auto">
        <div class="mb-5">
          <div class="form-group">
            <label for="nomto">Declarar Efectivo:</label>
            <input
              type="number"
              class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="efectivoDeclarado"
              v-model="formData.efectivoDeclarado"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          @click="CerrarCaja"
          class="text-black bg-green-300 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
        Cerrar caja
        </button>

        <router-link
          :to="'/caja'"
          class="ml-5 font-medium text-green-500 dark:text-blue-500 hover:underline"
          >Cancelar</router-link
        >
      </form>
    </div>
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

    const navigateTo = (route) => {
      router.push(route);
    };


    const CerrarCaja = async () => {
      await cajaService
        .cerrarCaja(cajaAbierta.value.id, formData)
        .then((e) => console.log(e));
      // Reiniciamos los valores del formulario
      formData.efectivoDeclarado = '';
      setTimeout(function () {
        // location.reload();
      }, 1000);
      // router.push('/abrircaja');
      router.replace('/abrircaja');

    };

    onMounted(async () => {
      cajaAbierta.value = await cajaService.getCajaAbierta();
    });

    return {
      formData,
      CerrarCaja,
      cajaAbierta,
      navigateTo
    };
  },
};
</script>

<style>
/* Estilos de Bootstrap */
</style>
