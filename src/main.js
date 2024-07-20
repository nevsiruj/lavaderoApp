const { createApp } = require('vue');
import App from './App.vue';
import router from './router'; // <---
//import '../node_modules/flowbite/dist/flowbite'

createApp(App).use(router).use(process.env).mount('#app');
