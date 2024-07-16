<template>
  <div class="grid grid-flow-row gap-4">
    <div
      class="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Ingresos
      </h5>

      <form class="max-w-sm mx-auto">
        <div class="mb-5">
          <div class="form-group">
            <label for="descripcion">Descripción</label>
            <input
              type="text"
              class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="descripcion"
              v-model="form.descripcion"
              required
            />
          </div>
          <div class="form-group">
            <label for="importe">Importe</label>
            <input
              type="number"
              class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="importe"
              min="1"
              v-model="form.importe"
              required
            />
          </div>
          <div v-if="isNegativeImport">
            <p class="text-red-600">No ingresar valores negativos</p>
          </div>
          <div class="form-group" v-if="isAdmin">
            <label for="importe">Fecha</label>
            <input
              type="date"
              class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="importe"
              min="1"
              v-model="form.fechaRegistro"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          @click.prevent="submitForm"
          class="text-black bg-green-300 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Guardar
        </button>

        <router-link
          :to="isAdmin ? '/Ingresos' : '/caja'"
          class="ml-5 font-medium text-green-500 dark:text-blue-500 hover:underline"
          >Cancelar</router-link
        >
      </form>
    </div>
  </div>
<!--
  <div class="viewport">
    <div class="card p-4 mx-2 shadow-md overflow-hidden w-fit self-center">
      <div>
        <router-link
          :to="isAdmin ? '/Ingresos' : '/caja'"
          class="text-emerald-300 hover:text-emerald-600"
          >&lt; Volver atrás</router-link
        >
      </div>
      <h1 class="font-bold mb-2">Ingresos</h1>
      <form>
        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <input
            type="text"
            class="form-control form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
            id="descripcion"
            v-model="form.descripcion"
            required
          />
        </div>
        <div class="form-group">
          <label for="importe">Importe</label>
          <input
            type="number"
            class="form-control form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
            id="importe"
            min="1"
            v-model="form.importe"
            required
          />
        </div>
        <div v-if="isNegativeImport">
          <p class="text-red-600">No ingresar valores negativos</p>
        </div>
        <div class="form-group" v-if="isAdmin">
          <label for="importe">Fecha</label>
          <input
            type="date"
            class="form-control form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
            id="importe"
            v-model="form.fechaRegistro"
            required
          />
        </div>
        <button
          type="submit"
          class="mt-3 bg-emerald-300 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded"
          @click.prevent="submitForm"
        >
          Guardar
        </button>
      </form>
    </div>
  </div>-->
</template>
<script>
// import cajaService from '../services/caja.service.js';
import cajaService from "../../composables/api/cajaService.js";
import ingresoService from "../../composables/api/ingresoService.js";
import { reactive, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const isAdmin = ref(false);
    let cajaAbierta = ref({});
    let isNegativeImport = ref(false);

    cajaAbierta = cajaService.getCajaAbierta();

    let form = ref({
      id: 0,
      descripcion: "",
      importe: null,
      cajaId: 0,
      fechaRegistro: null,
    });

    const submitForm = async () => {
      form.value.cajaId = cajaAbierta.value.id;
      if (form.value.importe < 1) {
        isNegativeImport.value = true;
        return;
      }
      if (form.value.fechaRegistro != "") {
        const fecha = new Date(form.value.fechaRegistro);
        const fechaFormateada = fecha.toISOString();
        form.value.fechaRegistro = fechaFormateada;
      }
      if (form.value.id == 0) {
        await ingresoService.addIngreso(form);
      } else {
        await ingresoService.editIngreso(form.value);
      }
      form.value = {};
      form.descripcion = "";
      form.importe = "";
      form.fechaRegistro = "";
      if (isAdmin.value) {
        router.push("/ingresos");
        return;
      }
      router.push("/caja");
    };

    onMounted(async () => {
      cajaAbierta.value = await cajaService.getCajaAbierta();
      const query = router.currentRoute.value.query;
      if (query.isAdmin === "true") {
        isAdmin.value = true;
      }
      if (query.id != null) {
        console.log(query);
        form.value.id = query.id;
        form.value = await ingresoService.getIngresoById(query.id);
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
  name: "IngresoForm",
  props: {},
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
