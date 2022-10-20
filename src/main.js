import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"; // 추가
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import LoadScript from 'vue-plugin-load-script';


createApp(App).use(router).use(LoadScript).mount('#app')

