<template>
  <div class="grid grid-flow-row gap-4">
    <div class="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Factura
      </h5>

      <form class="max-w-sm mx-auto">
        <div class="mb-5">
          <div class="form-group">
            <label for="descripcion">Descripción</label>
            <input type="text"
              class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="descripcion" v-model="form.descripcion" required />
          </div>
          <div class="form-group">
            <label for="tipo-vehiculo" class="text-black">Servicio</label>
            <select
              class="form-select form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="tipo-vehiculo" v-model="form.tipoVehiculoId">
              <option value="">Seleccionar servicio</option>
              <option v-for="tipoVehiculo in tiposVehiculos" :key="tipoVehiculo.id" :value="tipoVehiculo.id">
                {{ tipoVehiculo.nombre }}
              </option>
            </select>
          </div>
          <!-- <div class="form-group">
            <label for="tipo-lavado" class="text-black">Tipo de servicio</label>
            <select
              class="form-control form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="tipo-lavado" v-model="form.tipoLavadoId">
              <option value="">Seleccionar tipo de servicio</option>
              <option v-for="tipoLavado in tiposLavados" :key="tipoLavado.id" :value="tipoLavado.id">
                {{ tipoLavado.descripcion }}
              </option>
            </select>
          </div> -->
          <div class="form-group">
            <label for="importe">Importe</label>
            <input type="number"
              class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="importe" min="1" v-model="form.importe" required />
          </div>
          <div v-if="isNegativeImport">
            <p class="text-red-600">No ingresar valores negativos</p>
          </div>
          <!-- Campo de Método de Pago -->
          <div class="form-group">
            <label for="metodo-pago" class="text-black">Método de pago</label>
            <select
              class="form-control form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="metodo-pago" v-model="form.metodoPago" required>
              <option value="">Seleccionar método de pago</option>
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="transferencia">Transferencia</option>
            </select>
          </div>
          <div class="form-group" v-if="isAdmin">
            <label for="importe">Fecha</label>
            <input type="date"
              class="form-control mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="importe" min="1" v-model="form.fecha" required />
          </div>
        </div>
        <button type="submit" @click.prevent="submitForm"
          class="text-black bg-green-300 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Guardar
        </button>

        <router-link :to="isAdmin ? '/lavados' : '/caja'"
          class="ml-5 font-medium text-green-500 dark:text-blue-500 hover:underline">Cancelar</router-link>
      </form>
    </div>
  </div>

  <!--
  <div class="viewport">
    <div class="card p-4 mx-2 shadow-md overflow-hidden w-fit self-center">
      <div class="mb-3">
        <router-link
          :to="isAdmin ? '/lavados' : '/Caja'"
          class="text-emerald-300 hover:text-emerald-600"
          >&lt; Volver atrás</router-link
        >
      </div>
      <h1 class="font-bold">Factura</h1>
      <form>
        <div class="form-group">
          <label for="descripcion" class="text-black">Descripción</label>
          <input
            type="text"
            class="form-control form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
            id="descripcion"
            v-model="form.descripcion"
          />
        </div>
        <div class="form-group">
          <label for="tipo-vehiculo" class="text-black">Servicio</label>
          <select
            class="form-select form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
            id="tipo-vehiculo"
            v-model="form.tipoVehiculoId"
          >
            <option value="">Seleccionar servicio</option>
            <option
              v-for="tipoVehiculo in tiposVehiculos"
              :key="tipoVehiculo.id"
              :value="tipoVehiculo.id"
            >
              {{ tipoVehiculo.descripcion }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="tipo-lavado" class="text-black">Tipo de servicio</label>
          <select
            class="form-control form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
            id="tipo-lavado"
            v-model="form.tipoLavadoId"
          >
            <option value="">Seleccionar tipo de servicio</option>
            <option
              v-for="tipoLavado in tiposLavados"
              :key="tipoLavado.id"
              :value="tipoLavado.id"
            >
              {{ tipoLavado.descripcion }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="importe" class="text-black">Importe</label>
          <input
            type="number"
            class="form-input form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
            id="importe"
            v-model="form.importe"
          />
        </div>
        <div class="form-group">
          <label for="tipo-lavado" class="text-black">Método de pago</label>
          <select
            class="form-control form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
            id="tipo-lavado"
            v-model="form.tipoLavadoId"
          >
            <option value="">Seleccionar método de pago</option>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="transferencia">Transferencia</option>
          </select>
        </div>
        <div v-if="isNegativeImport">
          <p class="text-red-600">No ingresar valores negativos</p>
        </div>
        <div class="form-group" v-if="isAdmin">
          <label for="importe">Fecha</label>
          <input
            type="date"
            class="form-control"
            id="importe"
            v-model="form.fecha"
            required
          />
        </div>
        <button
          type="submit"
          class="form-control form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
          @click.prevent="submitForm"
        >
          Guardar
        </button>
      </form>
    </div>
  </div>-->
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import lavadoService from "../../composables/api/lavadoService.js";
import cajaService from "../../composables/api/cajaService.js";
import _servicioService from "../../composables/api/servicioService.js";

// import { useLavados } from '../services';

export default {
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const idCaja = route.query.idCaja;
    let isAdmin = ref(false);
    let cajaAbierta = ref({});
    let tiposLavados = ref([]);
    let tiposVehiculos = ref([]);
    let isNegativeImport = ref(false);

    // alert(idCaja);
    let form = ref({
      id: 0,
      cajaId: 0,
      fecha: "",
      tipoVehiculoId: "",
      tipoLavadoId: "",
      descripcion: "",
      importe: null,
      responsable: "",
      fecha: "",
      metodoPago: ""
      // tipoVehiculo: {
      //   id: 0,
      //   descripcion: '',
      // },
      // tipoLavado: {
      //   id: 0,
      //   descripcion: '',
      // },
    });

    console.log(cajaAbierta);
    // const tiposLavados = ref([{ id: 1, nombre: 'Lavado Común' }]);
    // const tiposVehiculos = useTiposVehiculos();
    // const tiposLavados = useTiposLavados();
    // const lavados = useLavados();

    // const tiposVehiculos = ref([
    //   { id: 1, nombre: 'Camioneta' },
    //   { id: 2, nombre: 'Auto' },
    // ]);

    const submitForm = async () => {
      form.value.cajaId = cajaAbierta.value.id;
      form.value.responsable = cajaAbierta.value.responsable;
      if (form.value.importe < 1) {
        isNegativeImport.value = true;
        return;
      }
      if (form.value.fecha != "") {
        const fecha = new Date(form.value.fecha);
        const fechaFormateada = fecha.toISOString();
        form.value.fecha = fechaFormateada;
      } else {
        form.value.fecha = new Date().toISOString();
      }
      if (form.value.id == 0) {
        await lavadoService.addLavado(form);
      } else {
        await lavadoService.editLavado(form.value);
      }
      form.value = {};
      form.fecha = "";
      form.tipoVehiculoId = "";
      form.tipoLavadoId = "";
      form.descripcion = "";
      form.importe = null;
      form.responsable = "";
      form.fecha = "";
      form.metodoPago = ""; 
      if (isAdmin.value) {
        router.push("/lavados");
        return;
      } else {
        router.push("/ListLavadosCaja");
      }
    };

    onMounted(async () => {
      cajaAbierta.value = await cajaService.getCajaAbierta();
      tiposLavados.value = await lavadoService.getTipoLavado();
      // tiposVehiculos.value = await lavadoService.getTipoVehiculo();
      tiposVehiculos.value = await _servicioService.getAllServicio();

      const query = router.currentRoute.value.query;
      if (query.isAdmin === "true") {
        isAdmin.value = true;
      }
      if (query.id != null) {
        console.log(query);
        form.value.id = query.id;
        form.value = await lavadoService.getLavadoById(query.id);
      }

      // alert(isAdmin.value);

      // console.log(tipoLavado);
    });

    return {
      isNegativeImport,
      form,
      tiposVehiculos,
      tiposLavados,
      submitForm,
      cajaAbierta,
      idCaja,
      isAdmin,
    };
  },
};
</script>