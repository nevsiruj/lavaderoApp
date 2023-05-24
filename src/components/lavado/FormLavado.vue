<template>
  <div class="container mt-3">
    <div class="mb-3">
      <router-link to="/" class="text-blue-500">&lt; Volver atrás</router-link>
    </div>

    <div class="card shadow-lg">
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="descripcion" class="text-black">Descripción</label>
            <input
              type="text"
              class="
                form-input
                mt-1
                block
                w-full
                rounded-md
                border-gray-300
                shadow-sm
                focus:border-blue-500 focus:ring focus:ring-blue-200
              "
              id="descripcion"
              v-model="form.descripcion"
            />
          </div>
          <div class="form-group">
            <label for="tipo-vehiculo" class="text-black"
              >Tipo de vehículo</label
            >
            <select
              class="
                form-select
                mt-1
                block
                w-full
                rounded-md
                border-gray-300
                shadow-sm
                focus:border-blue-500 focus:ring focus:ring-blue-200
              "
              id="tipo-vehiculo"
              v-model="form.tipoVehiculoId"
            >
              <option value="">Seleccionar tipo de vehículo</option>
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
            <label for="tipo-lavado" class="text-black">Tipo de lavado</label>
            <select
              class="
                form-select
                mt-1
                block
                w-full
                rounded-md
                border-gray-300
                shadow-sm
                focus:border-blue-500 focus:ring focus:ring-blue-200
              "
              id="tipo-lavado"
              v-model="form.tipoLavadoId"
            >
              <option value="">Seleccionar tipo de lavado</option>
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
              class="
                form-input
                mt-1
                block
                w-full
                rounded-md
                border-gray-300
                shadow-sm
                focus:border-blue-500 focus:ring focus:ring-blue-200
              "
              id="importe"
              v-model="form.importe"
            />
          </div>
          <button
            type="submit"
            class="
              btn btn-primary
              mt-3
              bg-blue-500
              hover:bg-blue-600
              text-white
              font-bold
              py-2
              px-4
              rounded
            "
            @click.prevent="submitForm"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import lavadoService from '../../composables/api/lavadoService.js';
import cajaService from '../../composables/api/cajaService.js';

// import { useLavados } from '../services';

export default {
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const idCaja = route.query.idCaja;
    // alert(idCaja);
    const form = ref({
      id: 0,
      cajaId: 0,
      fecha: '',
      tipoVehiculoId: '',
      tipoLavadoId: '',
      descripcion: '',
      importe: '',
      // tipoVehiculo: {
      //   id: 0,
      //   descripcion: '',
      // },
      // tipoLavado: {
      //   id: 0,
      //   descripcion: '',
      // },
    });
    let tiposLavados = ref([]);
    let tiposVehiculos = ref([]);
    let cajaAbierta = ref({});
    cajaAbierta = cajaService.getCajaAbierta();
    console.log(cajaAbierta);
    // const tiposLavados = ref([{ id: 1, nombre: 'Lavado Común' }]);
    // const tiposVehiculos = useTiposVehiculos();
    // const tiposLavados = useTiposLavados();
    // const lavados = useLavados();

    // const tiposVehiculos = ref([
    //   { id: 1, nombre: 'Camioneta' },
    //   { id: 2, nombre: 'Auto' },
    // ]);

    const submitForm = () => {
      form.value.cajaId = cajaAbierta.value.id;
      form.value.fecha = new Date();
      // form.value.tipoLavado.id = form.value.tipoLavadoId;
      // form.value.tipoVehiculo.id = form.value.tipoVehiculoId;
      alert(form.value);
      lavadoService.addLavado(form);
      form.value = {};
      form.fecha = '';
      form.tipoVehiculoId = '';
      form.tipoLavadoId = '';
      form.descripcion = '';
      form.importe = '';
      router.push('/');
    };
    onMounted(async () => {
      tiposLavados.value = await lavadoService.getTipoLavado();
      tiposVehiculos.value = await lavadoService.getTipoVehiculo();

      // console.log(tipoLavado);
    });

    return {
      form,
      tiposVehiculos,
      tiposLavados,
      submitForm,
      cajaAbierta,
      idCaja,
    };
  },
};
</script>
