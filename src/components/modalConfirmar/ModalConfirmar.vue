<!-- <template>
    <div class="modal" tabindex="-1" id="modalDelete">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Eliminar {{ message }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
                </div>
                <div class="modal-body">
                    <p>Desea eliminar este {{ message }}?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" data-bs-dismiss="modal">
                        <span class="btn btn-secondary">Cancelar</span>
                    </button>
                    <button type="button" @click="confirmar()">
                        <span class="btn btn-primary">Confirmar</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted, emit } from 'vue';
import { Modal, } from 'bootstrap';

export default {
    props: {
        message: {
            type: String,
            required: true
        }, required: true

    },
    setup(props, { emit }) {
        onMounted(async () => {
            console.log("modal mount")
        });
        const id = ref(0)
        const confirmar = () => {

            emit('confirm', id.value);
        };
        const getModal = (Id) => {
            id.value = Id;
            const modal = document.querySelector('#modalDelete');
            const option = {
                keyboard: false,
                backdrop: true
            };
            const myModal = new Modal(modal, option);

            return myModal;
        };



        return {
            getModal,
            confirmar,
            id

        };
    }
};
</script> -->


<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden w-96">
            <div class="px-6 py-4 border-b border-gray-200">
                <h5 class="text-xl font-medium">Eliminar {{ message }}</h5>
                <button @click="closeModal" class="text-gray-500 hover:text-gray-700 focus:outline-none absolute top-3 right-3">X</button>
            </div>
            <div class="px-6 py-4">
                <p>¿Desea eliminar este {{ message }}?</p>
            </div>
            <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-2">
                <button @click="closeModal" class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Cancelar</button>
                <button @click="confirmar" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Confirmar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    props: {
        message: {
            type: String,
            required: true
        }
    },
    setup(props, { emit }) {
        const isVisible = ref(false);
        const id = ref(0);

        const confirmar = () => {
            emit('confirm', id.value);
            closeModal();
        };

        const getModal = (Id) => {
            id.value = Id;
            isVisible.value = true;
        };

        const closeModal = () => {
            isVisible.value = false;
        };

        return {
            isVisible,
            getModal,
            confirmar,
            closeModal
        };
    }
};
</script>





