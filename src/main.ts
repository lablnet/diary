import { createApp, App as VueApp } from "vue";
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from "pinia";
import { auth } from '@/services/firebase'

// Styles.
import "@fortawesome/fontawesome-free/css/all.min.css";
import '@/assets/styles/index.css'

let app: VueApp | null = null;

auth.onAuthStateChanged((user) => {
    if (!app) {
        app = createApp(App)
        app.use(createPinia()).use(router).mount('#app')
    }
});
