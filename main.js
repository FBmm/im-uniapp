import App from './App'
import * as Pinia from 'pinia';
import { createSocket } from '@/utils/ws';

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
createSocket();
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  createSocket();
  const app = createSSRApp(App)
  app.use(Pinia.createPinia());
  return {
    app,
	Pinia
  }
}
// #endif