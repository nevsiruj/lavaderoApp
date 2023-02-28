<template>
  <div>
    <h1>Lavados diarios</h1>
    <form>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Fecha inicio:</label>
        <div class="col-sm-4">
          <input type="date" class="form-control" v-model="fechaInicio" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Fecha fin:</label>
        <div class="col-sm-4">
          <input type="date" class="form-control" v-model="fechaFin" />
        </div>
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-primary" @click="filtrar">
          Filtrar
        </button>
      </div>
    </form>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Día</th>
          <th>Lavados</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(lavado, index) in lavadosFiltrados" :key="index">
          <td>{{ lavado.fecha }}</td>
          <td>{{ lavado.lavados }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Total:</th>
          <th>{{ totalLavados }}</th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lavados: [], // Aquí se almacenarán los datos cargados del archivo JSON
      fechaInicio: '', // Aquí se almacenará la fecha de inicio seleccionada por el usuario
      fechaFin: '', // Aquí se almacenará la fecha de fin seleccionada por el usuario
    };
  },
  computed: {
    lavadosFiltrados() {
      // Aquí se filtran los datos según las fechas seleccionadas por el usuario
      return this.lavados.filter(
        (lavado) =>
          lavado.fecha >= this.fechaInicio && lavado.fecha <= this.fechaFin
      );
    },
    totalLavados() {
      // Aquí se calcula el total de lavados de los días filtrados
      return this.lavadosFiltrados.reduce(
        (total, lavado) => total + lavado.lavados,
        0
      );
    },
  },
  methods: {
    filtrar() {
      // Simulamos los datos de lavados para los últimos tres meses
      const hoy = new Date();
      const tresMesesAntes = new Date();
      tresMesesAntes.setMonth(hoy.getMonth() - 3);

      const lavados = [];
      let fechaActual = new Date(tresMesesAntes);

      while (fechaActual <= hoy) {
        const lavadosDelDia = Math.floor(Math.random() * 200) + 50;
        lavados.push({
          fecha: fechaActual.toISOString().slice(0, 10),
          lavados: lavadosDelDia,
        });
        fechaActual.setDate(fechaActual.getDate() + 1);
      }

      // Actualizamos la propiedad "lavados" con los datos simulados
      this.lavados = lavados;
    },
  },
};
</script>
