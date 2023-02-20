import { createWebHistory, createRouter } from 'vue-router';
import ListFrutas from './components/frutas/views/ListFrutas.vue';
import FrutaForm from './components/frutas/views/FrutaForm.vue';

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
  // { path: '/editar/:id',  component: FrutaForm, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
