<template>
  <nav class="navbar navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Offcanvas dark navbar</router-link>
      <!-- ... (otros elementos no relacionados con la navegación se mantienen igual) ... -->
      <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar"
        aria-labelledby="offcanvasDarkNavbarLabel">
        <!-- ... (otros elementos no relacionados con la navegación se mantienen igual) ... -->
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <router-link class="nav-link active" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/ingresos">Ingresos</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/egresos">Egresos</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/lavados">Lavados</router-link>
            </li>
            <!-- Puedes cambiar otros enlaces de la misma manera si tienen rutas en tu aplicación -->
            <!-- ... (otros elementos no relacionados con la navegación se mantienen igual) ... -->
          </ul>
          <!-- ... (otros elementos no relacionados con la navegación se mantienen igual) ... -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'SideBar',
  props: {
    msg: String,
  },
  setup() {
    const router = useRouter();

    const navigateToIndex = () => {
      router.push('/');
    };

    return {
      navigateToIndex,
    };
  },
};
</script>

<style scoped></style>
