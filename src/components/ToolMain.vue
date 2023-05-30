<script setup>
/** Main Component of the App
 * Child Components: UserUpload, SellerHelperManager, OutputOptions, UserOutput
 * Data: Spreadsheet data object, User Options Object
 * Usage: Switches between different sections of the app
 */

import { ref } from 'vue';
import Intro from './Intro.vue';
import UserUpload from './UserUpload.vue';
import OutputOptions from './OutputOptions.vue';
import UserOutput from './UserOutput.vue';
import Navigation from './Navigation.vue';

import { processData } from '../scripts/UpdateProcessor.js';

const currentTab = ref('Intro');

const updatedData = ref(null);

const isProcessing = ref(false);

const tabs = {
  Intro,
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

function processChangeTab(tab) {
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
  <div
    class="flex h-full w-full justify-between divide-x-2 divide-slate-400/25"
  >
    <Navigation class="min-w-max basis-1/6 px-6 text-center" :current-tab="currentTab"></Navigation>
    <component
      :is="tabs[currentTab]"
      id="currentTab"
      @change-tab="processChangeTab"
      @file-uploaded="processUserData"
      @options-submitted="processOptions"
      :data="updatedData"
      class="flex basis-5/6 flex-col items-center px-20 pt-6 text-center"
    ></component>
  </div>
  <div
    class="loaderPanel fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-600/25 text-center"
    v-if="isProcessing"
  >
    <svg
      class="mr-2 h-28 w-28 animate-spin fill-black text-gray-200 dark:text-gray-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
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
