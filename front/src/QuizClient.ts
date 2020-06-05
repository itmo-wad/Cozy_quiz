import store from "./store";
import router from "./router";

interface EventListener {
  fn: Function;
  singleUse: boolean;
}

export default class QuizClient {
  private ws: SocketIOClient.Socket;

  private listeners: Map<string, Array<EventListener>> = new Map();

  constructor(ws: SocketIOClient.Socket) {
    this.ws = ws;
    this.ws.on("connect", () => {
      if (store.state.room) {
        this.joinRoom(store.state.room);
      }
    });
    this.ws.on("createRoom", this._onCreateRoom.bind(this));
    this.ws.on("joinRoom", this._onJoinRoom.bind(this));
    this.ws.on("roomInfos", this._onRoomInfos.bind(this));
    this.ws.on("state", this._onState.bind(this));
    this.ws.on("play", this._onPlay.bind(this));
    this.ws.on("pause", this._onPause.bind(this));
    this.ws.on("questionStart", this._onQuestionStart.bind(this));
    this.ws.on("timerUpdate", this._onTimerUpdate.bind(this));
    this.ws.on("answer", this._onAnswer.bind(this));
  }

  public on(eventName: string, fn: Function) {
    this.ws.on(eventName, fn);
  }

  public createRoom(quiz: string) {
    this.ws.emit("createRoom", quiz);
  }

  public joinRoom(roomId: string) {
    this.ws.emit("joinRoom", roomId);
  }

  public play() {
    this.ws.emit("play", store.state.room);
  }

  public pause() {
    this.ws.emit("pause", store.state.room);
  }

  public selectAnswer(answer: number) {
    this.ws.emit("selectAnswer", store.state.room, answer);
  }

  private _onCreateRoom(status: number, ...args: any) {
    if (status == 200) {
      this.joinRoom(args[0]);
    } else {
      console.log(args[0]);
    }
  }

  private _onJoinRoom(status: number, ...args: any) {
    if (status == 200) {
      store.commit("joinRoom", { room: args[0] });
      router.push({ name: "Quiz" });
    } else if (status == 404) {
      console.log("room not found");
      store.commit("joinRoom", { room: "" });
      router.push({ name: "Home" });
    }
  }

  private _onRoomInfos(roomID: string, infos: Record<string, undefined>) {
    store.commit("updateRoomInfos", { infos });
  }

  private _onState(roomID: string, state: Record<string, undefined>) {
    store.commit("updateGameState", { state });
  }

  private _onPlay(roomID: string, status: string) {
    store.commit("updateStatus", { status });
  }

  private _onPause(roomId: string, status: string) {
    store.commit("updateStatus", { status });
  }

  private _onQuestionStart(
    roomId: string,
    question: string,
    answers: Record<string, undefined>[],
    timeLeft: number,
    maxTime: number
  ) {
    store.commit("updateQuestion", {
      question: { question, answers },
    });
    store.commit("updateTimeLeft", { timeLeft, maxTime });
  }

  private _onTimerUpdate(roomId: string, timeLeft: number, maxTime: number) {
    store.commit("updateTimeLeft", { timeLeft, maxTime });
  }

  private _onAnswer(roomId: string, answer: number) {
    store.commit("updateAnswer", { answer });
  }
}
