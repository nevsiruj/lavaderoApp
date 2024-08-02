<template>
 
  <div class="grid grid-flow-row gap-4">
    
    <div class="flex justify-center min-height-auto">
      <h1
        class="text-3xl text-center font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white"
      >
        Servicios
      </h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
      <div class="flex justify-center min-height-auto">
        <router-link :to="{ path: '/formServicios' }">
          <button
            type="button"
            class="focus:outline-none mr-5 text-white bg-[#3edfa9] hover:bg-[#ffe068] focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 md:px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            <svg
              class="w-6 h-6 inline-block text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Agregar Servicio
          </button>
        </router-link>

        <!--Pendiente funcion-->
        <button v-if="showMessage"
          type="button" 
          class="focus:outline-none text-white bg-[#3edfa9] hover:bg-[#ffe068] focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 md:px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          <svg
            class="w-6 h-6 inline-block text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
            />
          </svg>

          Actualizar
        </button>
      </div>
    </div>
    <hr class="divide-y divide-gray-100" />

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-[#96ffdf] dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Nombre</th>
            <th scope="col" class="px-6 py-3">Descripción</th>
            <th scope="col" class="px-6 py-3">Precio</th>
            <th scope="col" class="px-6 py-3">Tipo de servicio</th>
            <th scope="col" class="px-6 py-3">Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="servicio in servicios" :key="servicio.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th 
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
            {{ servicio.nombre }}
            </th>
            
            <td class="px-6 py-4">{{ servicio.descripcion }}</td>
            <td class="px-6 py-4">{{ servicio.precio }}</td>
            <td class="px-6 py-4">{{ servicio.tipoServicio.nombre }}</td>
            <td class="grid lg:flex md:flex px-2 md:px-6 py-4 lg:text-left md:text-center">
              <a @click="editarServicio(servicio)"
                href="#"
                class="font-medium text-gray-800 dark:text-white hover:underline"
                ><svg
                  class="w-4 h-4 inline-block text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                  />
                </svg>
                Editar</a
              >
              <a @click="openModal(servicio.id)"
                href="#"
                class="font-medium text-red-500 dark:text-white hover:underline lg:ml-5"
                ><svg
                  class="w-4 h-4 inline-block text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="#ef4444"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
                Eliminar</a
              >
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>
  </div><Modal message="servicio" @confirm="deleteServicio" ref="modalComponent" />
</template>

<script>
import { ref, onMounted } from "vue";
import servicioService from "../../composables/api/servicioService.js";
import { useRouter, useRoute } from "vue-router";
//import ModalConfirmar from "../modalConfirmar/ModalConfirmar.vue";
import tipoServicioService from "../../composables/api/tipoServicioService";
import Modal from '../modalConfirmar/ModalConfirmar.vue';

export default {

  components: {
    Modal
  },
  name: "servicios",
  setup() {
    const servicios = ref([]);
    const tiposServicio = ref([]);
    const showMessage = ref(false);
    const modalComponent = ref(null);
    const modal = ref();
    const router = useRouter();    
    const route = useRoute();

    const editarServicio = (servicio) => {
      router.push({
        path: "formServicios",
        query: { isAdmin: false, id: servicio.id },
      });
    };

    const deleteServicio = async (ServicioId) => {
      try {
        await servicioService.deleteServicio(ServicioId);
       
        servicios.value = await servicioService.getAllServicio();
        modal.value.hide()
      } catch (error) {
        console.error(error);
      }
      fetchServicios(), fetchTipoServicios();
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

    const openModal = async (servicioId) => {
      modal.value = await modalComponent.value.getModal(servicioId);
      if (modal.value) {
        modal.value.show();
      }
    };

    return {
      servicios,
      showMessage,
      fetchServicios,
      modal,
      openModal,
      editarServicio,
      deleteServicio,
      fetchTipoServicios,
      modalComponent
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
