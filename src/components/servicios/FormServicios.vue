<template>
  <div class="grid grid-flow-row gap-4">
    <div class="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Servicios
      </h5>

      <form class="max-w-sm mx-auto">
        <div class="mb-5">
          <div class="form-group">
            <label for="nombre" class="text-black">Nombre</label>
            <input type="text"
              class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="nombre" v-model="form.nombre" />
          </div>
          <div class="form-group">
            <label for="descripcion">Descripción</label>
            <input type="text"
              class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="descripcion" v-model="form.descripcion" required />
          </div>
          <div class="form-group">
            <label for="Precio" class="text-black">Precio</label>
            <input type="number"
              class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="importe" v-model="form.precio" />
          </div>
          <div v-if="isNegativeImport">
            <p class="text-red-600">No ingresar valores negativos</p>
          </div>
          <div class="form-group">
            <label for="tipoServicio" class="text-black">Tipo Servicio</label>
            <select
              class="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="tipoServicio" v-model="form.tipoServicioId">
              <option value="" disabled>Selecciona un tipo de servicio</option>
              <option v-for="tipoServicio in tiposDeServicio" :value="tipoServicio.id" :key="tipoServicio.id">
                {{ tipoServicio.nombre }}
              </option>
            </select>
          </div>
          <div v-if="tipoServicioError">
            <p class="text-red-600">Por favor, selecciona un tipo de servicio.</p>
          </div>
        </div>
        <button type="submit" @click.prevent="submitForm"
          class="text-black bg-green-300 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Guardar
        </button>

        <router-link :to="'/servicios'"
          class="ml-5 font-medium text-green-500 dark:text-blue-500 hover:underline">Cancelar</router-link>
      </form>
    </div>
  </div>

  <!--  <div class="viewport">
    <div class="card w-max m-auto p-4">
      <div class="mb-3">
        <router-link :to="'/servicios'" class="text-emerald-300 hover:text-emerald-600">&lt; Volver atrás
        </router-link>
      </div>
      <h1 class="font-bold">Servicios</h1>
      <form>
        <div class="form-group">
          <label for="nombre" class="text-black">Nombre</label>
          <input type="text"
            class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
            id="descripcion" v-model="form.nombre" />
        </div>
        <div class="form-group">
          <label for="descripcion" class="text-black">Descripción</label>
          <input type="text"
            class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
            id="importe" v-model="form.descripcion" />
        </div>
        <div class="form-group">
          <label for="Precio" class="text-black">Precio</label>
          <input type="number"
            class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
            id="importe" v-model="form.precio" />
        </div>
        <div class="form-group">
          <label for="tipoServicio" class="text-black">Tipo Servicio</label>
          <select
            class="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
            id="tipoServicio" v-model="tipoServicioSeleccionado">
            <option value="" disabled>Selecciona un tipo de servicio</option>
            <option v-for="tipoServicio in tiposDeServicio" :value="tipoServicio" :key="tipoServicio.id">
              {{ tipoServicio.nombre }}
            </option>
          </select>
        </div>

        <div v-if="isNegativeImport">
          <p class="text-red-600">No ingresar valores negativos</p>
        </div>
        <button type="submit" class="mt-3 bg-emerald-300 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded"
          @click.prevent="submitForm">
          Guardar
        </button>
      </form>
    </div>
  </div>-->

</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import tipoServicioService from "../../composables/api/tipoServicioService";
import servicioService from "../../composables/api/servicioService.js";

export default {
  setup(props) {
    const router = useRouter();
    let isAdmin = ref(false);
    let tiposDeServicio = ref([]);
    let isNegativeImport = ref(false);
    let tipoServicioSeleccionado = ref({});
    let tipoServicioError = ref(false);

    let form = ref({
      id: 0,
      nombre: "",
      tipoServicioId: 0,
      precio: 0,
      descripcion: "",
      tipoServicioId: "",
    });

    const obtenerTiposDeServicio = async () => {
      try {
        const response = await tipoServicioService.getAllTipoServicio();

        tiposDeServicio.value = response;
      } catch (error) {
        console.error("Error al obtener los tipos de servicio:", error);
      }
    };

    const agregarServicio = async () => {
      console.log(form.value);
      const Servicio = {
        id: form.value.id,
        nombre: form.value.nombre,
        precio: form.value.precio,
        descripcion: form.value.descripcion,
        tipoServicioId: tipoServicioSeleccionado.value.id,
      };

      try {
        console.log(Servicio);
        await servicioService.addServicio(form.value);
        router.push("/Servicios");
      } catch (error) {
        console.error(error);
      }
    };

    const editarServicio = async () => {
      console.log(form.value);
      // form.value.tipoServicioId = tipoServicioSeleccionado.value.id;
      // const tipoServicio = {
      //   id: form.value.id,
      //   descripcion: form.value.descripcion,
      //   nombre: form.value.nombre,
      //   tenantId: form.value.tenantId
      // };

      try {
        await servicioService.editServicio(form.value.id, form.value);
        router.push("/Servicios");
      } catch (error) {
        console.error(error);
      }
    };

    const submitForm = async () => {
      if (form.value.nombre.trim() === "") {
        // Mostrar mensaje de error para nombre vacío
        return;
      }

      if (!form.value.tipoServicioId) {
        tipoServicioError.value = true;
        return;
      } else {
        tipoServicioError.value = false;
      }


      if (form.value.id == 0 || !form.value.id) {
        await agregarServicio();
      } else {
        await editarServicio();
      }

      form.value = {};
      form.defineComponent = "";
      form.nombre = "";
      form.descripcion = "";
      form.precio = "";

      if (isAdmin.value) {
        router.push("/Servicios");
        return;
      }
    };

    // const submitForm = async () => {
    //   if (form.value.precio < 1) {
    //     isNegativeImport.value = true;
    //     return;
    //   }
    //   form.value = {};
    //   form.tipoDeServicio = "";
    //   form.precio = "";
    //   form.descripcion = "";
    //   if (isAdmin.value) {
    //     router.push("/servicios");
    //     return;
    //   }
    // };

    onMounted(async () => {
      obtenerTiposDeServicio();
      /* const query = router.currentRoute.value.query;
      if (query.isAdmin === 'true') {
        isAdmin.value = true;
      } */
      const query = router.currentRoute.value.query;
      if (query.isAdmin === "true") {
        isAdmin.value = true;
      }
      if (query.id != null) {
        console.log(query);
        form.value.id = query.id;
        form.value = await servicioService.getById(query.id);
        tipoServicioSeleccionado.value = tiposDeServicio.value.find(
          (tipo) => tipo.id === form.value.tipoServicioId
        );
      }
    });

    return {
      isNegativeImport,
      form,
      tiposDeServicio,
      submitForm,
      isAdmin,
      agregarServicio,
      editarServicio,
      obtenerTiposDeServicio,
      tipoServicioSeleccionado,
      tipoServicioError
    };
  },
};
</script>
