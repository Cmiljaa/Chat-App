import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import './firebase/firebaseInit';
import ToastPlugin from 'vue-toast-notification';

const app = createApp(App);

app.use(router);

app.use(createPinia());

app.use(ToastPlugin);

app.mount('#app')
