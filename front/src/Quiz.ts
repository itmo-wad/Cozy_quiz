class Answer {
  answer = "New answer";
  id?: number;

  constructor() {
    this.genID();
  }

  genID() {
    this.id = Math.random();
  }
}

class Question {
  question = "";
  delay = 15;
  answers: Answer[] = [];
  rightAnswer = 0;

  constructor() {
    this.answers.push(new Answer());
    this.answers.push(new Answer());
  }
}

class Quiz {
  quizName = "";
  questions: Question[] = [];
}

export { Quiz, Question, Answer };
export default Quiz;
