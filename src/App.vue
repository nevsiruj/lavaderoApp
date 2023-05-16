<template>
  <div id="app">
    <router-view />
    <SideBar />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import ListUsuarios from './components/usuarios/views/ListUsuarios.vue';
// import CajaHome from './components/caja/CajaHome.vue';
// import AbrirCaja from './components/caja/AbrirCaja.vue';
import SideBar from './layout/SideBar.vue';

export default {
  name: 'App',
  components: {
    // CajaHome,
    // AbrirCaja,
    SideBar
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
  margin-top: 60px;
}
</style>
