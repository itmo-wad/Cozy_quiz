<template lang="pug">
  nav#sidebarMenu.col-md-3.col-lg-2.d-md-block.bg-light.sidebar.collapse
    .sidebar-sticky.pt-3
      h6.sidebar-heading.d-flex.justify-content-between.align-items-center.px-3.mb-1.text-muted
        span Questions
        font-awesome-icon(:icon="['fas', 'plus-circle']" v-on:click="addQuestion()")
      ul.nav.flex-column.mb-2
        li.nav-item.questionsItem(v-for="(question, index) in questions")
          .row.w-100.align-items-center
            .col.overflow-hidden
              a.nav-link(v-bind:class="[{active: index == selectedQuestionIndex}]" v-on:click="selectQuestion(index)")
                | {{ question.question || "New question" }}
            .col-auto.mr-auto
              font-awesome-icon.icon(:icon="['fas', 'trash']" v-on:click="removeQuestion(index)")
</template>

<style lang="scss" scoped>
.questionsItem {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
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
  overflow-y: hidden;
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
  overflow-y: auto;
  height: 100%;
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
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    questions: {
      type: Array,
      required: true
    },
    currentQuestion: {
      type: Object
    }
  },
  model: {
    event: "input",
    prop: "currentQuestion"
  }
})
export default class Sidebar extends Vue {
  selectedQuestionIndex = 0;

  addQuestion() {
    this.$emit("add");
    if (this.$props.questions.length == 1) {
      this.selectQuestion(0);
    }
  }

  removeQuestion(index: number) {
    this.$emit("remove", index);
    if (this.$props.questions.length == 0) this.selectQuestion(-1);
  }

  selectQuestion(index: number) {
    this.selectedQuestionIndex = index;
    if (index >= 0) this.update(this.$props.questions[index]);
    else this.update(undefined);
  }

  update(value?: object) {
    this.$emit("input", value);
  }
}
</script>
