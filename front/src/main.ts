import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import SocketIO from "socket.io-client";

console.log(process.env);

const options = {};

const socketIOclient: SocketIOClient.Socket = SocketIO(
  location.hostname +
    (process.env.NODE_ENV == "development" ? ":8080" : ":" + location.port),
  options
);

Vue.prototype.$socket = socketIOclient;
const quizClient: QuizClient = new QuizClient(socketIOclient);
Vue.prototype.$quizClient = quizClient;

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

import { BootstrapVue } from "bootstrap-vue";
import QuizClient from "./QuizClient";
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
