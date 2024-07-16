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
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Usuarios</h3>
                  <div class="mb-3 flex justify-center">
                    <router-link :to="'usuariosadmin'" class="text-emerald-300 hover:text-emerald-600">&lt; Volver atrás
                    </router-link>
                  </div>

                  <div class="mt-2">
                    <form @submit.prevent="submitForm">
                      <div class="form-group flex items-center mb-4">
                        <label for="nombre" class="text-black w-1/4">User</label>
                        <input type="text"
                          class="form-input mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
                          id="nombre" v-model="form.nombre" />
                      </div>
                      <div class="form-group flex items-center mb-4">
                        <label for="empresa" class="text-black w-1/4">Empresa</label>
                        <input type="text"
                          class="form-input mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
                          id="empresa" v-model="form.empresa" />
                      </div>
                      <div class="form-group flex items-center mb-4">
                        <label for="password" class="text-black w-1/4">Contraseña</label>
                        <input type="password"
                          class="form-input mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
                          id="password" v-model="form.password" @input="validatePassword" />
                      </div>
                      <div class="form-group flex items-center mb-4">
                        <label for="confirmPassword" class="text-black w-1/4">Confirmar contraseña</label>
                        <input type="password"
                          class="form-input mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm focus:border-emerald-300 focus:ring focus:ring-blue-200"
                          id="confirmPassword" v-model="form.confirmPassword" />
                      </div>
                      <div v-if="passwordError" class="text-red-600 mt-2">{{ passwordError }}</div>
                      <div class="text-gray-500 mt-2">La contraseña debe contener al menos una mayúscula, un punto y un
                        número.</div>
                      <div class="flex justify-end mt-5">
                        <button type="submit"
                          class="mr-2 bg-emerald-300 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded">
                          Guardar
                        </button>
                        <!-- <button @click="closeModal" class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
                          Cerrar
                        </button> -->
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
import  authService from "../../../composables/api/authService";

// import usuariosService from "../../composables/api/usuariosService";

export default {
  setup(props) {
    const router = useRouter();
    let isAdmin = ref(false);

    let isNegativeImport = ref(false);


    let form = ref({      
      nombre: '',
      
    });




    const agregarUsuario = async () => {
      console.log(form.value)
      const Usuario = {
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

      console.log("submitForm", form.value.id)

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

<!-- <script>
export default {
  data() {
    return {
      form: {
        nombre: '',
        apellido: '',
        dni: '',
        username: ''
      },
      passwordError: ''
    };
  },
  methods: {
    validatePassword() {
      const password = this.form.dni;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasDot = /\./.test(password);

      if (!hasUpperCase || !hasNumber || !hasDot) {
        this.passwordError = 'La contraseña debe contener al menos una mayúscula, un punto y un número.';
      } else {
        this.passwordError = '';
      }
    },
    submitForm() {
      this.validatePassword();
      if (this.passwordError) {
        return; // Si hay un error de contraseña, no enviar el formulario
      }
      // Lógica para enviar el formulario
      alert('Formulario enviado');
    }
  }
};
</script>
   -->