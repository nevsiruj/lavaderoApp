<template>
  <div class="viewport">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-6">
        <router-link :to="'/caja'" class="text-base text-emerald-300 font-bold hover:text-emerald-600">&lt; Volver atrás</router-link>
      </div>
      <h2 class="text-2xl font-bold mb-6 text-black">Cerrar caja</h2>

      <div class="mb-6 flex flex-col items-center">
  <label for="monto" class="text-gray-700 text-base font-bold mb-2">Declarar Efectivo:</label>
  <div class="w-1/4">
    <input
      type="number"
      class="w-full border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:border-emerald-500"
      id="efectivoDeclarado"
      v-model="formData.efectivoDeclarado"
      required
    />
  </div>
</div>
      <button @click="CerrarCaja" type="submit"
        class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded">
        Cerrar caja
      </button>
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
