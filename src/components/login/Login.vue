<template>
  <div class="viewport">
    <div class="card shadow-md p-4">
      <h2 class="font-bold">Iniciar sesión</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="block mb-2" for="email">Correo Electrónico:</label>
          <input class="p-2" type="email" id="email" v-model="email" required />
        </div>
        <div class="mb-3">
          <label class="block mb-2" for="password">Contraseña:</label>
          <input class="p-2" type="password" id="password" v-model="password" required />
        </div>
        <button class="bg-blue-600 hover:bg-blue-500 p-2 rounded-md text-white" @click="handleLogin" type="submit">Iniciar
          Sesión</button>
      </form>
    </div>
  </div>
</template>

<script>
import authService from '../../composables/api/authService.js';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import cajaService from '../../composables/api/cajaService.js';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const cajaAbierta = ref({});

    const login = async () => {
      try {
        const response = await authService.login(email.value, password.value);
        if (response.token) {
          // Redireccionar a la página después del inicio de sesión exitoso
          cajaAbierta.value = await cajaService.getCajaAbierta();
          console.log(cajaAbierta.value)
          if (cajaAbierta.value == undefined) {
            router.push('/abrircaja');
          }
          else {
            router.push('/caja');
          }
        } else {
          console.error('Inicio de sesión fallido');
        }
      } catch (error) {
        console.error('Error de inicio de sesión', error);
      }
    };

    const checkUserSession = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          cajaAbierta.value = await cajaService.getCajaAbierta();
          console.log(cajaAbierta.value)
          if (cajaAbierta.value == undefined) {
            router.push('/abrircaja');
          }
          else {
            router.push('/caja');
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
      login,
    };
  }
};
</script>

<style>
.container {
  height: min-content;
  align-self: center;
}
</style>
