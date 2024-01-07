<template>
  <div class="viewport">
    <div class="card w-max m-auto p-4">
      <div class="mb-3">
        <router-link :to="'/categorias'" class="text-blue-500">&lt; Volver
          atrás
        </router-link>
      </div>
      <h1 class="font-bold">Agregar tipo de servicio</h1>
      <form>
        <div class="form-group">
          <label for="descripcion" class="text-black">Nombre del tipo de servicio</label>
          <input type="text" class="
                    form-input
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-blue-500 focus:ring focus:ring-blue-200
                  " id="descripcion" v-model="form.nombreServicio" />
        </div>
        <button type="submit" class="
                  mt-3
                  bg-blue-600
                  hover:bg-blue-500
                  text-white
                  font-bold
                  py-2
                  px-4
                  rounded
                " @click.prevent="agregarTipoServicio">
          Guardar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup(props) {
    const router = useRouter();
    let isAdmin = ref(false);
    let isNegativeImport = ref(false)

    let form = ref({
      id: 0,
    });

    const agregarTipoServicio = () => {
      const tipoServicio = {
        descripcion: descripcion.value
      }
    }

    const submitForm = async () => {
      if (form.value.costo < 1) {
        isNegativeImport.value = true
        return
      }
    };
    onMounted(async () => {
    });

    return {
      isNegativeImport,
      form,
      isAdmin,
      submitForm,
      agregarTipoServicio,
    };
  },
};
</script>