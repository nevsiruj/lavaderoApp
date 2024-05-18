<template>
  <div class="viewport h-screen flex justify-center items-center overflow-x-hidden">
    <div class="card self-center mx-3 w-full md:w-auto shadow-md overflow-hidden">
      <div class="flex flex-col items-center my-4">
        <h3 class="text-3xl font-bold">Bienvenido</h3>
      </div>
      <div v-if="cajaAbierta.isOpen">
        <div class="pb-4 w-3/4 mx-auto md:w-full md:flex justify-center my-4 md:gap-6">
          <router-link
            class="rounded-full mt-3 block p-3 text-sm shadow-md hover:bg-green-500 bg-emerald-300 text-white"
            to="/ListLavadosCaja">
            <i class="fas fa-list-ul mr-1 text-sm"></i>Ventas diaria
          </router-link>
          <router-link
            class="rounded-full mt-3 block p-3 text-sm shadow-md hover:bg-green-500 bg-emerald-300 text-white"
            to="/listingreso">
            <i class="fas fa-list-ul mr-1 text-sm"></i>Ingresos diario
          </router-link>
          <router-link
            class="rounded-full mt-3 block p-3 text-sm shadow-md hover:bg-green-500 bg-emerald-300 text-white"
            to="/listegreso">
            <i class="fas fa-list-ul mr-1 text-sm"></i>Egresos diario
          </router-link>
        </div>
        <div class="flex flex-col items-center mt-6" v-if="!cajaAbierta.isOpen">
          <span class="text-red-500 font-bold text-sm">No hay cajas abiertas</span>
          <router-link class="text-blue-500 mt-3 text-sm" to="/abrircaja">Abrir caja</router-link>
        </div>
        <div class="px-4">
          <div class="flex items-center mt-6">
            <strong class="text-sm">Fecha: </strong>
            <h5 class="card-text text-sm">
              {{ new Date().toLocaleDateString() }}
            </h5>
          </div>
          <p class="flex card-text text-sm">
            <strong>Responsable:</strong> {{ cajaAbierta.responsable }}
          </p>
          <p class="flex card-text text-sm">
            <strong>Turno:</strong> {{ cajaAbierta.turno }}
          </p>
          <p class="flex card-text text-sm">
            <strong>Inicial:</strong> ${{ cajaAbierta.montoInicial ?? "0.00" }}
          </p>
          <p class="flex card-text text-sm">
            <strong>Cantidad:</strong> {{ cajaAbierta.cantidadLavados ?? 0 }}
          </p>
          <p class="flex card-text text-sm">
            <strong>Importe:</strong> ${{ cajaAbierta.totalImporteLavados ?? 0 }}
          </p>
          <p class="flex card-text text-sm">
            <strong>Ingresos:</strong> ${{ cajaAbierta.totalImporteIngresos ?? "0.00" }}
          </p>
          <p class="flex card-text text-sm">
            <strong>Egresos:</strong> ${{ cajaAbierta.totalImporteEgresos ?? "0.00" }}
          </p>
          <p class="flex card-text text-sm">
            <strong>Efectivo en caja:</strong> ${{ cajaAbierta.efectivoEnCaja ?? "0.00" }}
          </p>
        </div>
      </div>
      <div class="flex p-0 mt-4 gap-1">
  <router-link
    class="py-2 px-2 btn-base text-sm text-green-600 hover:text-green-400 hover:shadow-lg flex-grow"
    to="/formlavado">
    <i class="fas fa-plus-circle mr-1 text-sm"></i> Agregar venta
  </router-link>
  <router-link
    class="py-2 px-2 btn-base text-sm text-green-600 hover:text-green-400 hover:shadow-lg flex-grow"
    to="/formingreso">
    <i class="fas fa-plus-circle mr-1 text-sm"></i> Agregar ingreso
  </router-link>
  <router-link
    class="py-2 px-2 btn-base text-sm text-green-600 hover:text-green-400 hover:shadow-lg flex-grow"
    to="/formegreso">
    <i class="fas fa-plus-circle mr-1 text-sm"></i> Agregar egreso
  </router-link>
  <router-link
    class="py-2 px-2 btn-base text-sm text-red-600 hover:text-red-400 hover:shadow-lg flex-grow"
    to="/cerrarcaja">
    <i class="fa fa-times-circle mr-1 text-sm"></i> Cerrar caja
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
