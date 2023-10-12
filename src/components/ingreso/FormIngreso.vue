<template>
  <div class="viewport">
    <div class="card p-4">
    <div>
      <router-link :to="isAdmin ? '/ingresos' : '/caja'" class="text-blue-500">&lt; Volver atrás</router-link>
    </div>
    <h1 class="font-bold mb-2">Ingresos</h1>
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
      <button type="submit" class="
              mt-3
              bg-blue-600
              hover:bg-blue-500
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
// import cajaService from '../services/caja.service.js';
import cajaService from '../../composables/api/cajaService.js';
import ingresoService from '../../composables/api/ingresoService.js';
import { reactive, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    let cajaAbierta = ref({});
    const router = useRouter();
    const route = useRoute();
    cajaAbierta = cajaService.getCajaAbierta();
    const isAdmin = ref(false);

    let form = ref({
      id: 0,
      descripcion: '',
      importe: 0,
      cajaId: 0,
      fechaRegistro: '',
    });
    const submitForm = async () => {
      form.value.cajaId = cajaAbierta.value.id;
      if (form.value.fechaRegistro != '') {
        const fecha = new Date(form.value.fechaRegistro)
        const fechaFormateada = fecha.toISOString();
        form.value.fechaRegistro = fechaFormateada
      }
      if (form.value.id == 0) {
        await ingresoService.addIngreso(form);

      } else {
        await ingresoService.editIngreso(form.value);
      }
      form.value = {};
      form.descripcion = '';
      form.importe = '';
      form.fechaRegistro = '';
      if (isAdmin.value) {
        router.push('/ingresos');
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
        form.value = await ingresoService.getIngresoById(query.id);
      }
    });

    return {
      cajaAbierta,
      form,
      submitForm,
      isAdmin,
    };
  },
  name: 'IngresoForm',
  props: {},
  components: {},
  created() { },
  data() {
    return {};
  },
  methods: {},
};
</script>
