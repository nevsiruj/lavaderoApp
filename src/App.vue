<template>
  <!--<div class="bg-stone-200" id="app">
    <SideBar v-if="$route.name != 'Login'" />
    <router-view />
  </div>-->

  <!--Header Orinal  
  <div id="app">
    <SideBar v-if="$route.name != 'Login'" />
    <router-view />
  </div>-->

  <!-- <div>
  
  <router-view v-else/>
</div> -->

  <!--<div>
    <Panel v-if="role  && $route.name != 'Login'" :role="role">

      <router-view />

    </Panel>


    <router-view v-else />
  </div>-->


  <Panel v-if="role  && $route.name != 'Login'" :role="role">

<router-view />

</Panel>


<router-view v-else />

  <!-- <div>
    <Owner v-if="$route.name != 'Login'">
  
          <router-view />
        
    </Owner>  
  <router-view v-else/>
</div> -->

</template>

<script setup>
import { ref, onMounted } from 'vue';
import Panel from './layout/panel.vue';
// import Owner from './layout/owner.vue';
import authService from './composables/api/authService.js';
import { initFlowbite } from "flowbite";

const user = ref({});
const role = ref('admin'); // Asumiendo que admin es el rol por defecto

const checkUser = async () => {
  try {
    const currentUser = await authService.getCurrentUser();
    user.value = currentUser;

    // role.value = currentUser.roles[0].toLowerCase() || 'guest'; // Ajustar el rol según la respuesta del servicio
  } catch (error) {
    console.error('Error al obtener el usuario actual:', error);
    // Si hay un error (ej., no hay un usuario logeado), asignar 'guest'
    // role.value = 'guest';
  }
};

onMounted(async () => {
  await checkUser();
  // console.log(role.value)
  initFlowbite();
});
</script>

<style>
/*#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.viewport{
  display: flex;
  min-height: 100vh;
}*/
</style>



