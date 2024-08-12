import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './assets/style.css'

loadFonts()

const app = createApp(App)

app
  .use(router)
  .use(store)
  .use(vuetify)


app.mount('#app')


if (process.env.MODE === "development"){
  const { worker } = require("@/mocks/worker");
  worker.start();
}