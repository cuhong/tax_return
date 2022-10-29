import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"; // 추가
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import LoadScript from 'vue-plugin-load-script';
import axios from 'axios'
import { createVueKakaoSdk } from 'vue3-kakao-sdk'
const {VITE_KAKAO_APP_KEY} = import.meta.env;
import store from './store';
import Vue3Storage from "vue3-storage";
import {StorageType} from "vue3-storage";


const app = createApp(App)
app.config.globalProperties.axios = axios;

app.use(store).use(
    Vue3Storage, { namespace: "allfee_", storage: StorageType.Local }
).use(router).use(LoadScript).use(createVueKakaoSdk(VITE_KAKAO_APP_KEY)).mount('#app')

