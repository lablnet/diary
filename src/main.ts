import { createApp, App as VueApp } from "vue";
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { auth } from '@/services/firebase'

import '@/assets/styles/index.css'

let app: VueApp | null = null;

auth.onAuthStateChanged((user) => {
    if (!app) {
        app = createApp(App);
        app.use(router).mount('#app')
    }
});
