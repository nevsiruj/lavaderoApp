<template>
    <div class="viewport">
      <div class="card w-max m-auto p-4">
        <div class="mb-3">
          <router-link :to="'/agenda'" class="text-emerald-300 hover:text-emerald-600">&lt; Volver atrás
          </router-link>
        </div>
        <h1 class="font-bold">Agenda</h1>
        <form>
          <div class="form-group">
            <label for="nombre" class="text-black">Cliente</label>
            <input type="text"
              class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="descripcion" v-model="form.cliente" />
          </div>
          <div class="form-group">
            <label for="descripcion" class="text-black">Whatsapp</label>
            <input type="tel"
              class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="importe" v-model="form.whatsapp" />
          </div>
          <div class="form-group">
            <label for="Precio" class="text-black">Fecha</label>
            <input type="date"
              class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="importe" v-model="form.fecha" />
          </div> 
  
  
  
          <div v-if="isNegativeImport">
            <p class="text-red-600">No ingresar valores negativos</p>
          </div>
          <button type="submit" class="mt-3 bg-emerald-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
            @click.prevent="submitForm">
            Guardar
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import agendaService from "../../composables/api/agendaService";

  
  export default {
    setup(props) {
      const router = useRouter();
      let isAdmin = ref(false);
    //   let tiposDeServicio = ref([]);
      let isNegativeImport = ref(false);
    //   let tipoServicioSeleccionado = ref({})
  
      let form = ref({
        id: 0,
        // tipoServicioId: 0,
        // precio: 0,
        // descripcion: "",
      });
  
    //   const obtenerTiposDeServicio = async () => {
    //     try {
    //       const response = await tipoServicioService.getAllTipoServicio();
  
    //       tiposDeServicio.value = response;
  
    //     } catch (error) {
    //       console.error('Error al obtener los tipos de servicio:', error);
    //     }
    //   };
  
      
      const agregarAgenda = async () => {
        const Agenda = {
          id: form.value.id,
          cliente: form.value.cliente,
          fecha: form.value.fecha,
          whatsapp: form.value.whatsapp,
          
        };
  
        try {
          await agendaService.addAgenda(Agenda);
          router.push('/Agenda');
        } catch (error) {
          console.error(error);
  
        }
      };
  
      const editarAgenda = async () => {
        console.log(form.value)        
  
        try {
          await agendaService.editAgenda(form.value.id, form.value);
          router.push('/Agenda');
        } catch (error) {
          console.error(error);
  
        }
      };
  
      const submitForm = async () => {
  
        if (form.value.cliente.trim() === '') {
          // Mostrar mensaje de error para cliente vacío
          return;
        }
       
  
        if (form.value.id == 0 || !form.value.id) {
          await agregarAgenda();
        } else {
          await editarAgenda();
        }
  
        form.value = {};
        form.defineComponent = '';
        form.cliente = '';
        form.whatsapp = '';
        form.fecha = '';
  
  
        if (isAdmin.value) {
          router.push("/Agenda");
          return;
        }
      }
  
      
  
  
      onMounted(async () => {
        
        const query = router.currentRoute.value.query;
        if (query.isAdmin === 'true') {
          isAdmin.value = true;
        }
        if (query.id != null) {
          console.log(query);
          form.value.id = query.id;
          form.value = await agendaService.getById(query.id);
        }
      });
  
      return {
        isNegativeImport,
        form,       
        submitForm,
        isAdmin,
        agregarAgenda,
        editarAgenda,       
      };
    },
  };
  </script>
  