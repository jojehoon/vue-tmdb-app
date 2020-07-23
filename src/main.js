import Vue from "vue";
import App from "./App";
import store from "./store/index";
import router from "./router/index";
import Axios from "axios";
// import PerfectScrollbar from 'vue2-perfect-scrollbar';
import VueCustomScrollbar from "vue-custom-scrollbar";
import "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css";

Vue.config.productionTip = false;

Vue.prototype.$axios = Axios;

Vue.use(VueCustomScrollbar);

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
