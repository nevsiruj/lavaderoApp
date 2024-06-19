<template>

  <div class="grid grid-flow-row gap-4">
    <div class="flex justify-center min-height-auto">
      <h1
        class="text-3xl text-center font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
        Servicios
      </h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-1 gap-4">

      <div class="flex justify-center min-height-auto">
        <button type="button"
          class="focus:outline-none mr-5 text-white bg-[#3edfa9] hover:bg-[#ffe068] focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 md:px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
          <svg class="w-6 h-6 inline-block text-white dark:text-white" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Agregar Servicio
        </button>

        <button type="button"
          class="focus:outline-none text-white bg-[#3edfa9] hover:bg-[#ffe068] focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 md:px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
          <svg class="w-6 h-6 inline-block text-white dark:text-white" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4" />
          </svg>

          Actualizar
        </button>
      </div>
    </div>
    <hr class="divide-y divide-gray-100" />

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-[#96ffdf] dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Nombre</th>
            <th scope="col" class="px-6 py-3">Descripción</th>
            <th scope="col" class="px-6 py-3">Precio</th>
            <th scope="col" class="px-6 py-3">Tipo de servicio</th>
            <th scope="col" class="px-6 py-3">Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Servicio 1
            </th>
            <td class="px-6 py-4">Apple MacBook Pro 17"</td>

            <td class="px-6 py-4">$2999</td>
            <td class="px-6 py-4">Servicio 1</td>
            <td class="px-6 py-4 lg:text-left">
              <a href="#" class="font-medium text-gray-800 dark:text-white hover:underline"><svg
                  class="w-4 h-4 inline-block text-gray-800 dark:text-white" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                </svg>
                Editar</a>
              <a href="#" class="font-medium text-red-500 dark:text-white hover:underline lg:ml-5"><svg
                  class="w-4 h-4 inline-block text-gray-800 dark:text-white" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="#ef4444" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                </svg>
                Eliminar</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>












  <!--<div class="px-3 mt-10">
        <h1 class="text-3xl font-semibold mb-6 " >Servicios</h1>
      <div class="flex flex-col items-center justify-center space-y-2 md:space-y-0 mb-2">
        <div class="flex space-x-2">
          <router-link :to="{ path: '/formServicios' }" class="btn btn-sm btn-success">
            <i class="fas fa-plus-circle mr-1"></i> Agregar Servicio
          </router-link>
            <button class="btn btn-sm btn-primary" @click="fetchServicios">
            <i class="fas fa-sync-alt"></i> Actualizar
          </button>
        </div>
        <div v-if="showMessage" class="bg-green-100 text-green-800 px-4 py-2 rounded-md mt-2 md:mt-0">
          <i class="fas fa-check-circle mr-1"></i> Actualizados
        </div>
      </div>
      <div class="md:w-fit w-full overflow-x-auto bg-white rounded-lg p-2 shadow-md mx-auto mt-2">
        <table class="min-w-full divide-y divide-gray-200 mt-4">
          <thead class="bg-emerald-300">
            <tr>
              <th class="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Nombre
              </th>
              <th class="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Descripción
              </th>
              <th class="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Precio
              </th>
              <th class="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Tipo Servicio
              </th>
              <th class="px-2 py-2 text-xs text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 text-left">
            <tr v-for="servicio in servicios" :key="servicio.id">
              <td class="px-4 py-2 whitespace-nowrap">{{ servicio.nombre }}</td>
              <td class="px-4 py-2 whitespace-nowrap">{{ servicio.descripcion }}</td>
              <td class="px-4 py-2 whitespace-nowrap">{{ servicio.precio }}</td>
              <td class="px-4 py-2 whitespace-nowrap">{{ servicio.tipoServicio }}</td>
              <td class="px-4 py-2 whitespace-nowrap">
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-800 focus:outline-none text-xl" @click="editarServicio(servicio)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="text-red-600 hover:text-red-800 focus:outline-none text-xl" @click="deleteServicio(servicio.id)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>-->
</template>











<script>

import { ref, onMounted } from "vue";
import servicioService from "../../composables/api/servicioService.js";
import { useRouter, useRoute } from "vue-router";
import ModalConfirmar from "../modalConfirmar/ModalConfirmar.vue";
import tipoServicioService from "../../composables/api/tipoServicioService";


export default {
  name: 'servicios',
  setup() {
    const servicios = ref([]);
    const tiposServicio = ref([]);
    const showMessage = ref(false);
    // const modalComponent = ref(null);
    const modal = ref()
    const router = useRouter();



    const editarServicio = (servicio) => {
      router.push({
        path: 'formServicios',
        query: { isAdmin: false, id: servicio.id },
      });
    };


    const deleteServicio = async (ServicioId) => {
      try {

        await servicioService.removeServicio(ServicioId);
        servicios.value = await servicioService.getAllServicio();
      } catch (error) {
        console.error(error);
      }
      fetchServicios(),
        fetchTipoServicios()
    };

    const fetchServicios = async () => {
      try {
        servicios.value = await servicioService.getAllServicio();
      } catch (error) {
        console.error(error);
      }
    };
    const fetchTipoServicios = async () => {
      try {
        tiposServicio.value = await tipoServicioService.getAllTipoServicio();
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      fetchServicios();
      fetchTipoServicios();
    });

    const openModal = async (id) => {
      const servicio = servicios.value.find(s => s.id === id);
      modal.value = modalComponent({
        servicio,
        onClose: () => {
          modal.value = null;
        },
      });
    };

    return {
      servicios,
      showMessage,
      fetchServicios,
      modal,
      openModal,
      editarServicio,
      deleteServicio,
      fetchTipoServicios
    };
  },
};

</script>

<style>
/*.viewport {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 100%;
}*/

.table-responsive {
  overflow-x: auto;
}

table {
  min-width: 100%;
}
</style>
