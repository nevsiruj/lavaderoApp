<template>
    <div class="viewport">
        <div class="m-auto rounded-lg py-2 px-2">
            <div class="flex justify-end">
                <div class="flex justify-end items-center space-x-4 my-4">
                    <router-link :to="{ path: '/formServicios' }"
                        class="btn btn-base btn-success flex items-center space-x-2">
                        <i class="fas fa-plus-circle"></i>
                        <span>Agregar Servicio</span>
                    </router-link>
                    <button class="btn btn-base btn-primary flex items-center space-x-2">
                        <i class="fas fa-sync-alt"></i>
                        <span>Actualizar</span>
                    </button>
                </div>

                <div v-if="showMessage" class="bg-green-100 text-green-800 px-4 py-2 rounded-md mt-2">
                    <i class="fas fa-check-circle mr-1"></i> Actualizados
                </div>
            </div>
            <div class="bg-emerald-300 rounded-lg overflow-hidden shadow-lg mx-auto mt-4 w-fit">
                <table class="divide-y divide-gray-300">
                    <thead class="bg-emerald-300">
                        <tr>
                            <th class="px-6 py-3 text-sm text-gray-700 uppercase tracking-wider whitespace-nowrap">
                                Nombre
                            </th>
                            <th class="px-6 py-3 text-sm text-gray-700 uppercase tracking-wider">
                                Descripción
                            </th>
                            <th class="px-6 py-3 text-sm text-gray-700 uppercase tracking-wider">
                                Precio
                            </th>
                            <th class="px-6 py-3 text-sm text-gray-700 uppercase tracking-wider">
                                Tipo Servicio
                            </th>
                            <th class="px-6 py-3 text-sm text-gray-700 uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200 text-left">
                        <tr v-for="servicio in servicios" :key="servicio.id">
                            <td class="px-6 py-3 whitespace-nowrap text-lg">{{ servicio.nombre }}</td>
                            <td class="px-6 py-3 whitespace-nowrap text-lg">{{ servicio.descripcion }}</td>
                            <td class="px-6 py-3 whitespace-nowrap text-lg">{{ servicio.precio }}</td>
                            <td class="px-6 py-3 whitespace-nowrap text-lg">{{ servicio.tipoServicio }}</td>
                            <td class="px-6 py-3 whitespace-nowrap text-lg">
                                <div class="flex space-x-4">
                                    <button class="text-blue-600 hover:text-blue-800 focus:outline-none text-xl"
                                        @click="editarServicio(servicio)">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button class="text-red-600 hover:text-red-800 focus:outline-none text-xl"
                                        @click="deleteServicio(servicio.id)">
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

import { ref, onMounted } from "vue";
import servicioService from "../../composables/api/servicioService.js";
import { useRouter, useRoute } from "vue-router";
import ModalConfirmar from "../modalConfirmar/ModalConfirmar.vue";
import tipoServicioService from "../../composables/api/tipoServicioService";


export default {
    name: 'servicios',
    setup() {
        const servicios = ref([]);
        const tiposServicio = ref([]);
        const showMessage = ref(false);
        // const modalComponent = ref(null);
        const modal = ref()
        const router = useRouter();



        const editarServicio = (servicio) => {
            router.push({
                path: 'formServicios',
                query: { isAdmin: false, id: servicio.id },
            });
        };


        const deleteServicio = async (ServicioId) => {
            try {

                await servicioService.removeServicio(ServicioId);
                servicios.value = await servicioService.getAllServicio();
            } catch (error) {
                console.error(error);
            }
            fetchServicios(),
                fetchTipoServicios()
        };

        const fetchServicios = async () => {
            try {
                servicios.value = await servicioService.getAllServicio();
            } catch (error) {
                console.error(error);
            }
        };
        const fetchTipoServicios = async () => {
            try {
                tiposServicio.value = await tipoServicioService.getAllTipoServicio();
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(() => {
            fetchServicios();
            fetchTipoServicios();
        });

        const openModal = async (id) => {
            const servicio = servicios.value.find(s => s.id === id);
            modal.value = modalComponent({
                servicio,
                onClose: () => {
                    modal.value = null;
                },
            });
        };

        return {
            servicios,
            showMessage,
            fetchServicios,
            modal,
            openModal,
            editarServicio,
            deleteServicio,
            fetchTipoServicios
        };
    },
};
</script>
<style></style>