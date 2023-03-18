const { createApp } = require('vue');
import App from './App.vue';
import router from './router'; // <---

console.log(process.env.VUE_APP_API_URL);

createApp(App).use(router).mount('#app');
