<script setup>
/**
 * General styling for the different tabs
 * Used as various slots in the tab components
 */
  import { ref, useSlots } from 'vue'
  const slots = ref(useSlots());
</script>

<template>
  <div>
    <div class="mb-4 border-b border-black pb-4">
      <h2 class="text-2xl font-bold"><slot name="title"></slot></h2>
      <div v-if="slots.intro" class="pt-2 space-y-2 text-xl">
        <slot name="intro" class="space-y-2"></slot>
      </div>
    </div>
    <div v-if="slots.main" class="space-y-2 mt-2">
      <slot name="main"></slot>
    </div>
    <div class="mt-4 space-x-6">
      <slot name="buttons"></slot>
    </div>
  </div>
</template>
