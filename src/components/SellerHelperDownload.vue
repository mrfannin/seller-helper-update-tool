<script setup>
  import * as Papa from 'papaparse';
  import * as zip from "@zip.js/zip.js";

  const emit = defineEmits(['fileDownloaded']);

  async function downloadFile() {
    const response = await fetch("https://api.thesellerhelper.com/automator/download_product_csv.php?customer_id=171&api_key=6D9kwVxIAicD8ZVwW9cBYpxywa-PNoPu-56OXAEQMJRK^5caC3NA9AIwp0sw1*kstypM8JB6HA6SjhSzeq-*BkfRiQDooNMZx5JWFRzw17_N5KDoheAcorJF2obIQQ_0");
    const blob = await response.blob();

    const zipFileReader = new zip.BlobReader(blob);
    const writer = new zip.TextWriter();
    const zipReader = new zip.ZipReader(zipFileReader);
    const firstEntry = (await zipReader.getEntries()).shift();
    const data = await firstEntry.getData(writer);
    await zipReader.close();

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

<style scoped>
</style>