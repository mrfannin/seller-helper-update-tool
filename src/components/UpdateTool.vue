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

// When sellerhelper file downloaded, process the files and create an update file
function processData(data) {
  sellerHelperData.value = data;

  console.log(data);

  let updatedData = [];

  userData.value.forEach(userProduct => {
    let shProduct = sellerHelperData.value.find(sellerHelperProduct => sellerHelperProduct.sku === userProduct.sku)

    if (shProduct !== undefined) {
      updatedData.push({sku: shProduct.sku, quantity: shProduct.quantity, cost: shProduct.cost});
    } else {
      updatedData.push({sku: userProduct.sku, quantity: 0, cost: userProduct.cost})
    }
    
  });

  let updatedCSV = new Blob([Papa.unparse(updatedData)], {type:"text/csv"});

  console.log("UPDATED DATA");
  console.log(updatedCSV);

  saveAs(updatedCSV, 'updated-seller-helper');

}

</script>

<template>
  <FileUpload @file-uploaded="(data) => userData = data"></FileUpload>
  <SellerHelperDownload v-if="userData !== null" @file-downloaded="processData"></SellerHelperDownload>
</template>

<style scoped>
</style>