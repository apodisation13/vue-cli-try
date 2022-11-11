import { createApp } from "vue"
import App from "@/App.vue"
import router from "@/router/router"
import store from "@/store"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import Vue3TouchEvents from "vue3-touch-events"
import VueKonva from "vue-konva"

const app = createApp(App)

const toastOptions = {
  timeout: 2000,
}

app
  .use(router)
  .use(store)
  .use(Toast, toastOptions)
  .use(Vue3TouchEvents)
  .use(VueKonva)
  .mount("#app")

console.log(process.env.VUE_APP_TRY1, "ПЕРЕМЕННАЯ!")
console.log(process.env.VUE_APP_API_URL, "ИМЯ СЕРВЕРА")
console.log(process.env)
