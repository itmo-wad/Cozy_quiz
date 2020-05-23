<template lang="pug">
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
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class App extends Vue {}
</script>
