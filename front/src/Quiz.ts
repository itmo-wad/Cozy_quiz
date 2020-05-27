class Question {
  question: string = "";
  delay: number = 15;
  answers: Answer[] = [];
  rightAnswer: number = 0;

  constructor() {
    this.answers.push(new Answer());
    this.answers.push(new Answer());
  }
}

class Answer {
  answer: string = "New answer";
  id: number = Math.random();
}

class Quiz {
  quizName: string = "";
  questions: Question[] = [];
}

export { Quiz, Question, Answer };
export default Quiz;
