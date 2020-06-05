<template lang="pug">
  .page-content
    nav.navbar.navbar-dark.sticky-top.bg-dark.flex-md-nowrap.p-0.shadow.text-light
      .col
        | Quiz title
    .container-fluid
      .row
        nav#sidebarMenu.col-md-3.col-lg-2.d-md-block.bg-light.sidebar.collapse
          .container
            .row.justify-content-center
              .col-auto
                b-button(v-b-tooltip.hover.top="'Previous question!'")
                  font-awesome-icon.icon(:icon="['fas', 'backward']")
              .col-auto
                b-button(v-b-tooltip.hover.top="'Start quiz!'")
                  font-awesome-icon.icon(:icon="['fas', 'play']")
              .col-auto
                b-button(v-b-tooltip.hover.top="'Skip question!'")
                  font-awesome-icon.icon(:icon="['fas', 'forward']")
          .sidebar-sticky.pt-3
            h6.sidebar-heading.d-flex.justify-content-between.align-items-center.px-3.mb-1.text-muted
              span Players
            ul.nav.flex-column.mb-2
              li.nav-item.questionsItem
                .row.w-100.align-items-center
                  .col.overflow-hidden
                    .nav-link
                      font-awesome-icon.icon(:icon="['fas', 'crown']")
                      | Freebios

    main.col-md-9.ml-sm-auto.col-lg-10.px-md-4(role="main")
      .text-center
        // Question
        .question Hello
        .col-9.m-auto
          .mt-2
            // Answers
            .d-flex.flex-wrap.justify-content-around.align-items-center
              answer(:answer="'answer'" :key="'id'"
                  :editable="false" :type="0"
                  v-on:remove="removeAnswer(index)" v-on:select="selectAnswer(index)")
          .mt-5
            // Time selection
            input.custom-range#delayRange(type="range" min="5" max="30" step="1")
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import Component from "vue-class-component";
import answer from "../components/answer";

@Component({
  components: {
    answer,
  },
})
export default class Quiz extends Vue {
  mounted() {
    if (this.$store.state.room == "") this.$router.push({ name: "Home" });
  }
}
</script>

<style lang="scss" scoped>
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

.navbar {
  height: calc(1.5em + 0.75rem + 2px);
}

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
