<template>
    <div class="viewport">
        <Modal message="agenda" @confirm="deleteLavado" ref="modalComponent" />
        <div class="m-auto rounded-lg py-2 px-2">
            <div class="flex justify-end">
                <div class="flex items-center space-x-2">
                    <!--, query: { isAdmin: true } }"> -->
                    <router-link :to="{ path: '/formagenda' }" class="btn btn-base btn-success my-2 mr-1">
                        <i class="fas fa-plus-circle mr-1"></i> Agregar Agenda
                    </router-link>
                    <button class="btn btn-base btn-primary my-2">
                        <i class="fas fa-sync-alt"></i> Actualizar
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
          Cliente
        </th>
        <th class="px-6 py-3 text-sm text-gray-700 uppercase tracking-wider">
          Whatsapp
        </th>
        <th class="px-6 py-3 text-sm text-gray-700 uppercase tracking-wider">
          Fecha
        </th>
        <th class="px-6 py-3 text-sm text-gray-700 uppercase tracking-wider"></th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200 text-left">
      <tr v-for="agenda in agendas" :key="agenda.id">
        <td class="px-6 py-3 whitespace-nowrap text-lg">{{ agenda.cliente }}</td>
        <td class="px-6 py-3 whitespace-nowrap text-lg">{{ agenda.whatsapp }}</td>
        <td class="px-6 py-3 whitespace-nowrap text-lg">{{ agenda.fecha }}</td>
        <td class="px-6 py-3 whitespace-nowrap text-lg">
          <div class="flex space-x-4">
            <button class="text-blue-600 hover:text-blue-800 focus:outline-none text-xl" @click="editarAgenda(agenda)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="text-red-600 hover:text-red-800 focus:outline-none text-xl" @click="deleteAgenda(agenda.id)">
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
import agendaService from "../../composables/api/agendaService";
import { useRouter, useRoute } from "vue-router";
import ModalConfirmar from "../modalConfirmar/ModalConfirmar.vue";


export default {
    name: 'agendas',
    setup() {
        const agendas = ref([]);
        const showMessage = ref(false);        
        // const modalComponent = ref(null);
        const modal = ref()
        const router = useRouter();   

        

        const editarAgenda = (agenda) => {
            router.push({
                path: 'formAgenda',
                query: { isAdmin: false, id: agenda.id },
            });
        };


        const deleteAgenda = async (AgendaId) => {
            try {

                await agendaService.removeAgenda(AgendaId);
                agendas.value = await agendaService.getAllAgenda();
            } catch (error) {
                console.error(error);
            }
            fetchAgendas()
        };

        const fetchAgendas = async () => {
            try {
                agendas.value = await agendaService.getAllAgenda();
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(() => {
            fetchAgendas();
        });

        const openModal = async (id) => {
            const agenda = agendas.value.find(s => s.id === id);
            modal.value = modalComponent({
                agenda,
                onClose: () => {
                    modal.value = null;
                },
            });
        };

        return {
            agendas,
            showMessage,
            fetchAgendas,
            modal,
            openModal,
            editarAgenda,
            deleteAgenda
        };
    },
};
</script>
<style></style>