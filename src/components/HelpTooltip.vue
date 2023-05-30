<script setup>
import { ref } from 'vue';

const isHover = ref(false);
</script>

<template>
  <div class="h-fit select-none">
    <span
      class="material-symbols-outlined text-xl"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
    >
      help
    </span>
    <p
      class="absolute left-6 top-0 flex w-80 items-center rounded-md bg-white text-base"
      v-if="isHover"
    >
      <slot></slot>
    </p>
  </div>
</template>

<style scoped></style>
