import { createWebHistory, createRouter } from 'vue-router';
import ListFrutas from './components/frutas/views/ListFrutas.vue';
import FrutaForm from './components/frutas/views/FrutaForm.vue';
import CajaHome from './components/caja/views/CajaHome.vue';
import AbrirCaja from './components/caja/views/AbrirCaja.vue';

const routes = [
  {
    path: '/',
    name: 'ListFrutas',
    component: ListFrutas,
  },
  {
    path: '/agregar',
    name: 'FrutaForm',
    component: FrutaForm,
  },
  {
    path: '/caja',
    name: 'CajaHome',
    component: CajaHome,
  },
  {
    path: '/abrircaja',
    name: 'AbrirCaja',
    component: AbrirCaja,
  },
  // { path: '/editar/:id',  component: FrutaForm, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
