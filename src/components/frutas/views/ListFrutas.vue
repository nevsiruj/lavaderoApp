<template>
  <h3>Lista de Frutas</h3>

  <router-link to="/agregar">Agregar Fruta</router-link>

  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Color</th>
                  <th>Fecha de Vencimiento</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="fruta in frutas" :key="fruta.id">
                  <td>{{ fruta.id }}</td>
                  <td>{{ fruta.nombre }}</td>
                  <td>{{ fruta.color }}</td>
                  <td>
                    {{ new Date(fruta.fechaVencimiento).toLocaleDateString() }}
                  </td>
                  <td>
                    <i
                      class="m-1"
                      style="color: red"
                      class="fa fa-trash-alt"
                      aria-hidden="true"
                      @click="eliminarUsuario(fruta.id)"
                    ></i>

                    <i
                      class="fa fa-edit"
                      aria-hidden="true"
                      @click="editarUsuario(fruta.id)"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="ticket">
  
  </div>
  <a @click="print()" style="cursor: pointer"> Print </a>
</template>

<script>
import FrutaService from '../services/fruta.service.js';
import FrutaForm from './FrutaForm.vue';

const frutaService = new FrutaService();

export default {
  name: 'ListFrutas',
  props: {
    msg: String,
  },
  components: {
    FrutaForm,
  },
  created() {
    this.getData();
  },
  data() {
    return {
      frutas: [],
    };
  },
  methods: {
    getData() {
      frutaService.getFrutas().then((e) => (this.frutas = e));
    },
    eliminarUsuario() {},
    print() {
      window.print();
    },
  },
};
</script>

<style>
@page {
  size: auto;
  margin: 0;
}

.ticket {
  width: 57mm;
  height: auto;
  overflow: hidden;
}
</style>
