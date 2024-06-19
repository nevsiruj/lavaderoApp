<!-- <template>
  <div class="viewport">
    <div class="m-auto rounded-lg py-2 px-2">
      <div class="flex justify-end">
        <div class="flex items-center space-x-2">
          <router-link :to="{ path: 'usuariosadmin' }" class="btn btn-base btn-success my-2 mr-1">
            <i class="fas fa-plus-circle mr-1"></i> Agregar Usuarios
          </router-link>
          <button class="btn btn-base btn-primary my-2">
            <i class="fas fa-sync-alt"></i> Actualizar
          </button>
        </div>
        <div v-if="showMessage" class="bg-green-100 text-green-800 px-4 py-2 rounded-md mt-2">
          <i class="fas fa-check-circle mr-1"></i> Actualizados
        </div>
      </div>
      <div class="bg-emerald-300 rounded-lg overflow-hidden shadow-lg mx-auto mt-4 w-fit">
        <table class="divide-y divide-gray-300">
          <thead class="bg-emerald-300">
            <tr>
              <th class="px-6 py-3 text-sm text-gray-700 uppercase tracking-wider whitespace-nowrap">
                User
              </th>
              <th class="px-6 py-3 text-sm text-gray-700 uppercase tracking-wider">
                Empresa
              </th>

              <th class="px-6 py-3 text-sm text-gray-700 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 text-left">
            <tr v-for="usuario in usuarios" :key="usuario.id">
              <td class="px-6 py-3 whitespace-nowrap text-lg">{{ usuario.user }}</td>
              <td class="px-6 py-3 whitespace-nowrap text-lg">{{ usuario.empresa }}</td>

              <td class="px-6 py-3 whitespace-nowrap text-lg">
                <div class="flex space-x-4">
                  <button class="text-blue-600 hover:text-blue-800 focus:outline-none text-xl"
                    @click="editarUsuario(usuario)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="text-red-600 hover:text-red-800 focus:outline-none text-xl"
                    @click="deleteUsuario(usuario.id)">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template> -->
<template>
  <div class="grid grid-flow-row gap-4">
    <div class="flex justify-center min-height-auto">
      <h1
        class="text-3xl text-center font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
        Empresas
      </h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
      <div class="flex justify-center min-height-auto">
        <router-link :to="{ path: '/formEmpresasAdmin' }"
          class="focus:outline-none mr-5 text-white bg-[#3edfa9] hover:bg-[#ffe068] focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 md:px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
          <svg class="w-6 h-6 inline-block text-white dark:text-white" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Agregar Nuevo
        </router-link>
      </div>
    </div>
    <hr class="divide-y divide-gray-100" />

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-[#96ffdf] dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Nombre</th>            
            <th scope="col" class="px-6 py-3">Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Usuario Prueba
            </th>            
            <td class="px-6 py-4 lg:text-left">
              <a href="#" class="font-medium text-gray-800 dark:text-white hover:underline"><svg
                  class="w-4 h-4 inline-block text-gray-800 dark:text-white" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                </svg>
              </a>
              <a href="#" class="font-medium text-red-500 dark:text-white hover:underline lg:ml-5"><svg
                  class="w-4 h-4 inline-block text-gray-800 dark:text-white" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="#ef4444" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                </svg>
              </a>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Usuario Prueba numero 2
            </th>            
            <td class="px-6 py-4 lg:text-left">
              <a href="#" class="font-medium text-gray-800 dark:text-white hover:underline"><svg
                  class="w-4 h-4 inline-block text-gray-800 dark:text-white" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                </svg>
              </a>
              <a href="#" class="font-medium text-red-500 dark:text-white hover:underline lg:ml-5"><svg
                  class="w-4 h-4 inline-block text-gray-800 dark:text-white" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="#ef4444" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                </svg>
              </a>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Usuario Prueba numero 3
            </th>            
            <td class="px-6 py-4 lg:text-left">
              <a href="#" class="font-medium text-gray-800 dark:text-white hover:underline"><svg
                  class="w-4 h-4 inline-block text-gray-800 dark:text-white" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                </svg>
              </a>
              <a href="#" class="font-medium text-red-500 dark:text-white hover:underline lg:ml-5"><svg
                  class="w-4 h-4 inline-block text-gray-800 dark:text-white" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="#ef4444" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                </svg>
              </a>
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
import { useRouter } from "vue-router";
// import usuariosService from "../../composables/api/authService.js";

export default {
  name: 'usuarios',
  setup() {
    const usuarios = ref([]);
    const showMessage = ref(false);
    const router = useRouter();

    const editarUsuario = (usuario) => {
      router.push({
        path: 'formUsuarios',
        query: { isAdmin: false, id: usuario.id },
      });
    };

    const deleteUsuario = async (UsuarioId) => {
      try {
        await usuariosService.removeUsuario(UsuarioId);
        usuarios.value = await usuariosService.getAllUsuario();
      } catch (error) {
        console.error(error);
      }
      fetchUsuarios();
    };

    const fetchUsuarios = async () => {
      try {
        usuarios.value = await usuariosService.getAllUsuarios();
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      fetchUsuarios();
    });

    return {
      usuarios,
      showMessage,
      fetchUsuarios,
      editarUsuario,
      deleteUsuario
    };
  },
};
</script>

<style></style>