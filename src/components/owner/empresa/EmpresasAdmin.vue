<template>
    <div class="viewport">
        <div class="m-auto rounded-lg py-2 px-2">
            <div class="flex justify-end">
                <div class="flex items-center space-x-2">
                    <!--, query: { isAdmin: true } }"> -->
                    <router-link :to="{ path: '/owner/empresas' }" class="btn btn-base btn-success my-2 mr-1">
                        <i class="fas fa-plus-circle mr-1"></i> Agregar Empresas
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
          Nombre
        </th>       
        
        <th class="px-6 py-3 text-sm text-gray-700 uppercase tracking-wider"></th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200 text-left">
      <tr v-for="usuario in usuarios" :key="usuario.id">
        <td class="px-6 py-3 whitespace-nowrap text-lg">{{ empresa.nombre }}</td>
        
        <td class="px-6 py-3 whitespace-nowrap text-lg">
          <div class="flex space-x-4">
            <button class="text-blue-600 hover:text-blue-800 focus:outline-none text-xl" @click="editarUsuario(usuario)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="text-red-600 hover:text-red-800 focus:outline-none text-xl" @click="deleteUsuario(usuario.id)">
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
  </template>
  <script>
  
//   import { ref, onMounted } from "vue";
//   import usuariosService from "../../composables/api/usuariosService";
//   import { useRouter, useRoute } from "vue-router";
//   import ModalConfirmar from "../modalConfirmar/ModalConfirmar.vue";
  
  
//   export default {
//     name: 'usuarios',
//     setup() {
//         const usuarios = ref([]);
//         const showMessage = ref(false);        
//         // const modalComponent = ref(null);
//         const modal = ref()
//         const router = useRouter();   
  
        
  
//         const editarUsuario = (usuario) => {
//             router.push({
//                 path: 'formUsuarios',
//                 query: { isAdmin: false, id: usuario.id },
//             });
//         };
  
  
//         const deleteUsuario = async (UsuarioId) => {
//             try {
  
//                 await usuariosService.removeUsuario(UsuarioId);
//                 usuarios.value = await usuariosService.getAllUsuario();
//             } catch (error) {
//                 console.error(error);
//             }
//             fetchUsuarios()
//         };
  
//         const fetchUsuarios = async () => {
//             try {
//                 usuarios.value = await usuariosService.getAllUsuarios();
//             } catch (error) {
//                 console.error(error);
//             }
//         };
  
//         onMounted(() => {
//             fetchUsuarios();
//         });
  
//         const openModal = async (id) => {
//             const usuario = usuarios.value.find(s => s.id === id);
//             modal.value = modalComponent({
//                 usuario,
//                 onClose: () => {
//                     modal.value = null;
//                 },
//             });
//         };
  
//         return {
//             usuarios,
//             showMessage,
//             fetchUsuarios,
//             modal,
//             openModal,
//             editarUsuario,
//             deleteUsuario
//         };
//     },
//   };
  </script>
  <style></style>