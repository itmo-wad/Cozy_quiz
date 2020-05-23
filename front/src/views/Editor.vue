<template lang="pug">
  .page-content
    nav.navbar.navbar-dark.sticky-top.bg-dark.flex-md-nowrap.p-0.shadow
      input.form-control(type="text" v-model:input="quizName" placeHolder="Quiz title")
    .container-fluid
      .row
        nav#sidebarMenu.col-md-3.col-lg-2.d-md-block.bg-light.sidebar.collapse
          .sidebar-sticky.pt-3
            h6.sidebar-heading.d-flex.justify-content-between.align-items-center.px-3.mb-1.text-muted
              span Questions
              font-awesome-icon(:icon="['fas', 'plus-circle']" v-on:click="addQuestion()")
            ul.nav.flex-column.mb-2
              li.nav-item.tabItemQuestion(v-for="(question, index) in questions" v-on:click="selectQuestion(index)")
                a.nav-link(v-bind:class="[{active: index == selectedQuestion}]")
                  | {{ question.question || "New question" }}

    main.col-md-9.ml-sm-auto.col-lg-10.px-md-4(role="main")
      div(v-if="questions[selectedQuestion]")
        .text-center
          label(for="customRange3") {{ questions[selectedQuestion].delay }}
          input.custom-range(type="range" min="0" max="5" step="0.5" v-bind:input="questions[selectedQuestion].delay")
          textarea.form-control(v-model:input="questions[selectedQuestion].question" placeHolder="Type your question here")
      div(v-else)
        .text-center
          h2 Please select or create a question first
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Counter extends Vue {
  selectedQuestion: Number = 0;

  quizName: string = "";
  questions: object[] = [];

  addQuestion() {
    this.questions.push({
      question: "",
      delay: 0,
      options: []
    });
  }

  selectQuestion(index: Number) {
    this.selectedQuestion = index;
  }
}
</script>

<style lang="scss">
.tabItemQuestion {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
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
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  /*! position: relative; */
  /*! top: 0; */
  /*! height: calc(100vh - 48px); */
  padding-top: 0.5rem;
  /*! overflow-x: hidden; */
  /*! overflow-y: auto; */ /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    /*! position: -webkit-sticky; */
    /*! position: sticky; */
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
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
