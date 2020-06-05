import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    room: "",
  },
  mutations: {
    joinRoom(state, payload) {
      state.room = payload.room;
    },
  },
  actions: {},
  modules: {},
});
