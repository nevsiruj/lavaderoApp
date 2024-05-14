<template>
  <div class="viewport">
    <div class="card w-max m-auto p-4">
      <div class="mb-3">
        <router-link :to="'/tipoServicios'" class="text-emerald-300">&lt; Volver
          atrás
        </router-link>
      </div>
      <h1 class="font-bold">Agregar tipo de servicio</h1>
      <form>
        <div class="form-group">
          <label for="nombre" class="text-black">Nombre del tipo de servicio</label>
          <input type="text" class="
                    form-input
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-emerald-300 focus:ring focus:ring-blue-200
                  " id="nombreServicio" v-model="form.nombre" />
        </div>
        <div class="form-group">
          <label for="descripcion" class="text-black">Descripción del tipo de servicio</label>
          <input type="text" class="
                    form-input
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-emerald-300 focus:ring focus:ring-blue-200
                  " id="descripcion" v-model="form.descripcion" />
        </div>
        <button type="submit" class="
                  mt-3
                  bg-emerald-300
                  hover:bg-emerald-500
                  text-white
                  font-bold
                  py-2
                  px-4
                  rounded
                " @click.prevent="submitForm">
          Guardar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import tipoServicioService from "../../composables/api/tipoServicioService";

export default {
  setup(props) {
    const router = useRouter();
    let isAdmin = ref(false);
    let isNegativeImport = ref(false)


    let form = ref({
      id: 0,
      nombre: "",
      descripcion: ""
    });

    const agregarTipoServicio = async () => {
      console.log(form.value)
      const tipoServicio = {
        id: form.value.id,
        nombre: form.value.nombre,
        descripcion: form.value.descripcion
      };

      try {
        console.log(tipoServicio)
        await tipoServicioService.addTipoServicio(tipoServicio);
        router.push('/tipoServicios');
      } catch (error) {
        console.error(error);

      }
    };


    const editarTipoServicio = async () => {
      console.log(form.value)
      // const tipoServicio = {
      //   id: form.value.id,
      //   descripcion: form.value.descripcion,
      //   nombre: form.value.nombre,
      //   tenantId: form.value.tenantId
      // };

      try {
        await tipoServicioService.editTipoServicio(form.value.id, form.value);
        router.push('/tipoServicios');
      } catch (error) {
        console.error(error);

      }
    };

    const submitForm = async () => {
      if (form.value.nombre.trim() === '') {
        // Mostrar mensaje de error para nombre vacío
        return;
      }
      if (form.value.id == 0 || !form.value.id) {
        await agregarTipoServicio();
      } else {
        await editarTipoServicio();
      }

      form.value = {};
      form.defineComponent = '';
      form.nombre = '';
      form.descripcion = '';

      if (isAdmin.value) {
        router.push("/tipoServicios");
        return;
      }
    }





    onMounted(async () => {

      const query = router.currentRoute.value.query;
      if (query.isAdmin === 'true') {
        isAdmin.value = true;
      }
      if (query.id != null) {
        console.log(query);
        form.value.id = query.id;
        form.value = await tipoServicioService.getById(query.id);
      }



    });
    return {
      isNegativeImport,
      form,
      isAdmin,
      submitForm,
      agregarTipoServicio,
      editarTipoServicio

    };
  },
};
</script>