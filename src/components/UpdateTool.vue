<script setup>
import FileUpload from './FileUpload.vue';
import SellerHelperDownload from './SellerHelperDownload.vue';
import { ref } from 'vue';

// user spreadsheet, brought in from File Upload component
const userData = ref(null);

// seller helper spreadsheet, brought in from Seller Helper Download component
const sellerHelperData = ref(null);

// When sellerhelper file downloaded, process the files and create an update file

</script>

<template>
  <FileUpload @file-uploaded="(data) => userData = data"></FileUpload>
  <SellerHelperDownload @file-downloaded="(data) => sellerHelperData = data"></SellerHelperDownload>
</template>

<style scoped>
</style>