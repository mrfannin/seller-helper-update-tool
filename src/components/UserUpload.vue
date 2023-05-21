<script setup>
/**
 * Data: User data once uploaded
 * Usage: This section is for the user to upload their warhead export. Once uploaded, it will check if it's a valid upload and either show errors or reveal the next button.
 *        When hitting next, it emits an event to ToolMain with the data, and to proceed to the next screen.
 */

import * as Papa from 'papaparse';
import { ref } from 'vue';

const emit = defineEmits(['fileUploaded'])

const message = ref('');

const dataReady = ref(false);

const fileName = ref('');

const isProcessing = ref(false);

let userData = null;

// Triggers when file is uploaded. Checks if it is a csv. Uses PapaParse to parse into object, and checks if it is valid.
function checkFile(event) {
  let file = event.target.files[0];

  if (file.type !== 'text/csv') {
    message.value = 'File is not a .csv';
    return;
  }

  Papa.parse(file, {
    delimeter: ',',
    header: true,
    complete: (results) => {
      checkData(results);
      if (userData !== null) {
        fileName.value = file.name;
      }
    },
  });
}

// Checks if data includes a header for shippingGroup, and that there are products from the sellerhelper
// Sets a message if there are errors, sets userData to filtered data otherwise
function checkData(results) {
  if (!results.meta.fields.includes('shippingGroup')) {
    message.value = 'Not a valid Warhead Export';
  } else {
    let testRegEx = /([Tt]he)? ?[Ss]eller ?[Hh]elper/;
    let filteredData = results.data.filter(
      (line) => line.shippingGroup === 'The Seller Helper'
    );
    if (filteredData.length === 0) {
      message.value =
        'No products found from The Seller Helper';
    } else {
      userData = filteredData;
      dataReady.value = true;
    }
  }
}

// Resets uploaded data, triggered from button after user uploads file
function resetData() {
  userData = null;
  dataReady.value = false;
}

// Emits an event to ToolMain, sends filtered data back as an argument
function fileUploaded() {
  emit('fileUploaded', userData)
}
</script>

<template>
  <div class="section">
    <div class="info">
      <p>This tool can be used to download updated data of your products from The
      Seller Helper.</p>
      <p>Click here to watch a video on using this tool.</p>
    </div>
    <div class="mainSection" @submit.prevent>
      <div>
        <h2>Upload Warhead Export</h2>
      </div>
      <div class="uploadSection" v-if="!dataReady">
        <label for="fileUpload" id="uploadLabel" class="button">Choose File</label>
        <input type="file" id="fileUpload" accept=".csv" @change="checkFile" />
        <p class="errorMessage" v-if="message">{{ message }}</p>
      </div>
      <div class="continueSection" v-if="dataReady">
        <p class="fileName">{{ fileName }}</p>
        <div class="continueButtons">
        <p @click.prevent="resetData" class="button">Change File</p>
        <p @click.prevent="fileUploaded" class="button">Continue</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 22px;
  margin-bottom: 5px;
}

.uploadSection {
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  align-items: center;
}

.errorMessage {
  margin-top: -10px;
  background-color: #e15454a9;
  padding: 5px 10px;
  border-radius: 4px;
}

input {
  opacity: 0;
}

.continueSection {
  display: flex;
  flex-direction: column;
}

.fileName {
  background-color: rgba(236, 235, 235, 0.582);
  border: 1px solid rgba(236, 235, 235, 0.904);
  width: fit-content;
  margin: auto;
  padding: 5px 10px;
  border-radius: 5px;
}

</style>
