import { createApp } from "vue"
import App from "@/App.vue"
import router from "@/router/router"
import store from "@/store"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import Vue3TouchEvents from "vue3-touch-events"
import VueKonva from "vue-konva"
import * as Sentry from "@sentry/vue"
import { BrowserTracing } from "@sentry/tracing"

const app = createApp(App)

const toastOptions = {
  timeout: 2000,
}

Sentry.init({
  app,
  dsn: "https://b8e6f199e75f43d1973e376cf7ab0c74@o4504139249876992.ingest.sentry.io/4504140574162944",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      // tracingOrigins: ["localhost", "card-game.ru", /^\//],
      tracingOrigins: ["*"],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

app
  .use(router)
  .use(store)
  .use(Toast, toastOptions)
  .use(Vue3TouchEvents)
  .use(VueKonva)
  .mount("#app")

console.log(process.env.VUE_APP_TRY1, "ПЕРЕМЕННАЯ!")
console.log(process.env.VUE_APP_API_URL, "ИМЯ СЕРВЕРА")
