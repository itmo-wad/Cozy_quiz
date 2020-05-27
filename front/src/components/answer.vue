<template lang="pug">
  .answer.d-inline-flex.p-2.bd-highlight.col-5.mb-4(v-bind:class="{ 'bg-success': type == 1, 'bg-danger': type == -1, 'bg-secondary': type == 0 }")
    .div(v-if="!editable")
      | {{ answer }}
    .row.w-100.no-gutters(v-else="")
      .col
        ExpandableTextArea(v-bind:value="answer" v-on:input="update")
      .col-auto.mr-auto(v-if="controlsEnabled")
        font-awesome-icon.icon(:icon="['fas', 'check']" v-on:click="$emit('select')")
        font-awesome-icon.icon(v-if="deleteEnabled" :icon="['fas', 'trash']" v-on:click="$emit('remove')")
</template>

<style lang="scss" scoped>
.answer {
  background-color: grey;
  border-radius: 25px;
  text-align: center;
  word-wrap: break-word;
}

.icon {
  margin-left: 5px;
  margin-right: 5px;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import ExpandableTextArea from "./expandableTextArea.vue";

@Component({
  props: {
    answer: {
      type: String,
      default: "",
    },
    editable: {
      type: Boolean,
      default: false,
    },
    controlsEnabled: {
      type: Boolean,
      default: true,
    },
    deleteEnabled: {
      type: Boolean,
      default: true,
    },
    // -1 wrong, 0 neutral, 1 good
    type: {
      type: Number,
      default: 0,
    },
  },
  components: {
    ExpandableTextArea,
  },
  model: {
    event: "input",
    prop: "answer",
  },
})
export default class Answer extends Vue {
  update(value: string) {
    if (this.$props.editable) {
      this.$emit("input", value);
    }
  }
}
</script>
