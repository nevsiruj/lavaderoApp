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
        v-for="(caja, index) in cajas"
        :key="index"
        @click="mostrarInfo(caja)"
        class="py-4 cursor-pointer"
      >
        <div class="text-sm">
          <p class="font-medium text-gray-900">
            {{ caja.fechaApertura.substring(0, 10) }}
          </p>
          Ver Detalles
          <i class="fas fa-plus-circle mr-1"></i>
        </div>
      </li>
    </ul>

    <!--Modal-->
    <div
      v-if="cajaSeleccionada"
      class="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block sm:p-0
        "
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="cajaSeleccionada = null"
        ></div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

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
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Caja del {{ cajaSeleccionada.fechaApertura.substring(0, 10) }}
                </h3>
                <div class="mt-5">
                  <ul>
                    <li>
                      Fecha Apertura:
                      {{ cajaSeleccionada.fechaApertura.substring(0, 10) }}
                    </li>
                    <li>Responsable: {{ cajaSeleccionada.responsable }}</li>
                    <li>Saldo Inicial: {{ cajaSeleccionada.montoInicial }}</li>
                    <li>
                      Ingresos: {{ cajaSeleccionada.totalImporteIngresos }}
                    </li>
                    <li>Egresos: {{ cajaSeleccionada.totalImporteEgresos }}</li>
                    <!-- <li>Lavados: {{ cajaSeleccionada.lavados }}</li> -->
                    <li>
                      Cantidad de Lavados:
                      {{ cajaSeleccionada.cantidadLavados }}
                    </li>
                    <li>
                      Efectivo en Terminal:
                      {{ cajaSeleccionada.efectivoEnCaja }}
                    </li>
                    <li>Declarado: {{ cajaSeleccionada.efectivoDeclarado }}</li>
                    <li>
                      Descuadre:
                      {{
                        cajaSeleccionada.efectivoDeclarado -
                        cajaSeleccionada.efectivoEnCaja
                      }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="
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
                sm:ml-3 sm:w-auto sm:text-sm
              "
              @click="cajaSeleccionada = null"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import adminService from '../../composables/api/adminService.js';

export default {
  setup() {
    const cajas = ref([]);

    const fechaDesde = ref('');
    const fechaHasta = ref('');
    const cajaSeleccionada = ref(null);

    const filtrarCajas = async () => {
      cajas.value = await adminService.getCajasPorFecha(
        fechaDesde.value,
        fechaHasta.value
      );
    };

    function mostrarInfo(caja) {
      cajaSeleccionada.value = {
        ...caja,
        descuadre: caja.declarado - caja.efectivoTerminal,
      };
    }
    watch(fechaHasta, () => {
      filtrarCajas();
    });

    return {
      cajas,
      fechaDesde,
      fechaHasta,
      cajaSeleccionada,
      mostrarInfo,
      filtrarCajas,
    };
  },
  name: 'CajasAdmin',
  props: {},
  components: {},
};
</script>
