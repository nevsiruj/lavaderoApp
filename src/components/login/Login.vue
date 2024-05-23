<template>
  <div class="bg-gray-900 min-h-screen flex justify-center items-center">
    <div class="flex flex-col sm:flex-row max-w-4xl w-full">
      <div class="w-full sm:max-w-md p-8 space-y-3 rounded-xl bg-gray-800 shadow-lg text-white">
        <h2 class="text-2xl font-bold text-center">Iniciar sesión en tu cuenta</h2>
        <form @submit.prevent="login">
          <div>
            <label class="block mb-3" for="email">Email</label>
            <input class="w-full mb-3 px-4 py-3 rounded-md bg-gray-700 focus:outline-none" type="email" id="email" v-model="email" required />
          </div>
          <div>
            <label class="block mb-3" for="password">Password</label>
            <input class="w-full mb-3 px-4 py-3 rounded-md bg-gray-700 focus:outline-none" type="password" id="password" v-model="password" required />
          </div>
           <!--Mover el spinner aquí -->
          <div v-if="loading" class="flex justify-center items-center">
            <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>
          <button class="w-full mb-3 px-4 py-3 rounded-md bg-blue-600 hover:bg-blue-500 focus:outline-none" type="submit">Iniciar Sesión</button>
        </form>      
      </div>      
      <img class="w-full sm:w-1/2 rounded-xl ml-6" src="../../Img/imglogin.jpg" alt="Imagen de inicio de sesión">
    </div>   
  </div>

  <!-------------------------------------------->

  <!--<div
    class="bg-gray-900 flex min-h-screen flex-col justify-content: flex-start px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-36 w-auto"
        src="../../Img/gestoflexblanco.png"
        alt="GestoFlex"
      />
      <h2
        class="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-white"
      >
        Login
      </h2>
    </div>

    <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="login">
        <div>
          <div class="mt-2">
            <input
              id="email"
              type="email"
              autocomplete="email"
              placeholder="Email"
              v-model="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between"></div>
          <div class="mt-2">
            <input
              id="password"
              type="password"
              autocomplete="current-password"
              placeholder="Password"
              v-model="password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div v-if="loading" class="flex justify-center items-center">
            <div
              class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
              role="status"
            >
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  </div>-->
</template>

<script>
import authService from "../../composables/api/authService.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import cajaService from "../../composables/api/cajaService.js";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const router = useRouter();
    const cajaAbierta = ref({});

    const login = async () => {
      loading.value = true; // Activa el spinner antes de iniciar el proceso de inicio de sesión
      try {
        const response = await authService.login(email.value, password.value);
        if (response.token) {
          // Redireccionar a la página después del inicio de sesión exitoso
          cajaAbierta.value = await cajaService.getCajaAbierta();
          console.log(cajaAbierta.value);
          if (cajaAbierta.value == undefined) {
            router.push("/abrircaja");
          } else {
            router.push("/caja");
          }
        } else {
          console.error("Inicio de sesión fallido");
        }
      } catch (error) {
        console.error("Error de inicio de sesión", error);
      } finally {
        loading.value = false; // Desactiva el spinner una vez que se complete el proceso de inicio de sesión
      }
    };

    const checkUserSession = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          cajaAbierta.value = await cajaService.getCajaAbierta();
          if (cajaAbierta.value == undefined) {
            router.push("/abrircaja");
          } else {
            router.push("/caja");
          }
        }
      } catch (error) {
        // Si hay un error (ej., no hay un usuario logeado), simplemente continuamos y mostramos la página de inicio de sesión
      }
    };

    /* onMounted(checkUserSession);  */
    onMounted(async () => {
      checkUserSession();
    });
    return {
      email,
      password,
      loading,
      login,
    };
  },
};
</script>

<style>
.container {
  height: min-content;
  align-self: center;
}
</style>
