<template lang="pug">
  .container.page-content.h-100
    .row.justify-content-center
      .col-auto
        .logo
          h1 COZY QUIZ
    .row.justify-content-center.text-center.align-items-center.h-100
      .col-6.mx-auto
        form(action="javascript:void(0);")
          .form-group
            label.col-form-label-lg(for="roomID") Join a quiz room
            input#roomID.form-control.form-control-lg(type="text" placeholder="Room ID" v-model:input="roomID")
          button.btn.btn-primary.btn-lg.btn-block(type="submit" v-on:click="joinRoom") Join room
        hr
        form(action="javascript:void(0);")
          .form-group
            button.btn.btn-secondary.btn-block(type="submit" v-on:click="openEditor()") Create room
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Home extends Vue {
  roomID = "";

  joinRoom() {
    this.$quizClient.joinRoom(this.roomID);
  }

  openEditor() {
    this.$router.push("editor");
  }
}
</script>
