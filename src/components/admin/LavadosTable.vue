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
        @click="mostrarDetalle('cantidadLavados')"
      >
        <h2 class="text-xl font-semibold">Cantidad Lavados</h2>
        <p class="text-3xl">{{ totalLavados }}</p>
      </div>

      <div class="bg-white rounded-lg p-4 shadow">
        <h2 class="text-xl font-semibold">Ingresos</h2>
        <p class="text-3xl">{{ ingresos }}</p>
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
export default {
  data() {
    return {
      lavados: [], // Aquí se almacenarán los datos cargados del archivo JSON
      fechaInicio: '',
      fechaFin: '',
      ingresos: 0,
      egresos: 0,
      gastos: 0,
      beneficioNeto: 0,
      mostrarVentanaDetalle: false,
      kpiSeleccionado: null,
      detalleKPI: '',
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
      this.detalleKPI = obtenerDetalleKPI(kpi); // Función ficticia para obtener el detalle del KPI

      this.mostrarVentanaDetalle = true;
    },
  },
};
</script>
