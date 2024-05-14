<template>
  <div class="viewport">
    <div class="m-auto rounded-lg py-2 px-2">
      <div class="flex justify-center">
        <div class="flex items-center space-x-2">
          <!--, query: { isAdmin: true } }"> -->
          <router-link
            :to="{ path: '/formTipoServicio' }"
            class="btn btn-sm btn-success my-2 mr-1"
          >
            <i class="fas fa-plus-circle mr-1"></i> Agregar tipo de servicio
          </router-link>
          <router-link 
             :to="{ path: '/tipoServicios' }"
              class="btn btn-sm btn-primary my-2">
            <i class="fas fa-sync-alt my-1"></i> Actualizar
          </router-link>
        </div>
        <div
          v-if="showMessage"
          class="bg-green-100 text-green-800 px-4 py-2 rounded-md mt-2"
        >
          <i class="fas fa-check-circle mr-1"></i> Actualizados
        </div>
      </div>
      <div
        class="bg-emerald-300 rounded-lg overflow-hidden shadow-md mx-auto mt-1 w-min"
      >
        <table class="divide-y divide-gray-200">
          <thead class="bg-emerald-300">
            <tr>
              <th
                class="px-3 py-2 text-xs text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                Tipos de servicios
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 text-left">
            <tr v-for="tipoServicio in tipoServicios">
              <td class="px-3 py-1 whitespace-nowrap">
                {{ tipoServicio.nombre }}
              </td>
              <td class="px-3 py-1 whitespace-nowrap ">
                <div class="flex space-x-2 ">
                  <button
                    class="text-blue-600 hover:text-blue-800 focus:outline-none"
                    @click="editarTipoServicio(tipoServicio)"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    class="text-red-600 hover:text-red-800 focus:outline-none"
                    @click="deleteTipoServicio(tipoServicio.id)"
                  >
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
import { ref, onMounted } from "vue";
import tipoServicioService  from "../../composables/api/tipoServicioService.js";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "tipoServicios",
  setup() {
    const tipoServicios = ref([]);
    const showMessage = ref(false);
    const modal = ref();
    const router = useRouter();   




    const editarTipoServicio = (servicio) => {
      router.push({
        path: 'formTipoServicio',
        query: { isAdmin: false, id: servicio.id },
      });
      
    };
    

    const deleteTipoServicio = async (tipoServicioId) => {
    try {
      
      await tipoServicioService.removeTipoServicio(tipoServicioId);       
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


    onMounted(async() => {
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
      editarTipoServicio,
      openModal,
      tipoServicios,
      // agregarTipoServicio,
      fetchServicios,
      deleteTipoServicio,
      router
    };
  },
};

</script>
