<template>
  <div class="grid grid-flow-row gap-4">
    <div class="flex justify-center min-height-auto">
      <h1
        class="text-3xl text-center font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl"
      >
        Dashboard de Ventas
      </h1>
    </div>
    <div
      class="flex flex-row justify-center align-center min-height-auto gap-3 px-2"
    >
      <!--Fechas y flitro-->

      <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <input
            type="date"
            v-model="fechaInicio"
            class="form-control block px-2 py-2 border border-gray-300 rounded-md text-gray-700 bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="date"
            v-model="fechaFin"
            class="form-control block px-2 py-2 border border-gray-300 rounded-md text-gray-700 bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <button
            :disabled="!fechaInicio || !fechaFin"
            type="button"
            @click="filtrar"
            class="focus:outline-none text-white bg-[#3edfa9] hover:bg-[#ffe068] focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Filtrar
          </button>
        </div>
      </div>
      <!--Fechas y flitro-->
    </div>
    <!--Spiner-->

    <div v-if="noDataFound">
      <ul class="max-w-lg space-y-2 list-inside dark:text-gray-400">
        <li class="flex items-center text-red-500 font-semibold">
          <svg
            class="w-5 h-5 mr-2 text-red-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          No se encontraron datos para el rango de fechas seleccionado.
        </li>
      </ul>
    </div>

    <div v-if="!fechaInicio || !fechaFin">
      <ul class="max-w-md space-y-2 list-inside dark:text-gray-400">
        <li class="flex items-start text-red-500 font-semibold">
          <svg
            class="w-5 h-5 mr-2 text-red-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Seleccione un fecha de inicio y final para continuar.
        </li>
      </ul>
    </div>
    <template v-if="isLoading">
      <ul class="max-w-md text-gray-500 list-inside dark:text-gray-400">
        <li class="flex items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              class="w-6 h-6 me-2 text-gray-300 font-md animate-spin dark:text-gray-600 fill-green-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Cargando...</span>
          </div>
          Cargando datos ...
        </li>
      </ul>
    </template>
    <!--Spiner-->

    <div class="mb-4 border-b border-gray-200">
      <ul
        class="flex flex-wrap -mb-px text-md font-medium text-center"
        id="default-tab"
        data-tabs-toggle="#default-tab-content"
        role="tablist"
        
      >
        <li class="me-2" role="presentation">
          <button
            class="inline-block p-4 border-b-2 text-green-600 hover:text-green-900 hover:border-green-600"
            id="profile-tab"
            data-tabs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Inicio
          </button>
        </li>
        <li class="me-2" role="presentation">
          <button
            class="inline-block p-4 border-b-2 border-t-green-600 text-green-600 hover:text-green-900"
            id="dashboard-tab"
            data-tabs-target="#dashboard"
            type="button"
            role="tab"
            aria-controls="dashboard"
            aria-selected="false"
          >
            General
          </button>
        </li>
      </ul>
    </div>

    <div id="default-tab-content">
      <div
        class="hidden p-4"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-4 gap-3">
          <!--Inicio Card-->
          <div
            class="max-w-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
            data-tooltip-target="tooltip1"
          >
            <a href="#" id="boxSelect" @click="mostrarDetalle('totalLavados')">
              <h2 class="text-lg font-semibold">Cantidad Ventas</h2>
              <p class="text-3xl">{{ totalLavados }}</p>
            </a>
          </div>
          <div
            id="tooltip1"
            role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Click para mas detalle
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <!--Fin Card-->

          <!--Inicio Card-->
          <div
            class="max-w-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
            data-tooltip-target="tooltip2"
          >
            <a href="#" @click="mostrarTotalFacturado()">
              <h2 class="text-lg font-semibold">Total Facturado</h2>
              <p class="text-3xl">{{ totalFacturado }}</p>
            </a>
          </div>
          <div
            id="tooltip2"
            role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Click para mas detalle
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <!--Fin Card-->

          <!--Inicio Card-->
          <div
            class="max-w-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
          >
            <a>
              <h2 class="text-lg font-semibold">Ingresos</h2>
              <p class="text-3xl">{{ totalIngresos }}</p>
            </a>
          </div>

          <!--Fin Card-->

          <!--Inicio Card-->
          <div
            class="max-w-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
          >
            <a>
              <h2 class="text-lg font-semibold">Egresos</h2>
              <p class="text-3xl">{{ totalEgresos }}</p>
            </a>
          </div>
          <!--Fin Card-->
        </div>
      </div>

      <div
        class="hidden p-4"
        id="dashboard"
        role="tabpanel"
        aria-labelledby="dashboard-tab"
      >
      <div class="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-4 gap-3">
          <!--Inicio Card-->
          <div
            class="max-w-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
            data-tooltip-target="tooltip3"
          >
            <a href="#" id="boxSelect" @click="mostrarTotalFacturado()">
              <h2 class="text-lg font-semibold">Total facturado</h2>
              <p class="text-3xl">{{ totalFacturado }}</p>
            </a>
          </div>
          <div
            id="tooltip3"
            role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Click para mas detalle
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <!--Fin Card-->

          <!--Inicio Card-->
          <div
            class="max-w-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
            data-tooltip-target="tooltip4"
          >
            <a href="#" @click="mostrarTotalGastos()">
              <h2 class="text-lg font-semibold">Gastos</h2>
              <p class="text-3xl">{{ totalGastos }}</p>
            </a>
          </div>
          <div
            id="tooltip4"
            role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Click para mas detalle
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
          <!--Fin Card-->

          <!--Inicio Card-->
          <div
            class="max-w-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
            
          >
            <a >
              <h2 class="text-lg font-semibold">Beneficio Neto</h2>
              <p class="text-3xl">{{ beneficioNeto }}</p>
            </a>
          </div>
          <!--Fin Card-->
          </div>
        
      </div>
    </div>
  </div>
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

          <div class="bg-white shadow-md rounded-md p-6">
            <canvas id="chart"></canvas>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#3edfa9] text-base font-medium text-white hover:bg-[#ffe068] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            @click="mostrarVentanaDetalle = false"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--Ventana emergente para el detalle del KPI //Comentario-->
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
            <h2 class="mt-2 mr-2 text-lg font-semibold">
              Total: {{ totalFacturado }}$
            </h2>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#3edfa9] text-base font-medium text-white hover:bg-[#ffe068]"
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
            <p class="mt-2 mr-2 text-lg font-semibold">
              Total: {{ totalGastos }}$
            </p>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#3edfa9] text-base font-medium text-white hover:bg-[#ffe068]"
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

