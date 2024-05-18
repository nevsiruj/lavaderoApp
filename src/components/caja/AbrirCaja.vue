<template>
  <div class="viewport">
    <form class="w-10/12 m-auto" @submit.prevent="abrirCaja">
      <h2>Abrir caja</h2>
      <div class="mb-3">
        <label for="responsable" class="form-label">Responsable:</label>
        <select class="form-control" id="responsable" v-model="formData.responsable" required>
          <option disabled value="">Seleccione una opción</option>
          <option v-for="responsable in responsables" :key="responsable.id" :value="responsable.nombre">
            {{ responsable.nombre }}
          </option>
        </select>
        <label for="turno" class="form-label">Turno:</label>
        <select class="form-control" id="turno" v-model="formData.turno" required>
          <option disabled value="">Seleccione una opción</option>
          <option v-for="turno in turnos" :key="turno.id" :value="turno.value">
            {{ turno.nombre }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="monto" class="form-label">Monto de apertura:</label>
        <input type="number" class="form-control" id="monto" v-model="formData.montoInicial" required />
      </div>
      <button type="submit" class="
          bg-emerald-300
          hover:bg-emerald-600
          text-white
          font-semibold
          py-2
          px-4
          rounded
        ">
        Abrir caja
      </button>
    </form>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import cajaService from '../../composables/api/cajaService.js';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'AbrirCaja',
  setup() {
    const router = useRouter();
    const route = useRoute();

    const formData = reactive({
      responsable: '',
      turno: '',
      montoInicial: '',
    });

    const responsables = reactive([
      { id: 1, nombre: 'Responsable 1' },
      { id: 2, nombre: 'Responsable 2' },
    ]);

    const turnos = reactive([
      { id: 1, nombre: 'Turno 1', value: 1 },
      { id: 2, nombre: 'Turno 2', value: 2 },
    ]); 

    const abrirCaja = async () => {
      try {
        console.log(
          'Abriendo caja con responsable',
          formData.responsable,
          'en el turno',
          formData.turno,
          'y monto',
          formData.montoInicial
        );

        await cajaService.abrirCaja(formData).then((e) => {
          console.log(e);
          // Reiniciamos los valores del formulario
          formData.responsable = '';
          formData.montoInicial = null;
          formData.turno = '';
          router.push('/caja');
        }).catch((error) => {
          console.error("Error al abrir la caja:", error);
          // Aquí puedes mostrar un mensaje de error en la UI si es necesario
        });
      } catch (error) {
        console.error("Error inesperado:", error);
      }
    };


    onMounted(() => { });

    return {
      formData,
      responsables,
      turnos,
      abrirCaja,
    };
  },
};
</script>

<style>
/* Estilos de Bootstrap */
</style>
