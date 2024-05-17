<template>
  <div class="viewport w-fit mx-auto">
    <h1 class="text-3xl font-semibold mb-6 " >Dashboard de Ventas</h1>
    <form>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label class="block mb-2">Fecha inicio:</label>
          <input type="date" class="form-control border-emerald-300" v-model="fechaInicio" />
        </div>
        <div>
          <label class="block mb-2">Fecha fin:</label>
          <input type="date" class="form-control border-emerald-300 px-4" v-model="fechaFin" />
        </div>
        <div class="flex items-end">
          <button
            type="button"
            class="mt-4 bg-emerald-300 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded"
            @click="filtrar"
          >
            Filtrar
          </button>
        </div>
      </div>
      <ul class="nav nav-tabs mb-2 border-none " id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link rounded-md active text-black hover:bg-emerald-400"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Home
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link rounded-md text-black hover:bg-emerald-400"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            E/R
          </button>
        </li>
      </ul>
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
            <h2 class="text-xl font-semibold">Cantidad Ventas</h2>
            <p class="text-3xl">{{ totalLavados }}</p>
          </div>
          <div
            class="bg-white rounded-lg p-4 shadow"
            @click="mostrarTotalFacturado()"
          >
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
          <div
            class="bg-white rounded-lg p-4 shadow"
            @click="mostrarTotalFacturado()"
          >
            <h2 class="text-xl font-semibold">Total Facturado</h2>
            <p class="text-3xl">{{ totalFacturado }}</p>
          </div>
          <div
            class="bg-white rounded-lg p-4 shadow"
            @click="mostrarTotalGastos()"
          >
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
  <!-- -->
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    :class="{ hidden: !mostrarVentanaDetalle }"
  >
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
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
            class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            @click="mostrarVentanaDetalle = false"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Ventana emergente para el detalle del KPI -->
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    :class="{ hidden: !mostrarImportesTotales }"
  >
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="overflow-x-scroll">
            <table
              class="table table-responsive table-hover table-striped table-sm overflow-x-auto"
            >
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Responsable</th>
                  <th>Descripción</th>
                  <th>Importe</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lavado in lavados" :key="lavado.id">
                  <td>
                    {{ lavado.fecha }}
                  </td>
                  <td>{{ lavado.responsable }}</td>
                  <td>{{ lavado.descripcion }}</td>
                  <td>{{ Number(lavado.importe) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-right" @click="mostrarTotalFacturado()">
            <h2 class="mt-2 mr-2 text-lg font-semibold">Total: {{ totalFacturado }}$</h2>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="mostrarImportesTotales = false"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    :class="{ hidden: !mostrarGastos }"
  >
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <table
            class="table table-responsive table-hover table-striped table-sm"
          >
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Importe</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="gasto in gastos" :key="gasto.id">
                <td>
                  {{ gasto.fechaRegistro }}
                </td>
                <td>{{ gasto.descripcion }}</td>
                <td>{{ Number(gasto.importe) }}</td>
              </tr>
            </tbody>
          </table>
          <div class="text-right">
            <p class="mt-2 mr-2 text-lg font-semibold">Total: {{ totalGastos }}$</p>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
              @click="mostrarGastos = false"
            >
              Cerrar
            </button>
          </div>
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
import Chart from "chart.js/auto";
import { reactive, onMounted, ref } from "vue";
import adminService from "../../composables/api/adminService.js";

export default {
  setup() {
    let mostrarVentanaDetalle = ref(false);
    let kpiSeleccionado = ref(null);
    let detalleKPI = ref("");
    let lavados = ref([]);
    let ingresos = ref([]);
    let egresos = ref([]);
    let beneficioNeto = ref(0);
    let totalLavados = ref(0);
    let totalIngresos = ref(0);
    let totalEgresos = ref(0);
    let fechaInicio = ref("");
    let fechaFin = ref("");
    let totalGastos = ref(0);
    let gastos = ref([]);
    let totalFacturado = ref(0);
    let mostrarImportesTotales = ref(false);
    let mostrarGastos = ref(false);

    const filtrar = async () => {
      let datos = await adminService.getDatosPorFecha(
        fechaInicio.value,
        fechaFin.value
      );
      beneficioNeto.value = datos.beneficioNeto;
      totalLavados.value = datos.cantidadLavados;
      totalIngresos.value = datos.totalIngresos;
      totalEgresos.value = datos.totalEgresos;
      lavados.value = datos.lavados;
      ingresos.value = datos.ingresos;
      egresos.value = datos.egresos;
      totalGastos.value = datos.totalGastos;
      gastos.value = datos.gastos;
      totalFacturado.value = datos.totalFacturado;
      console.log(datos);

      formatearLavados();

      mostrarGrafico();

      if (totalLavados.value > 0) {
        const boxSelect = document.querySelector("#boxSelect");
        boxSelect.classList.add("boxs");
      }
    };
    const formatearLavados = () => {
      lavados.value = lavados.value.map((lavado) => {
        return {
          ...lavado,
          fecha: formatearFecha(lavado.fecha),
        };
      });
      gastos.value = gastos.value.map((gasto) => {
        return {
          ...gasto,
          fechaRegistro: formatearFecha(gasto.fechaRegistro),
        };
      });
    };
    const formatearFecha = (fecha) => {
      return `${fecha.split("T")[0].split("-")[2]}/${
        fecha.split("T")[0].split("-")[1]
      }/${fecha.split("T")[0].split("-")[0]}`;
    };

    const obtenerDetalleKPI = (kpi) => {
      const fechaInicioFormateada = formatearFecha(fechaInicio.value);
      const fechaFinFormateada = formatearFecha(fechaFin.value);

      if (kpi === "totalLavados") {
        return `La cantidad de lavados realizados entre ${fechaInicioFormateada} y ${fechaFinFormateada} es de ${totalLavados.value}.`;
      } else if (kpi === "ingresos") {
        return `Los ingresos entre ${fechaInicioFormateada} y ${fechaFinFormateada} son de $${totalIngresos.value}.`;
      } else if (kpi === "egresos") {
        return `Los egresos entre ${fechaInicioFormateada} y ${fechaFinFormateada} son de $${totalEgresos.value}.`;
      } else if (kpi === "beneficioNeto") {
        return `El beneficio neto entre ${fechaInicioFormateada} y ${fechaFinFormateada} es de $${beneficioNeto.value}.`;
      }
    };
    const mostrarTotalFacturado = () => {
      if (lavados.value != 0) {
        mostrarImportesTotales.value = true;
      }
    };
    const mostrarTotalGastos = () => {
      if (gastos.value != 0) {
        mostrarGastos.value = true;
      }
    };
    const mostrarDetalle = (kpi) => {
      kpiSeleccionado.value = kpi;

      // Asigna el detalle del KPI seleccionado a la variable detalleKPI
      detalleKPI.value = obtenerDetalleKPI(kpi); // Función ficticia para obtener el detalle del KPI
      if (totalLavados.value > 0) {
        mostrarVentanaDetalle.value = true;
        return;
      }
    };
    const datosGrafico = () => {
      const lavadosAgrupados = lavados.value.reduce((acumulador, lavado) => {
        const fecha = lavado.fecha;

        if (acumulador[fecha]) {
          acumulador[fecha] += 1;
        } else {
          acumulador[fecha] = 1;
        }

        return acumulador;
      }, {});
      let cantLavados = lavados.value.length;
      return {
        labels: Object.keys(lavadosAgrupados),
        datasets: [
          {
            label: "Cantidad de lavados",
            data: Object.values(lavadosAgrupados),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };
    };

    const mostrarGrafico = () => {
      const ctx = document.getElementById("chart").getContext("2d");
      const existingChart = Chart.getChart("chart");

      if (existingChart) {
        existingChart.destroy();
      }
      console.log(datosGrafico());
      new Chart(ctx, {
        type: "line",
        data: datosGrafico(),
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };
    onMounted(() => {});

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
      totalFacturado,
      mostrarImportesTotales,
      mostrarTotalFacturado,
      formatearLavados,
      mostrarGastos,
      mostrarTotalGastos,
    };
  },
  name: "LavadosTable",
  props: {},
  components: {},
  created() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
