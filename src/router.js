import { createWebHashHistory, createRouter } from 'vue-router';
import ListFrutas from './components/frutas/views/ListFrutas.vue';
import FrutaForm from './components/frutas/views/FrutaForm.vue';
import CajaHome from './components/caja/views/CajaHome.vue';
import AbrirCaja from './components/caja/views/AbrirCaja.vue';

const routes = [
  {
    path: '/',
    name: 'CajaHome',
    component: CajaHome,
  },
  {
    path: '/agregar',
    name: 'FrutaForm',
    component: FrutaForm,
  },
  // {
  //   path: '/caja',
  //   name: 'CajaHome',
  //   component: CajaHome,
  // },
  {
    path: '/abrircaja',
    name: 'AbrirCaja',
    component: AbrirCaja,
  },
  // { path: '/editar/:id',  component: FrutaForm, props: true },
];

const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
