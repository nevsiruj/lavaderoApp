import { createWebHistory, createRouter } from 'vue-router';
import Caja from './components/caja/Caja.vue';
import Cajas from './components/admin/Cajas.vue';
import AbrirCaja from './components/caja/AbrirCaja.vue';
import CerrarCaja from './components/caja/CerrarCaja.vue';
import FormLavado from './components/lavado/FormLavado.vue';
import ListLavadosCaja from './components/lavado/ListLavadosCaja.vue';
import Lavados from './components/admin/Lavados.vue';
import Ingresos from './components/admin/Ingresos.vue';
import Egresos from './components/admin/Egresos.vue';
import FormEgreso from './components/egreso/FormEgreso.vue';
import ListEgreso from './components/egreso/ListEgreso.vue';
import FormIngreso from './components/ingreso/FormIngreso.vue';
import ListIngreso from './components/ingreso/ListIngreso.vue';
import Dashboard from './components/admin/Dashboard.vue';
import LavadosTable from './components/admin/LavadosTable.vue';
import Login from './components/login/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/caja',
    name: 'Caja',
    component: Caja,
  },
  {
    path: '/Cajas',
    name: 'Cajas',
    component: Cajas,
  },
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
    path: '/ListLavadosCaja',
    name: 'ListLavadosCaja',
    component: ListLavadosCaja,
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
    path: '/lavados',
    name: 'Lavados',
    component: Lavados,
  },
  // {
  //   path: '/lavados/editar/:id',
  //   component: FormLavado,
  // },
  {
    path: '/ingresos',
    name: 'Ingresos',
    component: Ingresos,
  },
  {
    path: '/egresos',
    name: 'Egresos',
    component: Egresos,
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
