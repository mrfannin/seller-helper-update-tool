<script setup>
/** Main Component of the App
 * Child Components: UserUpload, SellerHelperManager, OutputOptions, UserOutput
 * Data: Spreadsheet data object, User Options Object
 * Usage: Switches between different sections of the app
 */

import { ref } from 'vue';
import UserUpload from './UserUpload.vue';
import OutputOptions from './OutputOptions.vue';
import UserOutput from './UserOutput.vue';

import { processData } from '../scripts/UpdateProcessor.js';

const currentTab = ref('UserUpload');

const updatedData = ref(null);

const isProcessing = ref(false);

const tabs = {
  UserUpload,
  OutputOptions,
  UserOutput,
};

// Spreadsheet data, starts null, but fills in from components as the process goes on
const data = {
  userData: null,
  userOptions: null,
  sellerHelperData: null,
};

function processBackTab(tab) {
  currentTab.value = tab;
}

function processUserData(processedData) {
  data.userData = processedData;
  currentTab.value = 'OutputOptions';
}

// Receives the options from OutputOptions
async function processOptions(options) {
  data.userOptions = options;
  isProcessing.value = true;

  // processData is a promise that eventually returns the updated data in an array
  updatedData.value = await processData(data);
  isProcessing.value = false;
  currentTab.value = 'UserOutput';
}
</script>

<template>
  <component
    :is="tabs[currentTab]"
    id="currentTab"
    @back-tab="processBackTab"
    @file-uploaded="processUserData"
    @options-submitted="processOptions"
    :data="updatedData"
  ></component>
  <div class="loaderPanel" v-if="isProcessing">
    <span class="loader"></span>
  </div>
</template>

<style scoped>
/* #currentTab {
  padding-top: 20px;
  width: 95%;
  margin: auto;
  text-align: center;
} */
</style>
