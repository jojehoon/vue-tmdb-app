import Vue from 'vue';
import App from './App';
import store from './store/index';
import router from './router/index';
import Axios from 'axios';

Vue.prototype.$axios  = Axios;

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})