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
import Servicios from './components/servicios/Servicios.vue'
import FormServicios from './components/servicios/FormServicios.vue'
import TipoServicios from './components/TipoServicios/TipoServicio.vue'
import FormTipoServicio from './components/TipoServicios/FormTipoServicio.vue'
import FormAgenda from './components/agenda/FormAgenda.vue'
import Agenda from './components/agenda/Agenda.vue'
import FormUsuarios from './components/usuarios/FormUsuarios.vue'
import Usuarios from './components/usuarios/Usuarios.vue'
import UsuariosAdmin from './components/owner/usuarios/UsuariosAdmin.vue'
import FormUsuariosAdmin from './components/owner/usuarios/FormUsuariosAdmin.vue' 
import EmpresasAdmin from './components/owner/empresas/EmpresasAdmin.vue'
import FormEmpresasAdmin from './components/owner/empresas/FormEmpresasAdmin.vue'




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
    path: '/vistageneral',
    name: 'vistageneral',
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
    path: '/servicios',
    name: 'Servicios',
    component: Servicios,
  },
  {
    path: '/tipoServicios',
    name: 'TipoServicios',
    component: TipoServicios,
  },
  {
    path: '/formServicios',
    name: 'FormServicios',
    component: FormServicios,
  },
  {
    path: '/formTipoServicio',
    name: 'FormTipoServicio',
    component: FormTipoServicio,
  },
  {
    path: '/cerrarcaja',
    name: 'CerrarCaja',
    component: CerrarCaja,
  },
  {
    path: '/formAgenda',
    name: 'FormAgenda',
    component: FormAgenda,
  },
  {
    path: '/agenda',
    name: 'Agenda',
    component: Agenda,
  },
  {
    path: '/formUsuarios',
    name: 'FormUsuarios',
    component: FormUsuarios,
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: Usuarios,
  },
  // {
  //   path: '/owner',
  //   name: 'OwnerIndex',
  //   component: OwnerIndex,
  // },
  {
    path: '/owner/usuariosAdmin',
    name: 'UsuariosApp',
    component: UsuariosAdmin,
  },
  {
    path: '/owner/formUsuariosAdmin',
    name: 'FormUsuariosApp',
    component: FormUsuariosAdmin,
  },
  {
    path: '/owner/empresasAdmin',
    name: 'EmpresasApp',
    component: EmpresasAdmin,
  },
  {
    path: '/owner/formEmpresasAdmin',
    name: 'FormEmpresasApp',
    component: FormEmpresasAdmin,
  },
  // { path: '/editar/:id',  component: FrutaForm, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  base: '/',
  routes,
});

export default router;
