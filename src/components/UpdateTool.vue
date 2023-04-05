<script setup>
import FileUpload from './FileUpload.vue';
import { ref } from 'vue';

// user spreadsheet, brought in from File Upload component
const userData = ref(null)

</script>

<template>
  <FileUpload></FileUpload>
</template>

<style scoped>
</style>