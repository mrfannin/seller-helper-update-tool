<script setup>
import * as Papa from 'papaparse';
import { ref } from 'vue';

const emit = defineEmits(['fileUploaded']);

const data = ref(null);

const errorMessage = ref('');

// Triggers when file is uploaded, parses csv and passes to fileCheck
function fileUpload(event) {
  let file = event.target.files[0];
  Papa.parse(file, {
    delimeter: ',',
    header: true,
    complete: (results) => {
      fileCheck(results);
    },
  });
}

// Checks if file has a shippingGroup column, then filters out the seller helper result and emits it to the parent
function fileCheck(results) {
  if (!results.meta.fields.includes('shippingGroup')) {
    errorMessage.value = 'Not a valid Warhead Export';
    return;
  } else {
    let filteredData = results.data.filter(
      (line) => line.shippingGroup === 'The Seller Helper' && line.price > 0
    );
    if (filteredData.length === 0) {
      errorMessage.value = 'No The Seller Helper products found';
      return;
    }
    emit('fileUploaded', filteredData);
  }
}
</script>

<template>
  <div class="file-upload">
    <label for="file-input">Upload Warhead export:</label>
    <div class="input-section">
      <input
        type="file"
        id="file-input"
        name="file-input"
        accept=".csv"
        @change="fileUpload($event)"
      />
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
