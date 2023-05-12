<script setup>
import * as Papa from 'papaparse';
import * as zip from '@zip.js/zip.js';


const emit = defineEmits(['fileDownloaded', 'startProcessing']);

async function downloadFile() {
  // Set UpdateTool to processing
  emit('startProcessing');

  // download public file
  const response = await fetch('https://storage.googleapis.com/updated_data/updated_data.csv', {mode: 'cors'});
  const data = await response.blob();

  Papa.parse(data, {
    delimeter: ",",
    header: true,
    complete: (results) => {
      emit('fileDownloaded', results.data);
    }
  })
}
</script>

<template>
  <button @click="downloadFile">Submit</button>
</template>

<style scoped></style>
