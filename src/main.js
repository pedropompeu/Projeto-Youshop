import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './assets/style.css'
console.log('ERROOOOOOO');

loadFonts()

const app = createApp(App)

app
  .use(router)
  .use(store)
  .use(vuetify)


app.mount('#app')


if (import.meta.env.MODE === 'development') {
  const { worker } = require('@/mocks/browser')
  worker.start()
}
