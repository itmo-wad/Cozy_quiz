<template lang="pug">
  span(contenteditable="true" ref="input" @input="update")
</template>

<style lang="scss" scoped>
.expandableTextarea {
  min-height: 1em;
}

span {
  display: inline-block;
  width: 100%;
  border: none;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  model: {
    event: "input",
    prop: "value",
  },
})
export default class ExpandableTextArea extends Vue {
  mounted() {
    (this.$refs.input as HTMLElement).innerText = this.$props.value;
  }

  update(event: any) {
    this.$emit("input", (event.target as HTMLElement).innerText);
  }
}
</script>
