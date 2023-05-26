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
import Navigation from './Navigation.vue';

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
  <div class="flex w-full h-full justify-between divide-x-2 divide-slate-400/25">
    <Navigation class="basis-1/6 min-w-max px-6 text-center"></Navigation>
    <component
      :is="tabs[currentTab]"
      id="currentTab"
      @back-tab="processBackTab"
      @file-uploaded="processUserData"
      @options-submitted="processOptions"
      :data="updatedData"
      class="pt-6 px-20 basis-5/6 text-center flex flex-col items-center"
    ></component>
  </div>
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
