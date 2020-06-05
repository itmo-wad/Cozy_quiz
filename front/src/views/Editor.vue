<template lang="pug">
  .page-content
    textarea.hidden-input(id="clipboard" value="salam")

    b-modal#modal-1(title="Import quiz" v-on:ok="importQuiz($refs.importQuiz.value)")
      label(for="importQuiz") Paste a previously exported quiz here
      textarea.form-control#importQuiz(ref="importQuiz")

    nav.navbar.navbar-dark.sticky-top.bg-dark.flex-md-nowrap.p-0.shadow.text-light
      .col
        input.form-control.quiz-title.text-light(type="text" v-model:input="quiz.quizName" placeHolder="Enter a quiz title...")
      .col-auto
        font-awesome-icon(:icon="['fas', 'upload']" v-b-modal.modal-1)
      .col-auto
        font-awesome-icon(:icon="['fas', 'save']" v-on:click="exportQuiz()")
      .col-auto
        button.btn.btn-success(v-on:click="startQuiz()") Start quiz
    .container-fluid
      .row
        sidebar(v-bind:questions="quiz.questions" v-model="currentQuestion" v-on:add="addQuestion()" v-on:remove="removeQuestion($event)")

    main.col-md-9.ml-sm-auto.col-lg-10.px-md-4(role="main")
      div(v-if="currentQuestion != undefined")
        .text-center
          // Question
          textarea.form-control.question(v-model:input="currentQuestion.question" placeHolder="Type your question here")
          .col-9.m-auto
            .mt-5.text-right
              | {{"Add answer "}}
              font-awesome-icon.icon(:icon="['fas', 'plus-circle']" v-on:click="addAnswer()")
            .mt-2
              // Answers
              .d-flex.flex-wrap.justify-content-around.align-items-center
                answer(v-for="(answer, index) in currentQuestion.answers" v-model="answer.answer" :key="answer.id"
                  :editable="true" :type="index == currentQuestion.rightAnswer ? 1 : -1"
                  :deleteEnabled="currentQuestion.answers.length > 2"
                  v-on:remove="removeAnswer(index)" v-on:select="selectAnswer(index)")
            .mt-5
              // Time selection
              label(for="delayRange") Time for the question: {{ currentQuestion.delay }}s
              input.custom-range#delayRange(type="range" min="5" max="30" step="1" v-model="currentQuestion.delay")
      div(v-else)
        .text-center
          h2 Please select or create a question first
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { Quiz, Question, Answer } from "../Quiz";

import sidebar from "../components/sidebar.vue";
import answer from "../components/answer.vue";

@Component({
  components: {
    sidebar,
    answer,
  },
  data: () => {
    return {
      currentQuestion: undefined,
    };
  },
})
export default class Editor extends Vue {
  currentQuestion?: Question;

  quiz: Quiz = new Quiz();

  importQuiz(json: string) {
    this.quiz = JSON.parse(json);

    this.$bvToast.toast(`Quiz imported successfully`, {
      title: "Quiz loaded !",
      autoHideDelay: 3000,
      appendToast: true,
      toaster: "b-toaster-bottom-right",
    });
  }

  exportQuiz() {
    let clipboardInput: HTMLInputElement | null = document.querySelector(
      "#clipboard"
    );
    clipboardInput!.value = JSON.stringify(this.quiz);
    clipboardInput?.select();
    document.execCommand("copy");

    this.$bvToast.toast(`Quiz copied to clipboard`, {
      title: "Quiz saved !",
      autoHideDelay: 3000,
      appendToast: true,
      toaster: "b-toaster-bottom-right",
    });
  }

  addQuestion() {
    this.quiz.questions.push(new Question());
  }

  removeQuestion(event: number) {
    this.quiz.questions.splice(event, 1);
  }

  addAnswer() {
    this.currentQuestion?.answers.push(new Answer());
  }

  removeAnswer(index: number) {
    this.currentQuestion!.answers.splice(index, 1);
  }

  selectAnswer(index: number) {
    this.currentQuestion!.rightAnswer = index;
  }

  startQuiz() {
    this.$quizClient.createRoom(JSON.stringify(this.quiz));
  }
}
</script>

<style lang="scss" scoped>
.hidden-input {
  position: fixed;
  background: transparent;
  color: transparent;
  z-index: -1000;
  border: none;
  width: 0;
  height: 0;
}

.quiz-title {
  background-color: transparent;
}

.question {
  outline: none;
  resize: none;
  text-align: center;
  font-size: 3em;
  overflow: auto;
  border: none;
  display: inline-block;
  vertical-align: middle;
}

body {
  font-size: 0.875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

.navbar .navbar-toggler {
  top: 0.25rem;
  right: 1rem;
}

.navbar .form-control {
  padding: 0.75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
</style>
