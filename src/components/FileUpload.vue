<script setup>
import * as Papa from 'papaparse';
import { ref } from 'vue';

const data = ref(null);

const errorMessage = ref('');

function fileUpload(event) {
  let file = event.target.files[0];
  Papa.parse(file, {
    delimeter: ",",
    header: true,
    complete: (results) => { fileCheck(results) }
  });
}

function fileCheck(results) {
  console.log(results);
  if (!results.meta.fields.includes('shippingGroup')) {
    errorMessage.value = 'Not a valid Warhead Export';
  }
  else {
    let filteredData = results.data.filter(line => line.shippingGroup === "The Seller Helper");
    console.log(filteredData);
    if (filteredData.length === 0) {
      errorMessage.value = "No The Seller Helper products found";
    }
  }
}
</script>

<template>
  <div class="file-upload">
    <label for="file-input">Upload Warhead export:</label>
    <div class="input-section">
      <input type="file" id="file-input" name="file-input" accept=".csv" @change="fileUpload($event)">
      <p class="error" v-if="errorMessage !== ''">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
.file-upload {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  font-size: 25px;
}

input {
  padding-top: 5px;
}

.input-section {
  display: flex;
}

.error {
  font-size: 20px;
  color: red;
}
</style>