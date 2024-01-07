<template>
  <nav v-if="!isLoggedIn" class="fixed text-white bg-dark fixed-top h-10 z-10">
    <div class="flex justify-between py-2 px-3">
      <router-link to="/caja">Lavadero</router-link>
      <button @click="toggleSidebar" type="button">
        <span class="inline">
          <svg class="w-5 h-5 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="Currentcolor" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </span>
      </button>
    </div>
  </nav>
  <div v-if="isOpen" class="sidebar_menu fixed top-0 right-0 px-3 py-2 text-bg-dark text-left z-50">
    <div class="flex justify-around">
      <h5 class="pr-5 font-bold">
        Tu control
      </h5>
      <button @click="toggleSidebar" type="button">
        <span class="inline">
          <svg class="w-4 h-4 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
        </span>
      </button>
    </div>
    <div>
      <ul class="navbar-nav justify-content-end flex-grow-1 mt-2 pe-3">
        <li class="my-1">
          <a class="hover:text-blue-600" aria-current="page" href="#"
            @click.prevent="navigateTo('/caja'), toggleSidebar()">Home</a>
        </li>
        <li class="my-1">
          <a class="hover:text-blue-600" aria-current="page" href="#"
            @click.prevent="navigateTo('/ingresos'), toggleSidebar()">Ingresos</a>
        </li>
        <li class="my-1">
          <a class="hover:text-blue-600" aria-current="page" href="#"
            @click.prevent="navigateTo('/egresos'), toggleSidebar()">Egresos</a>
        </li>
        <li class="my-1">
          <a class="hover:text-blue-600" aria-current="page" href="#"
            @click.prevent="navigateTo('/lavados'), toggleSidebar()">Lavados</a>
        </li>
        <li class="my-1">
          <a class="hover:text-blue-600" aria-current="page" href="#"
            @click.prevent="navigateTo('/lavadostable'), toggleSidebar()">Dashboard</a>
        </li>
        <li class="my-1">
          <a class="hover:text-blue-600" aria-current="page" href="#"
            @click.prevent="navigateTo('/servicios'), toggleSidebar()">Servicios</a>
        </li>
        <li class="my-1">
          <a class="hover:text-blue-600" aria-current="page" href="#"
            @click.prevent="navigateTo('/tipoServicios'), toggleSidebar()">Tipos de servicios</a>
        </li>
        <li class="my-1">
          <a class="hover:text-blue-600" href="#" @click.prevent="navigateTo('/'), toggleSidebar()">Cerrar
            sesion</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'SideBar',
  props: {
    isLoggedIn: Boolean,
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen
      console.log(this.isOpen)
    }
  },
  setup() {
    const router = useRouter();

    const navigateTo = (route) => {
      router.push(route);
    };

    return {
      navigateTo
    };
  },
};
</script>

<style scoped>
.sidebar_menu {
  height: 100vh;
}
</style>
