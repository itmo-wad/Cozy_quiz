<template lang="pug">
  .content
    form(action="javascript:void(0);")
      .form-group
        label.col-form-label-lg(for="roomID") Join a quiz room
        input#roomID.form-control.form-control-lg(type="text" placeholder="Room ID")
      button.btn.btn-primary.btn-lg.btn-block(type="submit") Join room
    hr
    form(action="javascript:void(0);")
      .form-group
        button.btn.btn-secondary.btn-block(type="submit") Create room
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Counter extends Vue {
  // Class properties will be component data
  count = 0;

  // Methods will be component methods
  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
</script>
