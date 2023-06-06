<script setup>
/**
 * Tooltips that are only shown on the Options Tab for now
 * When user hovers over question mark icon, shows the info
 * Info is passed in as a slot from the Options Tab
 */
import { ref } from 'vue';

// When mouse enters question mark icon, sets to true, and false when mouse leaves. Shows tooltip when true
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
