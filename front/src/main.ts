import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { BootstrapVue } from "bootstrap-vue";
import SocketIO from "socket.io-client";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import QuizClient from "./QuizClient";

console.log(process.env);

const options = {};

// on dev always use 8080 port for socket, on port use the same port as the on user is connected to
const socketIOclient: SocketIOClient.Socket = SocketIO(
  location.hostname +
    (process.env.NODE_ENV == "development" ? ":8080" : ":" + location.port),
  options
);

Vue.prototype.$socket = socketIOclient;
const quizClient: QuizClient = new QuizClient(socketIOclient);
Vue.prototype.$quizClient = quizClient;

library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
