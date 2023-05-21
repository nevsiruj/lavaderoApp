<template>
    <div class="row">
    <h3 class="mt-3">Bienvenido</h3>
  </div>

  <div class="container">
    <div class="card">
      <div class="card-header">
        <h5>
          {{ new Date().toLocaleDateString() }}
        </h5>
      </div>
      <div class="card-body">
        <div v-if="cajaAbierta.isOpen">
          <p class="card-text">
            <strong>Responsable:</strong> {{ cajaAbierta.responsable }}
          </p>
          <label class="card-text"
            >Dinero en la caja: ${{ cajaAbierta.montoInicial ?? '0.00' }}</label
          >
          <!-- <button
            class="btn btn-sm btn-danger ms-2"
            @click="cerrarCaja(cajaAbierta)"
          >
            <i class="fa fa-times-circle" style="font-size: 1rem"></i>
          </button> -->
          <router-link class="btn btn-sm btn-danger ms-2" to="/cerrarcaja">
            <i class="fa fa-times-circle" style="font-size: 1rem"></i>
          </router-link>
          <br />
          <br />
          <label class="card-text">
            <strong>Cantidad Lavados:</strong>
            {{ cajaAbierta.cantidadLavados ?? 0 }}
          </label>
          <router-link class="btn btn-sm btn-success ms-2" to="/formlavado"
            ><i class="fas fa-plus-circle" style="font-size: 1rem"></i>
          </router-link>
          <router-link
            class="btn btn-sm btn-outline-success ms-2"
            to="/listlavado"
          >
            <i class="fas fa-list-ul" style="font-size: 1rem"></i>
          </router-link>
          <br />
          <br />
          <label class="card-text">
            <strong>Cantidad Ingresos: </strong>${{
              cajaAbierta.totalImporteIngresos ?? '0.00'
            }}
          </label>
          <router-link class="btn btn-sm btn-success ms-2" to="/formingreso"
            ><i class="fas fa-plus-circle" style="font-size: 1rem"></i>
          </router-link>
          <router-link
            class="btn btn-sm btn-outline-success ms-2"
            to="/listingreso"
          >
            <i class="fas fa-list-ul" style="font-size: 1rem"></i>
          </router-link>
          <br />
          <br />
          <label class="card-text">
            Cantidad Egresos: ${{ cajaAbierta.totalImporteEgresos ?? '0.00' }}
          </label>
          <router-link class="btn btn-sm btn-success ms-2" to="/formegreso"
            ><i class="fas fa-plus-circle" style="font-size: 1rem"></i>
          </router-link>
          <router-link
            class="btn btn-sm btn-outline-success ms-2"
            to="/listegreso"
          >
            <i class="fas fa-list-ul" style="font-size: 1rem"></i>
          </router-link>
          <br />
          <br />
          <label class="card-text">
            Efectivo en caja: ${{ cajaAbierta.efectivoEnCaja ?? '0.00' }}
          </label>
        </div>
        <div class="row" v-if="!cajaAbierta.isOpen">
          <span class="text-danger"> No hay cajas abiertas </span>
          <router-link to="/abrircaja">Abrir caja</router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- <button class="btn btn-outline-dark mt-2" to="/abrircaja">Abrir caja</button> -->
</template>

<script>
// import cajaService from '../services/caja.service.js';
import cajaService from '../../composables/api/cajaService.js';
import { reactive, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    let cajaAbierta = ref({});
    const router = useRouter();
    const route = useRoute();
    cajaAbierta = cajaService.getCajaAbierta();

    onMounted(() => {
      cajaAbierta = cajaService.getCajaAbierta();
      cajaService.getCajas();
    });

    return {
      cajaAbierta,
    };
  },
  name: 'Caja',
  props: {},
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
