import { createWebHistory, createRouter } from 'vue-router';
import Caja from './components/caja/Caja.vue';
import AbrirCaja from './components/caja/AbrirCaja.vue';
import CerrarCaja from './components/caja/CerrarCaja.vue';
import FormLavado from './components/lavado/FormLavado.vue';
import ListLavado from './components/lavado/ListLavado.vue';
import FormEgreso from './components/egreso/FormEgreso.vue';
import ListEgreso from './components/egreso/ListEgreso.vue';
import FormIngreso from './components/ingreso/FormIngreso.vue';
import ListIngreso from './components/ingreso/ListIngreso.vue';
import Dashboard from './components/admin/Dashboard.vue';
import LavadosTable from './components/admin/LavadosTable.vue';

const routes = [
  {
    path: '/',
    name: 'Caja',
    component: Caja,
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
  {
    path: '/formlavado',
    name: 'FormLavado',
    component: FormLavado,
  },
  {
    path: '/listlavado',
    name: 'ListLavado',
    component: ListLavado,
  },
  {
    path: '/formegreso',
    name: 'FormEgreso',
    component: FormEgreso,
  },
  {
    path: '/listegreso',
    name: 'ListEgreso',
    component: ListEgreso,
  },
  {
    path: '/formingreso',
    name: 'FormIngreso',
    component: FormIngreso,
  },
  {
    path: '/listingreso',
    name: 'ListIngreso',
    component: ListIngreso,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/lavadostable',
    name: 'LavadosTable',
    component: LavadosTable,
  },
  {
    path: '/cerrarcaja',
    name: 'CerrarCaja',
    component: CerrarCaja,
  },

  // { path: '/editar/:id',  component: FrutaForm, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
