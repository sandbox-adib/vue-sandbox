import { createApp } from 'vue'
import '@/assets/css/style.css'
import App from '@/App.vue'
import router from "@/router";
import { createPinia } from "pinia";
import antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import '@/assets/css/tailwind.css'

const store = createPinia()

createApp(App)
    .use(router)
    .use(antd)
    .use(store)
    .mount('#app')
