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
    <div class="info"><p>Your download is ready. Click the button below to download the spreadsheet. This file can than be imported into Warhead.</p></div>
    <div class="mainSection">
    <div class="continueButtons">
      <p class="button" @click.prevent="backTab">Back</p>
      <p class="button" @click.prevent="downloadFile">Download File</p>
    </div>
    </div>
  </div>
</template>

<style scoped>
</style>