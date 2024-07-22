<template>
  <div>
    <transition name="modal">
      <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Empresas</h3>
                  <div class="mb-3 flex justify-center">
                    <router-link :to="'empresasadmin'" class="text-emerald-300 hover:text-emerald-600">&lt; Volver atrás
                    </router-link>
                  </div>

                  <div class="mt-2">
                    <form @submit.prevent="submitForm">
                      <div class="form-group flex items-center mb-4">
                        <label for="nombre" class="text-black w-1/4">Nombre</label>
                        <input type="text"
                          class="form-input mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
                          id="nombre" v-model="form.nombre" />
                      </div>                      
                      <div class="flex justify-end mt-5">
                        <button type="submit"
                          class="mr-2 bg-emerald-300 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded">
                          Guardar
                        </button>                        
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>




<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import empresaService from "../../../composables/api/empresaService";
// import Toast from "../../Toast/Toast.vue";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const form = ref({ nombre: '' });
    const isAdmin = ref(false);

    const agregarEmpresa = async () => {
      const empresa = { Name: form.value.nombre };
      try {
        await empresaService.addEmpresa(empresa);
        router.push('/owner/empresasadmin');
      } catch (error) {
        console.error('Error adding empresa:', error);
      }
    };


    const editarEmpresa = async () => {
      const empresa = { Name: form.value.nombre, Id: form.value.id, }; // Agregar Id
      try {
        await empresaService.editEmpresa(form.value.id, empresa);
        router.push('/owner/empresasadmin');
      } catch (error) {
        console.error('Error editing empresa:', error);
      }
    };
    

    const submitForm = async () => {
      if (form.value.nombre.trim() === '') {
        // Mostrar mensaje de error para nombre vacío
        return;
      }

      if (!form.value.id) {
        await agregarEmpresa();
      } else {
        await editarEmpresa();
      }

      form.value.nombre = '';
    };

    onMounted(async () => {
      const query = route.query;
      if (query.isAdmin === 'true') {
        isAdmin.value = true;
      }
      if (query.id) {
        const empresa = await empresaService.getById(query.id);
        form.value = { id: empresa.id, nombre: empresa.name };
      }
    });

    return {
      form,
      submitForm,
      isAdmin
    };
  },
};
</script>