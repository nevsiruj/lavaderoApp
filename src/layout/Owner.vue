<!--<template>
    <nav v-if="!isLoggedIn" class="bg-yellow-50 border-gray-200 px-2 lg:px-2 py-1  dark:bg-gray-800">
      <div class="flex justify-between py-2 px-3">
        <!-- <router-link to="/caja">Lavadero</router-link> 
        <router-link to="/owner/usuarios">
              <img src="../../src/Img/gestoflex.png" alt="Logo del Lavadero" class="h-24">
          </router-link>
        <button @click="toggleSidebar" type="button">
          <span class="inline">
            <svg class="w-5 h-5 text-gray-800 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="Currentcolor" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </span>
        </button>
      </div>
    </nav>
    <div v-if="isOpen" class="sidebar_menu fixed top-0 right-0 px-3 py-2  text-left z-50 bg-green-200">
      <div class="flex justify-around">
        <h5 class="pr-5 font-bold text-black ">
          Tu control
        </h5>
        <button @click="toggleSidebar" type="button">
          <span class="inline">
            <svg class="w-4 h-4 text-gray-800 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
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
            <a class="text-black hover:text-black" aria-current="page" href="#"
              @click.prevent="navigateTo('usuariosadmin'), toggleSidebar()"><i class="fas fa-cash-register mr-1"></i> Usuarios</a>
          </li>
          <li class="my-1">
            <a class="text-black hover:text-black" aria-current="page" href="#"
              @click.prevent="navigateTo('empresasadmin'), toggleSidebar()"><i class="fas fa-chart-line mr-1"></i> Empresa</a>
          </li>
          
          <li class="my-1">
            <a class="text-black hover:text-black" href="#" @click.prevent="navigateTo('/'), toggleSidebar()"><i class="fas fa-sign-out-alt"></i> Cerrar
              sesion</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="p-4 sm:ml-64">
   <div class="md:p-4">
         <div class="flex items-center justify-center">
            <slot></slot>
      </div>
   </div>
</div>

  </template>-->
  
  <script>
  
  </script>
  
  <style scoped>
  /*.sidebar_menu {
    height: 100vh;
  }*/
  </style>
  