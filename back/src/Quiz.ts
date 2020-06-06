import Timer from "./Timer";

class Player {
  name = "Player#" + Math.round(Math.random() * 9999);
  score = 0;
  socket: SocketIO.Socket;
  answer = -1;

  constructor(socket: SocketIO.Socket) {
    this.socket = socket;
  }

  setName(name: string) {
    this.name = name;
  }

  setAnswer(answer: number) {
    this.answer = answer;
  }

  toJSON() {
    return {
      name: this.name,
      score: this.score,
    };
  }
}

interface QuizQuestion {
  question: string;
  delay: number;
  answers: QuizAnswer[];
  rightAnswer: number;
}

interface QuizAnswer {
  answer: string;
}

interface QuizData {
  quizName: string;
  questions: QuizQuestion[];
}

enum Status {
  playing = "playing",
  paused = "paused",
  finished = "finished",
}

export default class Quiz {
  roomID: string;
  players: Record<string, Player> = {};
  ownerID: string;

  quiz: QuizData;
  currentQuestionIndex = -1;
  currentQuestion: QuizQuestion;
  status: Status = Status.paused;

  private timer: Timer = new Timer(0);

  constructor(roomID: string, quiz: string) {
    this.roomID = roomID;
    this.quiz = JSON.parse(quiz);
  }

  public joinRoom(socket: SocketIO.Socket): void {
    this.players[socket.id] = new Player(socket);
    if (!this.ownerID) this.ownerID = socket.id;
    //this.sendRoomInfos(socket);
    this._broadcast(this._sendRoomInfos);
    this._sendState(socket);
    this._sendQuestion(socket);

    socket.on("play", (roomID: string) => {
      if (roomID != this.roomID) return;
      this.play();
    });

    socket.on("pause", (roomID: string) => {
      if (roomID != this.roomID) return;
      this.pause();
    });

    socket.on("selectAnswer", (roomID: string, answer: number) => {
      if (roomID != this.roomID) return;
      this.players[socket.id].setAnswer(answer);
    });
  }

  public play(): void {
    if (this.status == Status.paused) {
      if (this.currentQuestionIndex == -1) if (!this.nextQuestion()) return;
      this.status = Status.playing;
      this.timer.start();
      this._broadcast((socket) => {
        socket.emit("play", this.roomID, Status.playing);
      });
    }
  }

  public pause(): void {
    if (this.status == Status.playing) {
      this.status = Status.paused;
      this.timer.pause();
      this._broadcast((socket) => {
        socket.emit("pause", this.roomID, Status.paused);
      });
    }
  }

  /**
   * Start the next question
   * -
   */
  public nextQuestion(): boolean {
    this.currentQuestionIndex++;
    if (
      !this.quiz.questions ||
      this.currentQuestionIndex >= this.quiz.questions.length
    ) {
      this._quizFinished();
      return false;
    }
    this.currentQuestion = this.quiz.questions[this.currentQuestionIndex];
    this.timer.setTimeLeft(this.currentQuestion.delay * 1000);
    this._questionStart();

    this.timer.onFinish(this._questionEnd.bind(this));
    this.timer.onUpdate(this._updateTimer.bind(this));
    return true;
  }

  private _sendRoomInfos(socket: SocketIO.Socket): void {
    socket.emit("roomInfos", this.roomID, {
      roomID: this.roomID,
      quizName: this.quiz["quizName"] || "Unnamed quiz",
      players: this.players,
      ownerID: this.ownerID,
      myID: socket.id,
    });
  }

  private _sendState(socket: SocketIO.Socket): void {
    socket.emit("state", this.roomID, {
      status: this.status,
      timeLeft: this.timer.getTimeLeft(),
      maxTime: this.timer.getInitialTime(),
    });
  }

  private _broadcast(fn: (socket: SocketIO.Socket) => void): void {
    for (const player in this.players)
      fn.bind(this)(this.players[player].socket);
  }

  private _questionStart(): void {
    this.timer.start();
    this._broadcast(this._sendQuestion.bind(this));
  }

  /**
   * Time for question is over
   */
  private _questionEnd(): void {
    // Count scores and reset selected answer
    for (const player in this.players) {
      if (this.players[player].answer == this.currentQuestion.rightAnswer)
        this.players[player].score++;
      this.players[player].answer = -1;
    }

    this._broadcast(this._sendRoomInfos.bind(this));
    // Send answer to players
    this._sendAnswer();

    // Prepare timer for pause between questions
    this.timer.onFinish(this._answerEnd.bind(this));
    this.timer.resetTimer(5000);
    this.timer.start();
  }

  /**
   * Time to show answers is over
   */
  private _answerEnd(): void {
    this.nextQuestion();
  }

  private _updateTimer(): void {
    this._broadcast((socket) => {
      socket.emit(
        "timerUpdate",
        this.roomID,
        this.timer.getTimeLeft(),
        this.timer.getInitialTime()
      );
    });
  }

  private _quizFinished(): void {
    this.status = Status.finished;
    this._broadcast(this._sendState);
  }

  private _sendQuestion(socket: SocketIO.Socket): void {
    if (this.currentQuestionIndex == -1) return;
    socket.emit(
      "questionStart",
      this.roomID,
      this.currentQuestion.question,
      this.currentQuestion.answers,
      this.timer.getTimeLeft(),
      this.timer.getInitialTime()
    );
  }

  private _sendAnswer(): void {
    this._broadcast((socket) => {
      socket.emit("answer", this.roomID, this.currentQuestion.rightAnswer);
    });
  }
}
