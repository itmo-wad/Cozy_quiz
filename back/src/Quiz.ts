import Timer from "./Timer";

class Player {
  name = "Anonymous Player";
  score = 0;
  socket: SocketIO.Socket;

  constructor(socket: SocketIO.Socket) {
    this.socket = socket;
  }

  setName(name: string) {
    this.name = name;
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
  players: object = {};
  ownerID: string;

  quiz: QuizData;
  currentQuestionIndex = -1;
  currentQuestion: QuizQuestion;
  status: Status = Status.paused;

  private timer: Timer = new Timer(0);

  constructor(roomID: string, quiz: QuizData) {
    this.roomID = roomID;
    this.quiz = quiz;

    this.quiz = {
      quizName: "My super quiz",
      questions: [
        {
          question: "1st question?",
          delay: 5,
          answers: [
            { answer: "New answer" },
            { answer: "true" },
            { answer: "New answer" },
            { answer: "New answer" },
          ],
          rightAnswer: 1,
        },
        {
          question: "Question",
          delay: 5,
          answers: [
            { answer: "New answer" },
            { answer: "New answer" },
            { answer: "True" },
          ],
          rightAnswer: 2,
        },
        {
          question: "Oui,?",
          delay: 5,
          answers: [{ answer: "salam" }, { answer: "New answer" }],
          rightAnswer: 0,
        },
        {
          question: "Goodbye",
          delay: 5,
          answers: [
            { answer: "New answer" },
            { answer: "New answer" },
            { answer: "New answer" },
            { answer: "New answer" },
            { answer: "New answer" },
            { answer: "New answer" },
            { answer: "New answer" },
            { answer: "orevoir" },
            { answer: "New answer" },
          ],
          rightAnswer: 7,
        },
      ],
    };
  }

  public joinRoom(socket: SocketIO.Socket): void {
    this.players[socket.id] = new Player(socket);
    if (!this.ownerID) this.ownerID = socket.id;
    //this.sendRoomInfos(socket);
    this.broadcast(this.sendRoomInfos);
    this.sendState(socket);
  }

  sendRoomInfos(socket: SocketIO.Socket): void {
    socket.emit("roomInfos", this.roomID, {
      roomID: this.roomID,
      quizName: this.quiz["quizName"] || "Unnamed quiz",
      players: this.players,
      ownerID: this.ownerID,
      myID: socket.id,
    });
  }

  sendState(socket: SocketIO.Socket): void {
    socket.emit("state", this.roomID, {
      status: this.status,
      timeLeft: this.timer.getTimeLeft(),
      maxTime: this.timer.getInitialTime(),
    });
  }

  broadcast(fn: (socket: SocketIO.Socket) => void): void {
    for (const player in this.players)
      fn.bind(this)(this.players[player].socket);
  }

  play(): void {
    if (this.status != Status.playing) {
      if (this.currentQuestionIndex == -1) this.nextQuestion();
      this.status = Status.playing;
      this.timer.start();
      this.broadcast((socket) => {
        socket.emit("play", this.roomID, Status.playing);
      });
    }
  }

  pause(): void {
    this.status = Status.paused;
    this.broadcast((socket) => {
      socket.emit("pause", this.roomID, Status.paused);
    });
  }

  nextQuestion(): void {
    this.currentQuestionIndex++;
    console.log(this.currentQuestionIndex, this.quiz.questions.length);
    if (this.currentQuestionIndex >= this.quiz.questions.length) {
      this.status = Status.finished;
      return;
    }
    this.currentQuestion = this.quiz.questions[this.currentQuestionIndex];
    this.timer.setTimeLeft(this.currentQuestion.delay * 1000);
    this.questionStart();

    this.timer.onFinish(this.questionEnd.bind(this));
  }

  questionEnd(): void {
    this.updateTimer();

    this.timer.onFinish(this.answerEnd.bind(this));
    this.timer.resetTimer(5000);
    this.updateTimer();
    this.timer.start();
    console.log("question finish");
  }

  answerEnd(): void {
    this.updateTimer();
    console.log("answer finish");

    this.nextQuestion();
  }

  questionStart(): void {
    this.updateTimer();
    this.timer.start();
    this.broadcast((socket) => {
      socket.emit(
        "questionStart",
        this.roomID,
        this.currentQuestion.question,
        this.currentQuestion.answers,
        this.timer.getTimeLeft(),
        this.timer.getInitialTime()
      );
    });
  }

  updateTimer(): void {
    this.broadcast((socket) => {
      socket.emit(
        "timerUpdate",
        this.roomID,
        this.timer.getTimeLeft(),
        this.timer.getInitialTime()
      );
    });
  }
}
