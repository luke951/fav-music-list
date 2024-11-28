import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import vSelect from 'vue-select'
import i18n from '@/utilities/i18n';

import 'bootstrap/dist/css/bootstrap.css'
import 'vue-select/dist/vue-select.css';
import './styles/main.scss'

Vue.config.productionTip = false
Vue.config.devtools = false
Vue.config.debug = false
Vue.config.silent = true

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.component('v-select', vSelect);

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app');
