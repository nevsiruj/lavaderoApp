<template>
  <div class="viewport">
    <div class="card shadow-md overflow-hidden">
      <div class="flex flex-col items-center my-3">
        <h3 class="text-2xl font-bold">Bienvenido</h3>
        <div class="flex items-center absolute left-6">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path fill="currentColor"
              d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z" />
          </svg>
          <h5 class="text-lg font-semibold ml-1">
            {{ new Date().toLocaleDateString() }}
          </h5>
        </div>
      </div>
      <div v-if="cajaAbierta.isOpen">
        <div class="pb-4">
          <div class="flex justify-center my-3">
            <router-link class="
                rounded-full
                mt-2
                m-2
                p-2
                text-sm
                shadow-md
                hover:bg-blue-500
                bg-blue-600
                text-white
              " to="/ListLavadosCaja">
              <i class="fas fa-list-ul mr-1"></i>Facturacion diaria</router-link>
            <br />

            <router-link class="
                rounded-full
                mt-2
                m-2
                p-2
                text-sm
                shadow-md
                hover:bg-blue-500
                bg-blue-600
                text-white
              " to="/listingreso">
              <i class="fas fa-list-ul mr-1"></i>Ingresos diario
            </router-link>
            <br />
            <router-link class="
                rounded-full
                mt-2
                m-2
                p-2
                text-sm
                shadow-md
                hover:bg-blue-500
                bg-blue-600
                text-white
              " to="/listegreso">
              <i class="fas fa-list-ul mr-1"></i>Egresos diario
            </router-link>
          </div>
        </div>
        <div class="flex flex-col items-center mt-4" v-if="!cajaAbierta.isOpen">
          <span class="text-red-500 font-bold">No hay cajas abiertas</span>
          <router-link class="text-blue-500 mt-2" to="/abrircaja">Abrir caja</router-link>
        </div>
        <div class="px-3">
          <p class="card-text text-left">
            <strong>Responsable:</strong> {{ cajaAbierta.responsable }}
          </p>
          <p class="card-text text-left">
            <strong>Inicial: </strong>: ${{
              cajaAbierta.montoInicial ?? '0.00'
            }}
          </p>
          <p class="card-text text-left">
            <strong>Cantidad Lavados:</strong>
            {{ cajaAbierta.cantidadLavados ?? 0 }}
            <br />
            <strong>Importe Lavados:</strong>
            $ {{ cajaAbierta.totalImporteLavados ?? 0 }}
          </p>
          <p class="card-text text-left">
            <strong>Ingresos:</strong> ${{
              cajaAbierta.totalImporteIngresos ?? '0.00'
            }}
          </p>
          <p class="card-text text-left">
            <strong>Egresos: </strong> ${{
              cajaAbierta.totalImporteEgresos ?? '0.00'
            }}
          </p>
          <p class="card-text text-left">
            Efectivo en caja:
            <strong>${{ cajaAbierta.efectivoEnCaja ?? '0.00' }}</strong>
          </p>
        </div>
      </div>
      <div class="flex p-0">
        <router-link class="
            py-3
            px-2
            btn-sm
            text-green-600
            hover:text-green-400 hover:text-green-400 hover:shadow-lg
            flex-grow
          " to="/formlavado">
          <i class="fas fa-plus-circle mr-1"></i> Agregar lavado
        </router-link>
        <router-link class="
            py-3
            px-2
            btn-sm
            text-red-600
            hover:text-red-400 hover:shadow-lg
            flex-grow
          " to="/cerrarcaja">
          <i class="fa fa-times-circle mr-1"></i> Cerrar caja
        </router-link>
        <router-link class="
            py-3
            px-2
            btn-sm
            text-green-600
            hover:text-green-400 hover:shadow-lg
            flex-grow
          " to="/formingreso">
          <i class="fas fa-plus-circle mr-1"></i> Agregar ingreso
        </router-link>
        <router-link class="
            py-3
            px-2
            btn-sm
            text-green-600
            hover:text-green-400 hover:shadow-lg
            flex-grow
          " to="/formegreso">
          <i class="fas fa-plus-circle mr-1"></i> Agregar egreso
        </router-link>
      </div>
    </div>
  </div>
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

    onMounted(async () => {
      cajaAbierta.value = await cajaService.getCajaAbierta();
      if (cajaAbierta.value == undefined) {
        router.push('/abrircaja');
      }
      cajaService.getCajas();
    });

    return {
      cajaAbierta,
    };
  },
  name: 'Caja',
  props: {},
  components: {},
  created() { },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
