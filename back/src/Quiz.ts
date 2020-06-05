class User {
  name: string = "Anonymous User";

  constructor() {}

  setName() {}
}

export default class Quiz {
  roomID: string;
  quiz: object;
  users: Map<string, User>;
  currentQuestion: number = -1;
  status: string = "paused";
  timeleft: number = 0;

  constructor(roomID: string, quiz: object) {
    this.roomID = roomID;
    this.quiz = quiz;
  }

  joinRoom(socket) {}
}