/*.container {
  width: 800px;
  margin: auto;
  margin-top: 20px;
}
.lbl-menu label {
  display: inline-block;
  padding: 20px;
  color: #000000;
  cursor: pointer;
  transition: all 400ms ease;
}
.lbl-menu label:hover {
  color: #3edfa9;
}
.content {
  margin-bottom: 200px;
  position: relative;
}
.content div {
  position: absolute;
  line-height: 1.8;
  /*transition: all 600ms ease;
  opacity: 0;
  visibility: hidden;
  transform: scale(0.9);
  padding: 30px;
  background: #fff;
  padding-bottom: 40px;
}
#radio1,
#radio2 {
  display: none;
}
#radio1:checked ~ .tab1,
#radio2:checked ~ .tab2 {
  margin-top: 10px;
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}
.content div:after {
  position: absolute;
  content: "";
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid transparent;
  border-bottom: 10px solid #fff;
  bottom: 100%;
  left: 28px;
}
.content .tab2:after {
  left: 122px;
}*/


</style>

<script>
import Chart from "chart.js/auto";
import { computed, reactive, onMounted, ref } from "vue";
import adminService from "../../composables/api/adminService.js";
import { initFlowbite } from "flowbite";


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
    let isLoading = ref(false);
    let noDataFound = ref();

    /*const filtrar = async () => {
      isLoading.value = true;
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

      formatearLavados();

      mostrarGrafico();

      if (totalLavados.value > 0) {
        const boxSelect = document.querySelector("#boxSelect");
        boxSelect.classList.add("boxs");
      }
      isLoading.value = false;
    };*/

    const filtrar = async () => {
      isLoading.value = true;
      let datos = await adminService.getDatosPorFecha(
        fechaInicio.value,
        fechaFin.value
      );

      if (datos.lavados.length === 0) {
        //alert("No se encontraron datos para el rango de fechas seleccionado.");
        noDataFound.value = true;
      } else {
        noDataFound.value = false;
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

        formatearLavados();

        mostrarGrafico();

        if (totalLavados.value > 0) {
          const boxSelect = document.querySelector("#boxSelect");
          boxSelect.classList.add("boxs");
        }
      }

      isLoading.value = false;
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
    onMounted(() => {
      initFlowbite();
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
      totalFacturado,
      mostrarImportesTotales,
      mostrarTotalFacturado,
      formatearLavados,
      mostrarGastos,
      mostrarTotalGastos,
      isLoading,
      noDataFound,
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
