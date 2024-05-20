<template>
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
</script>