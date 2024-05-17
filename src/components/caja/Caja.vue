<template>
  <div class="viewport h-screen flex justify-center items-center">
    <div class="card self-center mx-3 w-fit shadow-md overflow-hidden">
      <div class="flex flex-col items-center my-6">
        <h3 class="text-4xl font-bold">Bienvenido</h3>
      </div>
      <div v-if="cajaAbierta.isOpen">
        <div class="pb-6 w-3/4 mx-auto md:w-full md:flex justify-center my-6 md:gap-8">
          <router-link class="rounded-full mt-4 block p-4 text-lg shadow-md hover:bg-green-500 bg-emerald-300  text-white"
            to="/ListLavadosCaja">
            <i class="fas fa-list-ul mr-2 text-xl"></i>Ventas diaria</router-link>
          <br />

          <router-link
            class="rounded-full mt-4 block p-4 text-lg shadow-md hover:bg-green-500 bg-emerald-300 text-white"
            to="/listingreso">
            <i class="fas fa-list-ul mr-2 text-xl"></i>Ingresos diario
          </router-link>
          <br />
          <router-link class="rounded-full mt-4 block p-4 text-lg shadow-md hover:bg-green-500 bg-emerald-300 text-white"
            to="/listegreso">
            <i class="fas fa-list-ul mr-2 text-xl"></i>Egresos diario
          </router-link>
        </div>
        <div class="flex flex-col items-center mt-8" v-if="!cajaAbierta.isOpen">
          <span class="text-red-500 font-bold text-lg">No hay cajas abiertas</span>
          <router-link class="text-blue-500 mt-4 text-lg" to="/abrircaja">Abrir caja</router-link>
        </div>
        <div class="px-6">
          <div class="flex items-center mt-8">
            <strong class="text-lg">Fecha: </strong>
            <h5 class="card-text text-lg">
              {{ new Date().toLocaleDateString() }}
            </h5>
          </div>
          <p class="flex card-text text-lg">
            <strong>Responsable:</strong> {{ cajaAbierta.responsable }}
          </p>
          <p class="flex card-text text-lg">
            <strong>Turno:</strong> {{ cajaAbierta.turno }}
          </p>
          <p class="flex card-text text-lg">
            <strong>Inicial: </strong>: ${{ cajaAbierta.montoInicial ?? "0.00" }}
          </p>
          <p class="flex card-text text-lg">
            <strong>Cantidad:</strong>
            {{ cajaAbierta.cantidadLavados ?? 0 }}           
          </p>
          <p class="flex card-text text-lg">
          <strong>Importe:</strong>
            ${{ cajaAbierta.totalImporteLavados ?? 0 }}
          </p>
          <p class="flex card-text text-lg">
            <strong>Ingresos:</strong> ${{ cajaAbierta.totalImporteIngresos ?? "0.00" }}
          </p>
          <p class="flex card-text text-lg">
            <strong>Egresos: </strong> ${{ cajaAbierta.totalImporteEgresos ?? "0.00" }}
          </p>
          <p class="flex card-text text-lg">
            <strong>Efectivo en caja:</strong> ${{ cajaAbierta.efectivoEnCaja ?? "0.00" }}
          </p>
        </div>
      </div>
      <div class="flex p-0 mt-8">
        <router-link
          class="py-4 px-6 btn-md text-xl text-green-600 hover:text-green-400 hover:text-green-400 hover:shadow-lg flex-grow"
          to="/formlavado">
          <i class="fas fa-plus-circle mr-2 text-xl"></i> Agregar venta
        </router-link>
        <router-link class="py-4 px-6 btn-md text-xl text-green-600 hover:text-green-400 hover:shadow-lg flex-grow"
          to="/formingreso">
          <i class="fas fa-plus-circle mr-2 text-xl"></i> Agregar ingreso
        </router-link>
        <router-link class="py-4 px-6 btn-md text-xl text-green-600 hover:text-green-400 hover:shadow-lg flex-grow"
          to="/formegreso">
          <i class="fas fa-plus-circle mr-2 text-xl"></i> Agregar egreso
        </router-link>
        <router-link class="py-4 px-6 btn-md text-xl text-red-600 hover:text-red-400 hover:shadow-lg flex-grow" to="/cerrarcaja">
          <i class="fa fa-times-circle mr-2 text-xl"></i> Cerrar caja
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
