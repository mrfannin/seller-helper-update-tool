<script setup>
/**
 * Navigation on the left side of the app.
 * Not actually functional for now, other than showing the step that the user is on.
 */
import { ref } from 'vue';

// Gets the current tab from ToolMain
const props = defineProps(['currentTab']);

// An array of the tab components and their corresponding name to show in the Navigation
const tabList = ref([
  { comp: 'IntroTab', name: 'Start' },
  { comp: 'UploadTab', name: 'Upload File' },
  { comp: 'OptionsTab', name: 'Options' },
  { comp: 'OutputTab', name: 'Download File' },
]);
</script>

<template>
  <ul class="mb-12 flex flex-col justify-center text-lg">
    <li
      v-for="tab in tabList"
      :class="tab.comp === currentTab ? 'text-slate-600' : 'text-slate-400'"
    >
      {{ tab.name }}
    </li>
  </ul>
</template>
