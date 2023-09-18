<template>
  <div class="container mt-3">
    <div class="mb-3">
      <router-link :to="isAdmin ? '/egresos' : '/caja'" class="text-blue-500">&lt; Volver atrás</router-link>
    </div>
    <h1>Egresos</h1>
    <form>
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <input type="text" class="form-control" id="descripcion" v-model="form.descripcion" required />
      </div>
      <div class="form-group">
        <label for="importe">Importe</label>
        <input type="number" class="form-control" id="importe" v-model="form.importe" required />
      </div>
      <div class="form-group" v-if="isAdmin">
        <label for="importe">Fecha</label>
        <input type="date" class="form-control" id="importe" v-model="form.fechaRegistro" required />
      </div>
      <div class="flex justify-center">
        <input class="form-check-input mr-2" type="checkbox" v-model="form.isGasto" id="flexCheckDefault" />
        <label class="form-check-label" for="flexCheckDefault">
          Es un Gasto
        </label>
      </div>
      <button type="submit" class="
              btn btn-primary
              mt-3
              bg-blue-500
              hover:bg-blue-600
              text-white
              font-bold
              py-2
              px-4
              rounded" @click.prevent="submitForm">
        Guardar
      </button>
    </form>
  </div>
</template>
<script>
// import cajaService from '../services/caja.service.js';
import cajaService from '../../composables/api/cajaService.js';
import egresoService from '../../composables/api/egresoService.js';

import { reactive, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    let cajaAbierta = ref({});
    const router = useRouter();
    const route = useRoute();
    let form = ref({
      id: 0,
      descripcion: '',
      importe: 0,
      cajaId: 0,
      fechaRegistro: '',
      isGasto: false,
    });
    let isAdmin = ref(false);
    const submitForm = async () => {
      form.value.cajaId = cajaAbierta.value.id;
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
      form.importe = '';
      form.fechaRegistro = '';
      if (isAdmin.value) {
        router.push('/egresos');
        return;
      }
      router.push('/');
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
    return {};
  },
  methods: {},
};
</script>
