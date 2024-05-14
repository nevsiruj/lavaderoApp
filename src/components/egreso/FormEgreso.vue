<template>
  <div class="viewport">
    <div class="card p-4 mx-2 shadow-md overflow-hidden w-fit self-center">
      <div class="mb-3">
        <router-link :to="isAdmin ? '/egresos' : '/caja'" class="text-emerald-300">&lt; Volver atrás</router-link>
      </div>
      <h1 class="font-bold">Egresos</h1>
      <form @submit="submitForm">
        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <input type="text" class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200" id="descripcion" v-model="form.descripcion" required />
        </div>
        <div class="form-group">
          <label for="importe">Importe</label>
          <input type="number" class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200" id="importe" min="1" v-model="form.importe" required />
        </div>
        <div v-if="isNegativeImport">
          <p class='text-red-600'>No ingresar valores negativos</p>
        </div>
        <div class="form-group" v-if="isAdmin">
          <label for="importe">Fecha</label>
          <input type="date" class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200" id="importe" v-model="form.fechaRegistro" required />
        </div>
        <div class="flex justify-center">
          <input class="form-check-input mr-2" type="checkbox" v-model="form.isGasto" id="flexCheckDefault" />
          <label class="form-check-label" for="flexCheckDefault">
            Es un Gasto
          </label>
        </div>
        <button type="submit" class="
              mt-3
              bg-emerald-300
              hover:bg-emerald-500
              text-white
              font-bold
              py-2
              px-4
              rounded" @click.prevent="submitForm">
          Guardar
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import cajaService from '../../composables/api/cajaService.js';
import egresoService from '../../composables/api/egresoService.js';

import { reactive, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    let isAdmin = ref(false);
    let cajaAbierta = ref({});
    let isNegativeImport = ref(false)

    let form = ref({
      id: 0,
      descripcion: '',
      importe: null,
      cajaId: 0,
      fechaRegistro: null,
      isGasto: false,
    });

    const submitForm = async () => {
      form.value.cajaId = cajaAbierta.value.id;
      if (form.value.importe < 1) {
        isNegativeImport.value = true
        return
      }
      if (form.value.fechaRegistro != '') {
        const fecha = new Date(form.value.fechaRegistro)
        const fechaFormateada = fecha.toISOString();
        form.value.fechaRegistro = fechaFormateada
      } 
      if (form.value.id == 0) {
        await egresoService.addEgreso(form);
      } else {
        await egresoService.editEgreso(form.value);
      }
      form.value = {};
      form.descripcion = '';
      form.importe = null;
      form.fechaRegistro = '';

      if (isAdmin.value) {
        router.push('/egresos');
        return;
      }
      router.push('/caja');
    };

    onMounted(async () => {
      cajaAbierta.value = await cajaService.getCajaAbierta();
      const query = router.currentRoute.value.query;
      if (query.isAdmin === 'true') {
        isAdmin.value = true;
      }
      if (query.id != null) {
        console.log(query);
        form.value.id = query.id;
        form.value = await egresoService.getEgresoById(query.id);
      }
    });

    return {
      isNegativeImport,
      cajaAbierta,
      form,
      submitForm,
      isAdmin,
    };
  },
  name: 'EgresoForm',
  props: {},
  components: {},
  created() { },
  data() {
    return {
    };
  },
  methods: {},
};
</script>
