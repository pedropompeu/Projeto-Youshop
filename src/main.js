import './mocks/axiosMock';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { VueMaskDirective } from 'v-mask';
import './assets/styles/style.css';

loadFonts();

const app = createApp(App);

app.directive('mask', VueMaskDirective);

app
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app');
