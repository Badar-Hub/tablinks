<template>
  <q-input v-bind="$attrs" ref="inputRef" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const inputRef = ref();

    const validate = () => {
      console.log(inputRef.value.validate());
      return inputRef.value.validate();
    };

    return {
      inputRef,
      validate,
    };
  },
});
</script>

<style></style>
