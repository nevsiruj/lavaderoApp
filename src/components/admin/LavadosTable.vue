<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-semibold mb-6">Dashboard de Lavados</h1>
    <form>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label class="block mb-2">Fecha inicio:</label>
          <input type="date" class="form-control" v-model="fechaInicio" />
        </div>
        <div>
          <label class="block mb-2">Fecha fin:</label>
          <input type="date" class="form-control" v-model="fechaFin" />
        </div>
        <div class="flex items-end">
          <button
            type="button"
            class="
              bg-blue-500
              text-white
              font-semibold
              px-6
              py-3
              w-full
              sm:w-auto
            "
            @click="filtrar"
          >
            Filtrar
          </button>
        </div>
      </div>
    </form>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        class="bg-white rounded-lg p-4 shadow"
        id="boxSelect"
        @click="mostrarDetalle('cantidadLavados')"
      >
        <h2 class="text-xl font-semibold">Cantidad Lavados</h2>
        <p class="text-3xl">{{ totalLavados }}</p>
      </div>

      <div class="bg-white rounded-lg p-4 shadow">
        <h2 class="text-xl font-semibold">Ingresos</h2>
        <p class="text-3xl">{{ totalIngresos }}</p>
      </div>
      <div class="bg-white rounded-lg p-4 shadow">
        <h2 class="text-xl font-semibold">Egresos</h2>
        <p class="text-3xl">{{ egresos }}</p>
      </div>
      <div class="bg-white rounded-lg p-4 shadow">
        <h2 class="text-xl font-semibold">Gastos</h2>
        <p class="text-3xl">{{ gastos }}</p>
      </div>
      <div class="bg-white rounded-lg p-4 shadow">
        <h2 class="text-xl font-semibold">Beneficio Neto</h2>
        <p class="text-3xl">{{ beneficioNeto }}</p>
      </div>
    </div>
  </div>

  <!-- Ventana emergente para el detalle del KPI -->
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    :class="{ hidden: !mostrarVentanaDetalle }"
  >
    <div
      class="
        flex
        items-center
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block sm:p-0
      "
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="
          inline-block
          align-bottom
          bg-white
          rounded-lg
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
        "
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ kpiSeleccionado }}
          </h3>
          <div class="mt-5">
            <p class="text-gray-700">{{ detalleKPI }}</p>
          </div>

          <!-- %%%% -->
          <div class="bg-white shadow-md rounded-md p-6">
            <canvas id="chart"></canvas>
          </div>
          <!-- %%%% -->
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="
              mt-3
              w-full
              inline-flex
              justify-center
              rounded-md
              border border-transparent
              shadow-sm
              px-4
              py-2
              bg-blue-600
              text-base
              font-medium
              text-white
              hover:bg-blue-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-blue-500
              sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
            "
            @click="mostrarVentanaDetalle = false"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.boxs {
  box-shadow: 0px 0px 5px 5px rgba(64, 132, 244, 0.5) !important;
  -webkit-box-shadow: 0px 0px 5px 5px rgba(64, 132, 244, 0.5) !important;
  -moz-box-shadow: 0px 0px 5px 5px rgba(64, 132, 244, 0.5) !important;
}
.kpi-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 20px;
}

