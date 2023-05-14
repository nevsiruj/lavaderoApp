<template>
  <div>
    <div class="mb-5">
      <label for="desde" class="block mb-2">Desde:</label>
      <input
        type="date"
        id="desde"
        v-model="fechaDesde"
        class="border-2 rounded px-3 py-2"
      />
    </div>
    <div class="mb-5">
      <label for="hasta" class="block mb-2">Hasta:</label>
      <input
        type="date"
        id="hasta"
        v-model="fechaHasta"
        class="border-2 rounded px-3 py-2"
      />
    </div>
    <ul class="divide-y divide-gray-200">
      <li
        v-for="(caja, index) in cajasFiltradas"
        :key="index"
        @click="mostrarInfo(caja)"
        class="py-4 cursor-pointer"
      >
        <div class="text-sm">
          <p class="font-medium text-gray-900">
            {{ caja.fecha }}
          </p>
        </div>
      </li>
    </ul>
    <div v-if="cajaSeleccionada" class="mt-5">
      <h2 class="text-xl font-semibold mb-3">
        Caja del {{ cajaSeleccionada.fecha }}
      </h2>
      <ul>
        <li>Saldo Inicial: {{ cajaSeleccionada.saldoInicial }}</li>
        <li>Ingresos: {{ cajaSeleccionada.ingresos }}</li>
        <li>Egresos: {{ cajaSeleccionada.egresos }}</li>
        <li>Lavados: {{ cajaSeleccionada.lavados }}</li>
        <li>Cantidad de Lavados: {{ cajaSeleccionada.cantidadLavados }}</li>
        <li>Efectivo en Terminal: {{ cajaSeleccionada.efectivoTerminal }}</li>
        <li>Declarado: {{ cajaSeleccionada.declarado }}</li>
        <li>Descuadre: {{ cajaSeleccionada.descuadre }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const cajas = ref([
      {
        fecha: '2023-05-01',
        saldoInicial: 1000,
        ingresos: 500,
        egresos: 300,
        lavados: 20,
        cantidadLavados: 10,
        efectivoTerminal: 1200,
        declarado: 1100,
      },
      {
        fecha: '2023-05-02',
        saldoInicial: 1100,
        ingresos: 600,
        egresos: 200,
        lavados: 25,
        cantidadLavados: 12,
        efectivoTerminal: 1500,
        declarado: 1400,
      },
    ]);

    const fechaDesde = ref('');
    const fechaHasta = ref('');
    const cajaSeleccionada = ref(null);

    const cajasFiltradas = computed(() => {
      return cajas.value.filter((caja) => {
        const fechaCaja = new Date(caja.fecha);
        const desde = fechaDesde.value ? new Date(fechaDesde.value) : null;
        const hasta = fechaHasta.value ? new Date(fechaHasta.value) : null;

        if (desde && hasta) {
          return fechaCaja >= desde && fechaCaja <= hasta;
        } else if (desde) {
          return fechaCaja >= desde;
        } else if (hasta) {
          return fechaCaja <= hasta;
        } else {
          return true;
        }
      });
    });

    function mostrarInfo(caja) {
      cajaSeleccionada.value = {
        ...caja,
        descuadre: caja.declarado - caja.efectivoTerminal,
      };
    }

    return {
      cajas,
      fechaDesde,
      fechaHasta,
      cajaSeleccionada,
      cajasFiltradas,
      mostrarInfo,
    };
  },
};
</script>
