<template>

<div class="grid grid-flow-row gap-4">
    <div class="flex justify-center min-height-auto">
      <h1
        class="text-3xl text-center font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white"
      >
       Tipos de Servicios
      </h1>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
      
      <div class="flex justify-center min-height-auto"><router-link :to="{ path: '/formTipoServicio' }">
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
        <button
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
            <th scope="col" class="px-6 py-3">Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tipoServicios" :key="item.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th 
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
            {{ item.nombre }}
            </th>
            <td class="px-6 py-4">{{ item.descripcion }}</td>
            <td class="grid lg:flex md:flex px-2 md:px-6 py-4 lg:text-left md:text-center">
              <a @click="edit(item)"
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
              <a @click="remove(servicio.id)"
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
  </div>








  
  <!--<div class="px-3 mt-10">    
    <div class="m-auto rounded-lg py-2 px-2">
      <h1 class="text-3xl font-semibold mb-4">Tipos de Servicios</h1>
      <div class="flex justify-center">
        <div class="flex items-center space-x-2">
          , query: { isAdmin: true } }"> //Esta linea comentada
          <router-link :to="{ path: '/formTipoServicio' }" class="btn btn-sm btn-success my-2 mr-1">
            <i class="fas fa-plus-circle mr-1"></i> Agregar Servicio
          </router-link>
          <button class="btn btn-sm btn-primary my-2">
            <i class="fas fa-sync-alt"></i> Actualizar
          </button>
        </div>

        <div v-if="showMessage" class="bg-green-100 text-green-800 px-4 py-2 rounded-md mt-2">
          <i class="fas fa-check-circle mr-1"></i> Actualizados
        </div>
      </div>

      <div class="bg-emerald-300 bg-white rounded-lg overflow-hidden shadow-lg mx-auto mt-2 w-fit">
        <table class="divide-y divide-gray-300">
          <thead class="bg-emerald-300">
            <tr>
              <th class="px-4 py-2 text-xs text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Tipos de servicios
              </th>
              <th class="px-4 py-2 text-xs text-gray-700 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 text-left">
            <tr v-for="tipoServicio in tipoServicios" :key="tipoServicio.id">
              <td class="px-4 py-2 whitespace-nowrap ">
                {{ tipoServicio.nombre }}
              </td>
              <td class="px-4 py-2 whitespace-nowrap ">
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-800 focus:outline-none "
                    @click="editarTipoServicio(tipoServicio)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="text-red-600 hover:text-red-800 focus:outline-none "
                    @click="deleteTipoServicio(tipoServicio.id)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>-->
</template>

<script>
import { ref, onMounted } from "vue";
import tipoServicioService from "../../composables/api/tipoServicioService.js";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "tipoServicios",
  setup() {
    const tipoServicios = ref([]);
    const showMessage = ref(false);
    const modal = ref();
    const router = useRouter();




    const edit = (_item) => {
      router.push({
        path: 'formTipoServicio',
        query: { isAdmin: false, id: _item.id },
      });

    };


    const remove = async (_id) => {
      try {

        await tipoServicioService.removeTipoServicio(_id);
        tipoServicios.value = await tipoServicioService.getAllTipoServicio();
      } catch (error) {
        console.error(error);
      }
      fetchServicios()
    };

    const fetchServicios = async () => {
      try {
        tipoServicios.value = await tipoServicioService.getAllTipoServicio();
      } catch (error) {
        console.error(error);
      }
    };


    onMounted(async () => {
      fetchServicios();

    });


    const openModal = async (id) => {
      const servicio = tipoServicios.value.find(s => s.id === id);
      modal.value = modalComponent({
        servicio,
        onClose: () => {
          modal.value = null;
        },
      });
    };

    return {
      showMessage,
      modal,
      edit,
      openModal,
      tipoServicios,
      // agregarTipoServicio,
      fetchServicios,
      remove,
      router
    };
  },
};

</script>
