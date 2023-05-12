<script setup>
import FileUpload from './FileUpload.vue';
import SellerHelperDownload from './SellerHelperDownload.vue';
import { ref } from 'vue';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';

// user spreadsheet, brought in from File Upload component
const userData = ref(null);

// seller helper spreadsheet, brought in from Seller Helper Download component
const sellerHelperData = ref(null);

// processed data, added in processing promise
const updatedData = ref([]);

const isProcessing = ref(false);

const processWorker = new Worker('src/workers/processWorker.js');

// Receives seller helper data from SellerHelperDownload component, sends data to worker, and creates event listener to receive data and save file
function processData(data) {

  sellerHelperData.value = data;

  processWorker.postMessage({
    command: 'process',
    shData: JSON.parse(JSON.stringify(sellerHelperData.value)),
    userData: JSON.parse(JSON.stringify(userData.value)),
  });

  processWorker.addEventListener('message', (message) => {
    updatedData.value = message.data;
    isProcessing.value = false;

    const updatedCSV = new Blob([Papa.unparse(updatedData.value)], {
      type: 'text/csv',
    });

    saveAs(updatedCSV, 'updated-seller-helper');
  });
}
</script>

<template>
  <FileUpload @file-uploaded="(data) => (userData = data)"></FileUpload>
  <SellerHelperDownload
    v-show="userData !== null"
    @file-downloaded="processData"
    @start-processing="isProcessing = true"
  ></SellerHelperDownload>
  <p v-show="isProcessing">Processing</p>
</template>

<style scoped></style>