.kpi-box {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 20px;
  width: 180px;
  margin: 10px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.kpi-box h3 {
  font-size: 16px;
  margin-bottom: 10px;
}

.kpi-box p {
  font-size: 24px;
  font-weight: bold;
}
</style>

<script>
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      // lavados: [], // Aquí se almacenarán los datos cargados del archivo JSON
      fechaInicio: '',
      fechaFin: '',
      ingresos: 0,
      egresos: 0,
      gastos: 0,
      beneficioNeto: 0,
      mostrarVentanaDetalle: false,
      kpiSeleccionado: null,
      detalleKPI: '',
      lavados: [
        { fecha: '2022-04-01', cantidad: 20 },
        { fecha: '2022-04-02', cantidad: 15 },
        { fecha: '2022-04-03', cantidad: 30 },
        { fecha: '2022-04-04', cantidad: 25 },
        { fecha: '2022-04-05', cantidad: 40 },
        { fecha: '2022-04-06', cantidad: 35 },
        { fecha: '2022-04-07', cantidad: 50 },
        { fecha: '2022-04-08', cantidad: 45 },
        { fecha: '2022-04-09', cantidad: 60 },
        { fecha: '2022-04-10', cantidad: 55 },
        { fecha: '2022-04-11', cantidad: 70 },
        { fecha: '2022-04-12', cantidad: 65 },
        { fecha: '2022-04-13', cantidad: 80 },
        { fecha: '2022-04-14', cantidad: 75 },
        { fecha: '2022-04-15', cantidad: 90 },
        { fecha: '2022-04-16', cantidad: 85 },
        { fecha: '2022-04-17', cantidad: 100 },
        { fecha: '2022-04-18', cantidad: 95 },
        { fecha: '2022-04-19', cantidad: 110 },
        { fecha: '2022-04-20', cantidad: 105 },
        { fecha: '2022-04-21', cantidad: 120 },
        { fecha: '2022-04-22', cantidad: 115 },
        { fecha: '2022-04-23', cantidad: 130 },
        { fecha: '2022-04-24', cantidad: 125 },
        { fecha: '2022-04-25', cantidad: 140 },
        { fecha: '2022-04-26', cantidad: 135 },
        { fecha: '2022-04-27', cantidad: 150 },
        { fecha: '2022-04-28', cantidad: 145 },
        { fecha: '2022-04-29', cantidad: 160 },
        { fecha: '2022-04-30', cantidad: 155 },
      ],
      ingresos: [
        { fecha: '2022-04-01', importe: 100 },
        { fecha: '2022-04-02', importe: 150 },
      ],
      lavadosFiltrados: [],
      ingresosFiltrados: [],
    };
  },
  mounted() {},
  computed: {
    datosGrafico() {
      return {
        labels: this.lavadosFiltrados.map((lavado) => lavado.fecha),
        datasets: [
          {
            label: 'Cantidad de lavados',
            data: this.lavadosFiltrados.map((lavado) => lavado.cantidad),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };
    },

    totalLavados() {
      // Aquí se calcula el total de lavados de los días filtrados
      return this.lavadosFiltrados.reduce(
        (total, lavado) => total + lavado.cantidad,
        0
      );
    },

    totalIngresos() {
      // Aquí se calcula el total de ingresos de los dias filtrados
      return this.ingresosFiltrados.reduce(
        (total, ingreso) => total + ingreso.importe,
        0
      );
    },
  },
  methods: {
    filtrar() {
      
      this.lavadosFiltrados = this.lavados.filter(
        (lavado) =>
          lavado.fecha >= this.fechaInicio && lavado.fecha <= this.fechaFin
      );
      this.mostrarGrafico();

      if (this.totalLavados > 0) {
      const boxSelect = document.querySelector('#boxSelect');
      boxSelect.classList.add('boxs');
      }

    },

    obtenerDetalleKPI(kpi) {
      if (kpi === 'cantidadLavados') {
        return `La cantidad de lavados realizados entre ${this.fechaInicio} y ${this.fechaFin} es de ${this.totalLavados}.`;
      } else if (kpi === 'ingresos') {
        return `Los ingresos entre ${this.fechaInicio} y ${this.fechaFin} son de $${this.ingresos}.`;
      } else if (kpi === 'egresos') {
        return `Los egresos entre ${this.fechaInicio} y ${this.fechaFin} son de $${this.egresos}.`;
      } else if (kpi === 'gastos') {
        return `Los gastos entre ${this.fechaInicio} y ${this.fechaFin} son de $${this.gastos}.`;
      } else if (kpi === 'beneficioNeto') {
        return `El beneficio neto entre ${this.fechaInicio} y ${this.fechaFin} es de $${this.beneficioNeto}.`;
      }
    },
    mostrarDetalle(kpi) {
      this.kpiSeleccionado = kpi;

      // Asigna el detalle del KPI seleccionado a la variable detalleKPI
      this.detalleKPI = this.obtenerDetalleKPI(kpi); // Función ficticia para obtener el detalle del KPI

      if (this.totalLavados > 0) {
        this.mostrarVentanaDetalle = true;
        return;
      }
    },
    mostrarGrafico() {
      const ctx = document.getElementById('chart').getContext('2d');
      const existingChart = Chart.getChart('chart');

      if (existingChart) {
        existingChart.destroy();
      }

      new Chart(ctx, {
        type: 'line',
        data: this.datosGrafico,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
};
</script>
