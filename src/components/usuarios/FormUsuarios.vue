<template>
    <div class="viewport">
      <div class="card w-max m-auto p-4">
        <div class="mb-3">
          <router-link :to="'/usuarios'" class="text-emerald-300 hover:text-emerald-600">&lt; Volver atrás
          </router-link>
        </div>
        <h1 class="font-bold">Usuarios</h1>
        <form>
          <div class="form-group">
            <label for="nombre" class="text-black">Nombre</label>
            <input type="text"
              class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="descripcion" v-model="form.nombre" />
          </div>
          <div class="form-group">
            <label for="apellido" class="text-black">Apellido</label>
            <input type="text"
              class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="apellido" v-model="form.apellido" />
          </div>
          <div class="form-group">
            <label for="dni" class="text-black">Dni</label>
            <input type="text"
              class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="importe" v-model="form.dni" />
          </div>
          <div class="form-group">
            <label for="username" class="text-black">Username</label>
            <input type="text"
              class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="importe" v-model="form.username" />
          </div>
          <div class="form-group">
            <label for="rol" class="text-black">Rol</label>
            <input type="text"
              class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
              id="importe" v-model="form.rol" />
          </div> 
  
          
  
          <div v-if="isNegativeImport">
            <p class="text-red-600">No ingresar valores negativos</p>
          </div>
          <button type="submit" class="mt-3 bg-emerald-300 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded"
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
  import usuariosService from "../../composables/api/usuariosService";
  
  export default {
    setup(props) {
      const router = useRouter();
      let isAdmin = ref(false);

      let isNegativeImport = ref(false);

  
      let form = ref({
        id: 0,
        apellido: '',
        dni: '',
        username: '',
        rol: '',
      });
  
      
  
      
      const agregarUsuario = async () => {
        console.log(form.value)
        const Usuario= {
          id: form.value.id,
          nombre: form.value.nombre,
          apellido: form.value.apellido,
          dni: form.value.dni,
          username: form.value.username,
          rol: form.value.rol
        };
  
        try {
          console.log(Usuario)
          await usuariosService.addUsuario(Usuario);
          router.push('/Usuarios');
        } catch (error) {
          console.error(error);
  
        }
      };
  
      const editarUsuario = async () => {
        console.log(form.value)       
        try {
          await usuariosService.editUsuario(form.value.id, form.value);
          router.push('/Usuarios');
        } catch (error) {
          console.error(error);
  
        }
      };
  
      const submitForm = async () => {
  
        if (form.value.nombre.trim() === '') {
          // Mostrar mensaje de error para nombre vacío
          return;
        }
       
        console.log("submitForm",form.value.id)
  
        if (form.value.id == 0 || !form.value.id) {
          await agregarUsuario();
        } else {
          await editarUsuario();
          
        }
  
        form.value = {};
        form.defineComponent = '';
        form.nombre = '';
        form.dni = '';
        form.username = '';
        form.rol = ''
  
  
        if (isAdmin.value) {
          router.push("/Usuarios");
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
          form.value = await usuariosService.getById(query.id);
        }
      });
  
      return {
        isNegativeImport,
        form,        
        submitForm,
        isAdmin,
        agregarUsuario,
        editarUsuario
        
        
        
      };
    },
  };
  </script>
  