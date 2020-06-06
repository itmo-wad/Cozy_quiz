/**
 * Answer class
 * TODO: remove ID on export and generate it again on import, this should stay internal
 */
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

/**
 * Question class including all question, answers, rigt answer, delay
 */
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

/**
 * Quiz class used for saving, exporting, sending to server
 */
class Quiz {
  quizName = "";
  questions: Question[] = [];
}

export { Quiz, Question, Answer };
export default Quiz;
