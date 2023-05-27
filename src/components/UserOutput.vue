<script setup>

import * as Papa from 'papaparse';
import { saveAs } from 'file-saver';

const emit = defineEmits(['backTab'])

const props = defineProps(['data']);

function backTab() {
  emit('backTab', 'OutputOptions')
}


// makes array into a csv and uses file-saver to download the file
function downloadFile() {
  
  const updatedCSV = new Blob([Papa.unparse(props.data)], {
      type: 'text/csv',
    });

  const date = new Date();

  const fileDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`

  saveAs(updatedCSV, 'updated-seller-helper-' + fileDate);
}
</script>

<template>
  <div class="section">
    <div class="info border-b border-black pb-4 mb-4">
      <h2 class="text-lg font-bold pb-4">Download File</h2>
      <p>The download is ready. Click the button below to download the spreadsheet. This file can than be imported into Warhead.</p></div>
    <div class="mainSection">
    <div class="continueButtons space-x-6">
      <button class="btn-primary" @click.prevent="backTab">Back</button>
      <button class="btn-primary" @click.prevent="downloadFile">Download File</button>
    </div>
    </div>
  </div>
</template>

<style scoped>
</style>