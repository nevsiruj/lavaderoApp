<template>
  <div class="grid grid-flow-row gap-4">
    <div
      class="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Abrir caja
      </h5>

      <form class="max-w-sm mx-auto" @submit="abrirCaja">
        <div class="mb-5">
          <div class="form-group">
            <label for="descripcion">Responsable</label>
            <select
              class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="responsable"
              v-model="formData.responsable"
              required
            >
              <option disabled value="">Seleccione una opción</option>
              <option
                v-for="responsable in responsables"
                :key="responsable.id"
                :value="responsable.nombre"
              >
                {{ responsable.nombre }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="importe">Turno</label>
            <select
              class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="turno"
              v-model="formData.turno"
              required
            >
              <option disabled value="">Seleccione una opción</option>
              <option
                v-for="turno in turnos"
                :key="turno.id"
                :value="turno.value"
              >
                {{ turno.nombre }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="monto" class="form-label">Monto de apertura:</label>
            <input
              type="number"
              class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="monto"
              v-model="formData.montoInicial"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          class="text-black bg-green-300 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Abrir caja
        </button>
      </form>
    </div>
  </div>


  <!--<div class="viewport">
    <form class="w-10/12 m-auto" @submit.prevent="abrirCaja">
      <h2>Abrir caja</h2>
      <div class="mb-3">
        <label for="responsable" class="form-label">Responsable:</label>
        <select
          class="form-control"
          id="responsable"
          v-model="formData.responsable"
          required
        >
          <option disabled value="">Seleccione una opción</option>
          <option
            v-for="responsable in responsables"
            :key="responsable.id"
            :value="responsable.nombre"
          >
            {{ responsable.nombre }}
          </option>
        </select>
        <label for="turno" class="form-label">Turno:</label>
        <select
          class="form-control"
          id="turno"
          v-model="formData.turno"
          required
        >
          <option disabled value="">Seleccione una opción</option>
          <option v-for="turno in turnos" :key="turno.id" :value="turno.value">
            {{ turno.nombre }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="monto" class="form-label">Monto de apertura:</label>
        <input
          type="number"
          class="form-control"
          id="monto"
          v-model="formData.montoInicial"
          required
        />
      </div>
      <button
        type="submit"
        class="bg-emerald-300 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded"
      >
        Abrir caja
      </button>
    </form>
  </div>-->

  <!-- <div class="grid grid-flow-row gap-4">
    <div class="flex justify-center min-height-auto">
      <span
        
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 "
      >
      <h3 class="text-3x1 text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">Abrir caja</h3>
      

<form class="max-w-sm mx-auto">
  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div class="flex items-start mb-5">
    <div class="flex items-center h-5">
      <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
    </div>
    <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
  </div>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

    </span> 
    </div>
  </div> -->
</template>

<script>
import { reactive, onMounted } from "vue";
import cajaService from "../../composables/api/cajaService.js";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "AbrirCaja",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const formData = reactive({
      responsable: "",
      turno: "",
      montoInicial: "",
    });

    const responsables = reactive([
      { id: 1, nombre: "Responsable 1" },
      { id: 2, nombre: "Responsable 2" },
    ]);

    const turnos = reactive([
      { id: 1, nombre: "Turno 1", value: 1 },
      { id: 2, nombre: "Turno 2", value: 2 },
    ]);

    const abrirCaja = async () => {
      try {
        console.log(
          "Abriendo caja con responsable",
          formData.responsable,
          "en el turno",
          formData.turno,
          "y monto",
          formData.montoInicial
        );

        await cajaService
          .abrirCaja(formData)
          .then((e) => {
            // Reiniciamos los valores del formulario
            formData.responsable = "";
            formData.montoInicial = null;
            formData.turno = "";
            router.push("/caja");
          })
          .catch((error) => {
            console.error("Error al abrir la caja:", error);
            // Aquí puedes mostrar un mensaje de error en la UI si es necesario
          });
      } catch (error) {
        console.error("Error inesperado:", error);
      }
    };

    onMounted(() => {});

    return {
      formData,
      responsables,
      turnos,
      abrirCaja,
    };
  },
};
</script>

<style>
/* Estilos de Bootstrap */
</style>
