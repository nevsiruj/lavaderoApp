<template>
  <div class="viewport h-screen flex justify-center items-center">
    <div class="card self-center mx-3 w-fit shadow-md overflow-hidden">
      <div class="flex flex-col items-center my-3">
        <h3 class="text-2xl font-bold">Bienvenido</h3>
      </div>
      <div v-if="cajaAbierta.isOpen">
        <div class="pb-4 w-1/2 mx-auto md:w-full md:flex justify-center my-3 md:gap-5">
          <router-link class="rounded-full mt-2 block p-2 text-sm shadow-md hover:bg-green-500 bg-emerald-300  text-white"
            to="/ListLavadosCaja">
            <i class="fas fa-list-ul mr-1"></i>Ventas diaria</router-link>
          <br />

          <router-link
            class="rounded-full w-baseline mt-2 block p-2 text-sm shadow-md hover:bg-green-500 bg-emerald-300 text-white"
            to="/listingreso">
            <i class="fas fa-list-ul mr-1"></i>Ingresos diario
          </router-link>
          <br />
          <router-link class="rounded-full mt-2 block p-2 text-sm shadow-md hover:bg-green-500 bg-emerald-300 text-white"
            to="/listegreso">
            <i class="fas fa-list-ul mr-1"></i>Egresos diario
          </router-link>
        </div>
        <div class="flex flex-col items-center mt-4" v-if="!cajaAbierta.isOpen">
          <span class="text-red-500 font-bold">No hay cajas abiertas</span>
          <router-link class="text-blue-500 mt-2" to="/abrircaja">Abrir caja</router-link>
        </div>
        <div class="px-3">
          <div class="flex items-center">
            <strong>Fecha: </strong>
            <h5 class="card-text text-left">
              {{ new Date().toLocaleDateString() }}
            </h5>
          </div>
          <p class="card-text text-left">
            <strong>Responsable:</strong> {{ cajaAbierta.responsable }}
          </p>
          <p class="card-text text-left">
            <strong>Turno:</strong> {{ cajaAbierta.turno }}
          </p>
          <p class="card-text text-left">
            <strong>Inicial: </strong>: ${{
              cajaAbierta.montoInicial ?? "0.00"
            }}
          </p>
          <p class="card-text text-left">
            <strong>Cantidad:</strong>
            {{ cajaAbierta.cantidadLavados ?? 0 }}
            <br />
            <strong>Importe:</strong>
            $ {{ cajaAbierta.totalImporteLavados ?? 0 }}
          </p>
          <p class="card-text text-left">
            <strong>Ingresos:</strong> ${{
              cajaAbierta.totalImporteIngresos ?? "0.00"
            }}
          </p>
          <p class="card-text text-left">
            <strong>Egresos: </strong> ${{
              cajaAbierta.totalImporteEgresos ?? "0.00"
            }}
          </p>
          <p class="card-text text-left">
            <strong>Efectivo en caja:</strong> ${{ cajaAbierta.efectivoEnCaja ?? "0.00" }}
          </p>
        </div>
      </div>
      <div class="flex p-0">
        <router-link
          class="py-3 px-2 btn-sm text-green-600 hover:text-green-400 hover:text-green-400 hover:shadow-lg flex-grow"
          to="/formlavado">
          <i class="fas fa-plus-circle mr-1"></i> Agregar venta
        </router-link>
        <router-link class="py-3 px-2 btn-sm text-green-600 hover:text-green-400 hover:shadow-lg flex-grow"
          to="/formingreso">
          <i class="fas fa-plus-circle mr-1"></i> Agregar ingreso
        </router-link>
        <router-link class="py-3 px-2 btn-sm text-green-600 hover:text-green-400 hover:shadow-lg flex-grow"
          to="/formegreso">
          <i class="fas fa-plus-circle mr-1"></i> Agregar egreso
        </router-link>
        <router-link class="py-3 px-2 btn-sm text-red-600 hover:text-red-400 hover:shadow-lg flex-grow" to="/cerrarcaja">
          <i class="fa fa-times-circle mr-1"></i> Cerrar caja
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import cajaService from "../../composables/api/cajaService.js";
import { reactive, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "caja",
  setup() {
    let cajaAbierta = ref({});
    const router = useRouter();
    const route = useRoute();

    onMounted(async () => {
      cajaAbierta.value = await cajaService.getCajaAbierta();
      if (cajaAbierta.value == undefined) {
        router.push("/abrircaja");
      }
      cajaService.getCajas();
    });

    return {
      cajaAbierta,
    };
  },
};
</script>

<style>

</style>
