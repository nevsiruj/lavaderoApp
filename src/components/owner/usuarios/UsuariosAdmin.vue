<template>
  <div class="grid grid-flow-row gap-4">
    <div class="flex justify-center min-height-auto">
      <h1
        class="text-3xl text-center font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
        Usuarios
      </h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
      <div class="flex justify-center min-height-auto">
        <router-link :to="{ path: '/owner/formUsuariosAdmin' }"
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
      <table class="min-w-full divide-y divide-gray-200 mt-4">
          <thead class="bg-emerald-300">
            <tr>
              <th class="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider whitespace-nowrap">
                User
              </th>
              <th class="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Empresa
              </th>
              
              <th class="px-2 py-2 text-xs text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 text-left">
            <tr v-for="usuario in usuarios" :key="usuario.id">
              <td class="px-4 py-2 whitespace-nowrap">{{ usuario.email }}</td>
              <td class="px-4 py-2 whitespace-nowrap">{{ usuario.tenantId }}</td>
              
              <td class="px-6 py-4 lg:text-left">
              <a @click="editarUsuario(usuario)"
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
              <a @click="deleteModal(usuario.id)"
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
    <Modal message="Usuario" @confirm="deleteUsuario" ref="modalComponent" />
  </div>   
</template>




 

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import  authService from "../../../composables/api/authService";
import Modal from "../../modalConfirmar/ModalConfirmar.vue";

export default {
  name: 'usuarios',
  setup() {
    const usuarios = ref([]);    
    const router = useRouter();
    const modalComponent = ref(null);
    const modal = ref();

    const editarUsuario = (Tenant) => {
          router.push({
              path: 'formUsuariosAdmin',
              query: { isAdmin: false, id: Tenant.id },
          });
      };
    
      const deleteUsuario = async (TenantId) => {
          try {
              await empresaService.removeEmpresa(TenantId);
              // modal.value.closeModal();
          } catch (error) {
              console.error(error);
          }
          fetchUsuarios();
      };

      const deleteModal = async (TenantId) => {
          modal.value = await modalComponent.value.getModal(TenantId);
      };

    const fetchUsuarios = async () => {
      try {
        usuarios.value = await authService.getUsers();
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      fetchUsuarios();
    });

    return {
      usuarios,      
      fetchUsuarios,
      editarUsuario,
      deleteUsuario,
      deleteModal
      
    };
  },
};
</script>

<style></style>