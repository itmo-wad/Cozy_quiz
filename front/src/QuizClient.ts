import store from "./store";
import router from "./router";

interface eventListener {
  fn: Function;
  singleUse: Boolean;
}

export default class QuizClient {
  private ws: SocketIOClient.Socket;

  private listeners: Map<String, Array<eventListener>> = new Map();

  constructor(ws: SocketIOClient.Socket) {
    this.ws = ws;
    this.ws.on("createRoom", this._onCreateRoom.bind(this));
    this.ws.on("joinRoom", this._onJoinRoom.bind(this));
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

  private _onCreateRoom(status: number, ...args: any) {
    if (status == 200) {
      this.joinRoom(args[0]);
    } else {
      console.log(args[0]);
    }
  }

  private _onJoinRoom(status: number, ...args: any) {
    if (status == 200) {
      store.commit({ type: "joinRoom", room: args[0] });
      router.push({ name: "quiz" });
    } else if (status == 404) {
      console.log("room not found");
    }
  }
}
