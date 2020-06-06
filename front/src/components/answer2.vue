<template lang="pug">
  .answer.d-inline-flex.p-2.bd-highlight.col-5.mb-4.bg-primary(v-bind:class="{ 'bg-success': good == 1, 'bg-danger': good == -1, 'selected': selected }")
    .row.w-100.no-gutters
      .col
        | {{ text }}
</template>

<style lang="scss" scoped>
.answer {
  border-radius: 25px;
  text-align: center;
  word-wrap: break-word;
}

.icon {
  margin-left: 5px;
  margin-right: 5px;
}

.selected {
  transform: scale(1.1);
  font-weight: 600;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import ExpandableTextArea from "./expandableTextArea.vue";

@Component({
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    good: {
      type: Number,
      default: 0
    },
    text: {
      type: String
    }
  }
})
export default class Answer extends Vue {}
</script>
