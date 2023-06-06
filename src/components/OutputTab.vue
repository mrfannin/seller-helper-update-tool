<script setup>
/**
 * Final tab that creates a download of the finished data.
 * Has a button to download the file.
 */
import TabComponent from './TabComponent.vue';
import * as Papa from 'papaparse';
import { saveAs } from 'file-saver';

const emit = defineEmits(['changeTab']);

// Receives the processed data as a prop from ToolMain
const props = defineProps(['data']);

// Emits a changeTab event to ToolMain when user clicks Back, returns to the Options Tab
function backTab() {
  emit('changeTab', 'OptionsTab');
}

// Executed when user clicks the download button, creates and downloads the final csv
function downloadFile() {
  // Uses PapaParse to unparse the data, and create a new CSV file with that data
  const updatedCSV = new Blob([Papa.unparse(props.data)], {
    type: 'text/csv',
  });

  // Gets date to add to the default name of the file
  const date = new Date();

  const fileDate = `${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getFullYear()}`;

  // Uses saveAs plugin to trigger the browsers file save option with the file
  saveAs(updatedCSV, 'updated-seller-helper-' + fileDate);
}
</script>

<template>
  <TabComponent>
    <template #title>Download File</template>

    <template #intro
      ><p>
        The download is ready. Click the button below to download the
        spreadsheet. This file can than be imported into Warhead.
      </p></template
    >

    <template #buttons>
      <button class="btn-primary" @click.prevent="backTab">Back</button>
      <button class="btn-primary" @click.prevent="downloadFile">
        Download File
      </button>
    </template>
  </TabComponent>
</template>
