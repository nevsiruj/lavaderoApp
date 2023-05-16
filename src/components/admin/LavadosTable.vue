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
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          </ul>
          
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">E/R</button>
  </li>
    </form>
    

    <!-- <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> -->
      <div class="tab-content">
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabindex="0"
        >
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <div
            class="bg-white rounded-lg p-4 shadow"
            id="boxSelect"
            @click="mostrarDetalle('totalLavados')"
          >
            <h2 class="text-xl font-semibold">Cantidad Lavados</h2>
            <p class="text-3xl">{{ totalLavados }}</p>
          </div>
          <div class="bg-white rounded-lg p-4 shadow">
            <h2 class="text-xl font-semibold">Total Facturado</h2>
            <p class="text-3xl">{{ totalFacturado }}</p>
          </div>
          <div class="bg-white rounded-lg p-4 shadow">
            <h2 class="text-xl font-semibold">Ingresos</h2>
            <p class="text-3xl">{{ totalIngresos }}</p>
          </div>
          <div class="bg-white rounded-lg p-4 shadow">
            <h2 class="text-xl font-semibold">Egresos</h2>
            <p class="text-3xl">{{ totalEgresos }}</p>
          </div>
        </div>
        </div>
        <div
          class="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
          tabindex="0"
        >
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div class="bg-white rounded-lg p-4  shadow">
            <h2 class="text-xl font-semibold">Total Facturado</h2>
            <p class="text-3xl">{{ totalFacturado }}</p>
          </div>
          <div class="bg-white rounded-lg p-4  shadow">
            <h2 class="text-xl font-semibold">Gastos</h2>
            <p class="text-3xl">{{ totalGastos }}</p>
          </div>
          <div class="bg-white rounded-lg p-4 shadow">
            <h2 class="text-xl font-semibold">Beneficio Neto</h2>
            <p class="text-3xl">{{ beneficioNeto }}</p>
          </div>
          </div>
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
import { reactive, onMounted, ref } from 'vue';
import adminService from '../../composables/api/adminService.js';


