<template>
  <div class="viewport">
    <div class="card w-max m-auto p-4">
      <div class="mb-3">
        <router-link :to="'/servicios'" class="text-blue-500"
          >&lt; Volver atrás
        </router-link>
      </div>
      <h1 class="font-bold">Servicios</h1>
      <form>
        <div class="form-group">
          <label for="descripcion" class="text-black">Tipo de servicio</label>
          <input
            type="text"
            class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            id="descripcion"
            v-model="form.nombreServicio"
          />
        </div>
        <div class="form-group">
          <label for="importe" class="text-black">Costo</label>
          <input
            type="number"
            class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            id="importe"
            v-model="form.costo"
          />
        </div>
        <div v-if="isNegativeImport">
          <p class="text-red-600">No ingresar valores negativos</p>
        </div>
        <button
          type="submit"
          class="mt-3 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          @click.prevent="submitForm"
        >
          Guardar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup(props) {
    const router = useRouter();
    let isAdmin = ref(false);
    let tiposDeServicio = ref([]);
    let isNegativeImport = ref(false);

    let form = ref({
      id: 0,
      tipoDeServicio: "",
      costo: 0,
    });

    const submitForm = async () => {
      if (form.value.costo < 1) {
        isNegativeImport.value = true;
        return;
      }
      form.value = {};
      form.tipoDeServicio = "";
      form.costo = "";
      if (isAdmin.value) {
        router.push("/servicios");
        return;
      }
    };
    onMounted(async () => {
      /* const query = router.currentRoute.value.query;
      if (query.isAdmin === 'true') {
        isAdmin.value = true;
      } */
    });

    return {
      isNegativeImport,
      form,
      tiposDeServicio,
      submitForm,
      isAdmin,
    };
  },
};
</script>
