import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    room: "",
    roomInfos: {
      roomID: "",
      quizName: "",
      players: {},
      ownerID: "",
      myID: "",
    },
    gameState: {
      status: "paused",
      timeLeft: 0,
      maxTime: 0,
      question: null,
      answer: null,
    },
    selectedAnswer: -1,
  },
  mutations: {
    joinRoom(state, payload) {
      state.room = payload.room;
    },
    updateRoomInfos(state, payload) {
      state.roomInfos = payload.infos;
    },
    updateGameState(state, payload) {
      state.gameState = { ...payload.state };
    },
    updateStatus(state, payload) {
      state.gameState = { ...state.gameState, status: payload.status };
    },
    updateQuestion(state, payload) {
      delete state.gameState.answer;
      state.selectedAnswer = -1;
      state.gameState = { ...state.gameState, question: payload.question };
    },
    updateTimeLeft(state, payload) {
      state.gameState = { ...state.gameState, ...payload };
    },
    updateAnswer(state, payload) {
      state.gameState = { ...state.gameState, ...payload };
    },
    updateSelectedAnswer(state, payload) {
      state.selectedAnswer = payload;
    },
  },
  actions: {},
  modules: {},
});
