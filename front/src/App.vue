<template lang="pug">
  .container.page-content.h-100
    .row.justify-content-center
      .col-auto
        .logo
          h1 COZY QUIZ
    .row.justify-content-center.text-center.align-items-center.h-100
      .col-6.mx-auto
        router-view
</template>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";

html,
body {
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

.page-content {
  min-height: 100vh;
}

.logo {
  margin: 50px;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class App extends Vue {}
</script>
