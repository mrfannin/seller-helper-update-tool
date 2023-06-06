<script setup>
/**
 * The user uploads their Warhead export in this tab.
 * The export must be the default options, and must have products with Shipping Groups list as The Seller Helper (or some variations of that)
 * Shows any errors if an invalid file is uploaded
 * When uploaded, it emits an event back to ToolMain with the data
 */

import * as Papa from 'papaparse';
import { ref } from 'vue';

const emit = defineEmits(['fileUploaded', 'changeTab']);

// Potential error message, set during checkFile or checkData
const message = ref('');

// Starts false, but is set to true when data is checked with no issues. When true, shows options to continue
const dataReady = ref(false);

// Set when file is checked with no issues. Confirms to user the file that was imported
const fileName = ref('');

// Global variable for data, just so it doesn't have to be passed back and forth
let userData = null;

// DATA PROCESSING METHODS

// Triggers when file is uploaded. Starts processing of the file
function checkFile(event) {
  let file = event.target.files[0];

  // Checks if the file is a csv. If not, shows an error and returns
  if (file.type !== 'text/csv') {
    message.value = 'File is not a CSV';
    return;
  }

  // Uses PapaParse to parse the csv, when complete, sends the results to checkData
  Papa.parse(file, {
    delimeter: ',',
    header: true,
    complete: (results) => {
      checkData(results);

      // after checking the data, sets to fileName to show on the page
      if (userData !== null) {
        fileName.value = file.name;
      }
    },
  });
}

// Checks the data for potential errors, then filters the Seller Helper data
function checkData(results) {
  // Checks if the data has a shippingGroup column. If not, shows an error that the file is not a default Warhead export
  if (!results.meta.fields.includes('shippingGroup')) {
    message.value = 'File is not a Warhead Export';
  }

  // Filters the data by the shipping group column, checks it against common spellings of The Seller Helper
  else {
    let testRegEx = /([Tt]he)? ?[Ss]eller ?[Hh]elper/;
    let filteredData = results.data.filter(
      (line) => line.shippingGroup === 'The Seller Helper'
    );

    // If there weren't any products found with a Seller Helper shipping group, shows an error
    if (filteredData.length === 0) {
      message.value =
        'No products from The Seller Helper. Make sure the Shipping Group is named correctly.';
    }

    // Data is checked and good to go, sets the userData to the filtered data, and sets dataReady to show the continue section
    else {
      userData = filteredData;
      dataReady.value = true;
    }
  }
}

// BUTTON EMITS

// Emits changeTab event to ToolMain, going back to the intro. Button only shows before the file is uploaded
function backTab() {
  emit('changeTab', 'IntroTab');
}

// Resets uploaded data and reshows the upload section, triggered from a button after user uploads file
function resetData() {
  userData = null;
  dataReady.value = false;
}

// Emits fileUploaded event to ToolMain when the user selects Next, sends filtered data back as an argument. Button is only shown after file is uploaded
function fileUploaded() {
  emit('fileUploaded', userData);
}
</script>

<template>
  <div class="section">
    <div class="info mb-4 border-b border-black pb-4">
      <h2 class="pb-4 text-xl font-bold">Upload Warhead Export</h2>
      <p>
        Upload a default Warhead export with Seller Helper products on it. This
        can be done by going to Dashboard > Store > Products, and clicking the
        Export button at the top of the page. Leave the options as they are, and
        then click Export. This will download a spreadsheet of all of the
        products, which can then be uploaded below.
      </p>
    </div>
    <div class="mainSection">
      <div class="uploadSection space-x-6" v-if="!dataReady">
        <button class="btn-primary" @click.prevent="backTab">Back</button>
        <input
          type="file"
          class="file:btn-primary invisible w-32 file:visible"
          id="fileUpload"
          accept=".csv"
          @change="checkFile"
        />
        <p
          class="errorMessage mt-4 w-fit rounded-sm bg-red-400/75 px-4 py-2"
          v-if="message"
        >
          {{ message }}
        </p>
      </div>
      <div class="continueSection" v-if="dataReady">
        <p class="mb-4 rounded-sm bg-slate-50/75 px-3 py-2">{{ fileName }}</p>
        <div class="space-x-6">
          <button @click.prevent="resetData" class="btn-primary">
            Change File
          </button>
          <button @click.prevent="fileUploaded" class="btn-primary">
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