export default {
  setup() {
    let mostrarVentanaDetalle = ref(false)
    let kpiSeleccionado= ref(null)
    let detalleKPI=ref('')
    let lavados=ref([])
    let ingresos= ref([])
    let egresos= ref([])
    let beneficioNeto=ref(0)
    let totalLavados=ref(0)
    let totalIngresos=ref(0)
    let totalEgresos=ref(0)
    let fechaInicio = ref("")
    let fechaFin = ref("")
    let totalGastos= ref(0)
    let gastos= ref([])
    let totalFacturado= ref(0)

    const filtrar = async () => {
      let datos= await adminService.getDatosPorFecha(fechaInicio.value,fechaFin.value)
      beneficioNeto.value= datos.beneficioNeto
      totalLavados.value = datos.cantidadLavados
      totalIngresos.value= datos.totalIngresos
      totalEgresos.value = datos.totalEgresos
      lavados.value=datos.lavados
      ingresos.value=datos.ingresos
      egresos.value=datos.egresos
      totalGastos.value= datos.totalGastos
      gastos.value=datos.gastos
      totalFacturado.value= datos.totalFacturado
      console.log(datos)

      mostrarGrafico();

      if (totalLavados.value > 0) {
        const boxSelect = document.querySelector('#boxSelect');
        boxSelect.classList.add('boxs');
      }
    }

    const obtenerDetalleKPI = (kpi) => {
      if (kpi === 'totalLavados') {
        return `La cantidad de lavados realizados entre ${fechaInicio.value.split("T")[0]} y ${fechaFin.value.split("T")[0]} es de ${totalLavados.value}.`;
      } else if (kpi === 'ingresos') {
        return `Los ingresos entre ${fechaInicio.value} y ${fechaFin.value} son de $${totalIngresos.value}.`;
      } else if (kpi === 'egresos') {
        return `Los egresos entre ${fechaInicio.value} y ${tfechaFin.value} son de $${totalEgresos.value}.`;
      // } else if (kpi === 'gastos') {
      //   return `Los gastos entre ${this.fechaInicio} y ${this.fechaFin} son de $${this.gastos}.`;
      } else if (kpi === 'beneficioNeto') {
        return `El beneficio neto entre ${fechaInicio.value} y ${fechaFin.value} es de $${beneficioNeto.value}.`;
      }
    }
    const mostrarDetalle =(kpi) => {
      kpiSeleccionado.value = kpi;

      // Asigna el detalle del KPI seleccionado a la variable detalleKPI
     detalleKPI.value = obtenerDetalleKPI(kpi); // Función ficticia para obtener el detalle del KPI
      if (totalLavados.value > 0) {
        mostrarVentanaDetalle.value = true;
        return;
      }
    }
    const datosGrafico = () => {
              const lavadosAgrupados = lavados.value.reduce((acumulador, lavado) => {
          const fecha = lavado.fecha.split('T')[0];

          if (acumulador[fecha]) {
            acumulador[fecha] += 1;
          } else {
            acumulador[fecha] = 1;
          }

          return acumulador;
        }, {});
      let cantLavados= lavados.value.length
        return {
          labels: Object.keys(lavadosAgrupados),
          datasets: [
            {
              label: 'Cantidad de lavados',
              data: Object.values(lavadosAgrupados),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        };
    }
    
    const mostrarGrafico= () => {
      const ctx = document.getElementById('chart').getContext('2d');
      const existingChart = Chart.getChart('chart');

      if (existingChart) {
        existingChart.destroy();
      }
      console.log(datosGrafico())
      new Chart(ctx, {
        type: 'line',
        data: datosGrafico(),
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
    onMounted(() => {

    });

    return {
      fechaInicio,
      fechaFin,
      mostrarVentanaDetalle,
      kpiSeleccionado,
      detalleKPI,
      lavados,
      ingresos,
      egresos,
      beneficioNeto,
      totalLavados,
      totalIngresos,
      totalEgresos,
      datosGrafico,
      mostrarGrafico,
      mostrarDetalle,
      obtenerDetalleKPI,
      filtrar,
      totalGastos,
      gastos,
      totalFacturado

    };
  },
  name: 'LavadosTable',
  props: {},
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
};









// export default {
//   data() {
//     return {
//       // lavados: [], // Aquí se almacenarán los datos cargados del archivo JSON
//       fechaInicio: '',
//       fechaFin: '',
//       ingresos: 0,
//       egresos: 0,
//       gastos: 0,
//       beneficioNeto: 0,
//       mostrarVentanaDetalle: false,
//       kpiSeleccionado: null,
//       detalleKPI: '',
//       lavados: [],
//       ingresos: [
//         { fecha: '2023-04-01', importe: 100 },
//         { fecha: '2023-04-02', importe: 150 },
//       ],
//       lavadosFiltrados: [],
//       ingresosFiltrados: [],
//     };
//   },
//   mounted() {},
//   computed: {
//     datosGrafico() {
//       return {
//         labels: this.lavadosFiltrados.map((lavado) => lavado.fecha),
//         datasets: [
//           {
//             label: 'Cantidad de lavados',
//             data: this.lavadosFiltrados.map((lavado) => lavado.cantidad),
//             fill: false,
//             borderColor: 'rgb(75, 192, 192)',
//             tension: 0.1,
//           },
//         ],
//       };
//     },

//     totalLavados() {
//       // Aquí se calcula el total de lavados de los días filtrados
//       return this.lavadosFiltrados.reduce(
//         (total, lavado) => total + lavado.cantidad,
//         0
//       );
//     },

//     totalIngresos() {
//       // Aquí se calcula el total de ingresos de los dias filtrados
//       return this.ingresosFiltrados.reduce(
//         (total, ingreso) => total + ingreso.importe,
//         0
//       );
//     },
//   },
//   methods: {
//     filtrar() {
//       this.lavadosFiltrados = this.lavados.filter(
//         (lavado) =>
//           lavado.fecha >= this.fechaInicio && lavado.fecha <= this.fechaFin
//       );
//       this.mostrarGrafico();

//       if (this.totalLavados > 0) {
//         const boxSelect = document.querySelector('#boxSelect');
//         boxSelect.classList.add('boxs');
//       }
//     },

//     obtenerDetalleKPI(kpi) {
//       if (kpi === 'cantidadLavados') {
//         return `La cantidad de lavados realizados entre ${this.fechaInicio} y ${this.fechaFin} es de ${this.totalLavados}.`;
//       } else if (kpi === 'ingresos') {
//         return `Los ingresos entre ${this.fechaInicio} y ${this.fechaFin} son de $${this.ingresos}.`;
//       } else if (kpi === 'egresos') {
//         return `Los egresos entre ${this.fechaInicio} y ${this.fechaFin} son de $${this.egresos}.`;
//       } else if (kpi === 'gastos') {
//         return `Los gastos entre ${this.fechaInicio} y ${this.fechaFin} son de $${this.gastos}.`;
//       } else if (kpi === 'beneficioNeto') {
//         return `El beneficio neto entre ${this.fechaInicio} y ${this.fechaFin} es de $${this.beneficioNeto}.`;
//       }
//     },
//     mostrarDetalle(kpi) {
//       this.kpiSeleccionado = kpi;

//       // Asigna el detalle del KPI seleccionado a la variable detalleKPI
//       this.detalleKPI = this.obtenerDetalleKPI(kpi); // Función ficticia para obtener el detalle del KPI

//       if (this.totalLavados > 0) {
//         this.mostrarVentanaDetalle = true;
//         return;
//       }
//     },
//     mostrarGrafico() {
//       const ctx = document.getElementById('chart').getContext('2d');
//       const existingChart = Chart.getChart('chart');

//       if (existingChart) {
//         existingChart.destroy();
//       }

//       new Chart(ctx, {
//         type: 'line',
//         data: this.datosGrafico,
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//             },
//           },
//         },
//       });
//     },
//   },
// };
</script>
