import './assets/main.css'
import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(router)
app.use(Toast)

app.use(autoAnimatePlugin).mount('#app')
