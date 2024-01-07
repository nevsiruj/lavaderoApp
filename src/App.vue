<template>
  <div class="bg-stone-200" id="app">
    <SideBar v-if="$route.name != 'Login'" />
    <router-view />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
// import ListUsuarios from './components/usuarios/views/ListUsuarios.vue';
// import CajaHome from './components/caja/CajaHome.vue';
// import AbrirCaja from './components/caja/AbrirCaja.vue';
import SideBar from "./layout/SideBar.vue";

export default {
  name: "App",
  components: {
    // CajaHome,
    // AbrirCaja,
    SideBar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.viewport{
  display: flex;
  min-height: 100vh;
}
</style>
