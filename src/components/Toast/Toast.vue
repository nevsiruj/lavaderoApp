<template>
    <div class="toast-container top-0 end-0 p-3">
       <div
         class="toast top-0 end-0 align-items-center text-bg-danger border-0"
         role="alert"
         aria-live="assertive"
         aria-atomic="true"
       >
         <div class="d-flex">
           <div class="toast-body">{{message}}</div>
           <button
             type="button"
             class="btn-close btn-close-white me-2 m-auto"
             data-bs-dismiss="toast"
             aria-label="Close"
           ></button>
         </div>
       </div>
     </div>
        
   </template>
   
   <script>
   import { ref, onMounted} from 'vue';
   import { Toast } from 'bootstrap';
   
   export default {
     props: {
       message: {
         type: String,
         required: true
       }
     },
     setup(props) {
       onMounted(async () => {
         console.log("toast mount")
       });
   
       const getToast = () => {
         const toastElList = document.querySelectorAll('.toast');
         const option = {
           animation: true,
           autohide: true,
           delay: 2000,
         };
         const toastList = [...toastElList].map(
           (toastEl) => new bootstrap.Toast(toastEl, option)
         );
         console.log(toastList);
         return toastList;
       };
   
       return {
         getToast
       };
     }
   };
   </script>