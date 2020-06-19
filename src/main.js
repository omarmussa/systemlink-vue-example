import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import axios from './plugins/axios'
import './plugins/bootstrap-vue'
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

//prevent tip on startup per 
Vue.config.productionTip = false

//using BootstrapVue for ease of use
Vue.use(BootstrapVue)

//syntactic sugar for configuring $http so that you don't need to configure it on each call
Vue.prototype.$http = axios;

new Vue({
  render: h => h(App),
}).$mount('#app')
