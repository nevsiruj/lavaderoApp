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
          <p class="card-text">Responsable: {{ cajaAbierta.responsable }}</p>
          <label class="card-text"
            >Dinero en la caja: {{ cajaAbierta.montoInicial }}</label
          >
          <button
            class="btn btn-sm btn-danger ms-2"
            @click="cerrarCaja(cajaAbierta)"
          >
            <i class="fa fa-times-circle" style="font-size: 1rem"></i>
          </button>
          <br />
          <br />
          <label class="card-text">
            Cantidad Lavados: {{ cajaAbierta.cantidadLavados }}
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
            Cantidad Ingresos: {{ cajaAbierta.cantidadIngresos }}
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
            Cantidad Egresos: {{ cajaAbierta.cantidadEgresos }}
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

    const cerrarCaja = (cajaAbierta) => {
      cajaService.cerrarCaja(cajaAbierta.id);
      console.log('Caja cerrada', cajaAbierta.value);
      router.push('/abrircaja');
    };

    onMounted(() => {
      cajaAbierta = cajaService.getCajaAbierta();
      cajaService.getCajas();
    });

    return {
      cajaAbierta,
      cerrarCaja,
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
