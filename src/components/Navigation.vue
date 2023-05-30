<script setup>
import { ref } from 'vue';

const props = defineProps(['currentTab']);

const tabList = ref([
  { comp: 'Intro', name: 'Start' },
  { comp: 'UserUpload', name: 'Upload File' },
  { comp: 'OutputOptions', name: 'Options' },
  { comp: 'UserOutput', name: 'Download File' },
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
