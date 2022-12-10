import { createApp } from "vue"
import App from "@/App.vue"
import "@/assets/css/main.css"
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

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    app,
    dsn: "https://b8e6f199e75f43d1973e376cf7ab0c74@o4504139249876992.ingest.sentry.io/4504140574162944",
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ["*"],
      }),
    ],
    tracesSampleRate: 1.0,
  })
}

app
  .use(router)
  .use(store)
  .use(Toast, toastOptions)
  .use(Vue3TouchEvents)
  .use(VueKonva)
  .mount("#app")
