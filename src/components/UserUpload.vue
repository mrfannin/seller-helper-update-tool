<script setup>
/**
 * Data: User data once uploaded
 * Usage: This section is for the user to upload their warhead export. Once uploaded, it will check if it's a valid upload and either show errors or reveal the next button.
 *        When hitting next, it emits an event to ToolMain with the data, and to proceed to the next screen.
 */

import * as Papa from 'papaparse';
import { ref } from 'vue';

const emit = defineEmits(['fileUploaded', 'changeTab']);

const message = ref('');

const dataReady = ref(false);

const fileName = ref('');

const isProcessing = ref(false);

let userData = null;

// Triggers when file is uploaded. Checks if it is a csv. Uses PapaParse to parse into object, and checks if it is valid.
function checkFile(event) {
  let file = event.target.files[0];

  if (file.type !== 'text/csv') {
    message.value = 'File is not a CSV';
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
    message.value = 'File is not a Warhead Export';
  } else {
    let testRegEx = /([Tt]he)? ?[Ss]eller ?[Hh]elper/;
    let filteredData = results.data.filter(
      (line) => line.shippingGroup === 'The Seller Helper'
    );
    if (filteredData.length === 0) {
      message.value = 'No products from The Seller Helper. Make sure the Shipping Group is named correctly.';
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
  emit('fileUploaded', userData);
}

function backTab() {
  emit('changeTab', 'Intro');
}

</script>

<template>
  <div class="section">
    <div class="info border-b border-black pb-4 mb-4">
      <h2 class="text-xl font-bold pb-4">Upload Warhead Export</h2>
      <p>Upload a default Warhead export with Seller Helper products on it. This can be done by going to Dashboard > Store > Products, and clicking the Export button at the top of the page. Leave the options as they are, and then click Export. This will download a spreadsheet of all of the products, which can then be uploaded below.</p>
    </div>
    <div class="mainSection">
      <div class="uploadSection space-x-6" v-if="!dataReady">
        <button class="btn-primary" @click.prevent="backTab">Back</button>
        <input
          type="file"
          class="invisible w-32 file:visible file:btn-primary"
          id="fileUpload"
          accept=".csv"
          @change="checkFile"
        />
        <p class="errorMessage mt-4 w-fit px-4 py-2 rounded-sm bg-red-400/75" v-if="message">{{ message }}</p>
      </div>
      <div class="continueSection" v-if="dataReady">
        <p class="bg-slate-50/75 py-2 px-3 rounded-sm mb-4">{{ fileName }}</p>
        <div class="space-x-6">
          <button
            @click.prevent="resetData"
            class="btn-primary"
          >
            Change File
          </button>
          <button @click.prevent="fileUploaded" class="btn-primary">Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* h2 {
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
} */
</style>
