<template>
    <div class="viewport">
        <div class="m-auto rounded-lg py-2 px-2">
            <div class="flex justify-center">
                <div class="flex items-center space-x-2">
                    <!--, query: { isAdmin: true } }"> -->
                    <router-link :to="{ path: '/formServicios' }" class="btn btn-sm btn-success my-2 mr-1">
                        <i class="fas fa-plus-circle mr-1"></i> Agregar Servicio
                    </router-link>
                    <button class="btn btn-sm btn-primary my-2">
                        <i class="fas fa-sync-alt"></i> Actualizar
                    </button>
                </div>
                <div v-if="showMessage" class="bg-green-100 text-green-800 px-4 py-2 rounded-md mt-2">
                    <i class="fas fa-check-circle mr-1"></i> Actualizados
                </div>
            </div>
            <div class="bg-white rounded-lg overflow-hidden shadow-md mx-auto mt-1 w-min">
                <table class="divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-3 py-2 text-xs text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Tipo de servicio
                            </th>
                            <th class="px-2 py-1 text-xs text-gray-500 uppercase tracking-wider">
                                Costo
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200 text-left">
                        <tr v-for="servicio in servicios">
                            <td class="px-3 py-1 whitespace-nowrap">{{ servicio.tipoDeServicio }}</td>
                            <td class="px-3 py-1 whitespace-nowrap">${{ servicio.costo }}</td>
                            <td class="px-3 py-1 whitespace-nowrap">
                                <div class="flex space-x-2">
                                    <button class="text-blue-600 hover:text-blue-800 focus:outline-none"
                                        @click="editLavado(servicio)">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="text-red-600 hover:text-red-800 focus:outline-none"
                                        @click="openModal(servicio.id)">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue'

export default {
    name: 'servicios',
    setup() {
        const servicios = ref([]);
        const showMessage = ref(false);
        // const modalComponent = ref(null);
        const modal = ref()

        const fetchServicios = async () => {
            try {
                servicios.value = [
                    { id: 1,tipoDeServicio: 'lavado', costo: 2000 },
                    { id: 2,tipoDeServicio: 'encerado', costo: 5000 },
                    { id: 3,tipoDeServicio: 'full service', costo: 6000 },
                ]
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(() => {
            fetchServicios();
        });

        return {
            servicios,
            showMessage,
            fetchServicios,
            modal
        };
    },
};
</script>
<style></style>