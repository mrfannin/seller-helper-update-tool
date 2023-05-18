<script setup>
/** Main Component of the App
 * Child Components: NavigationBar, UserUpload, SellerHelperManager, OutputOptions, UserOutput
 * Data: Spreadsheet data object, User Options Object
 * Usage: Switches between different sections of the app, user can use navigation to move back if needed
 */

import { ref } from 'vue';
import NavigationBar from './NavigationBar.vue';
import UserUpload from './UserUpload.vue';
import SellerHelperManager from './SellerHelperManager.vue';
import OutputOptions from './OutputOptions.vue';
import UserOutput from './UserOutput.vue';

const currentTab = ref('UserUpload');

const tabs = {
  UserUpload,
  OutputOptions,
  UserOutput,
};

// Spreadsheet data, starts null, but fills in from components as the process goes on
const data = {
  userData: null,
  sellerHelperData: null,
  updatedData: null
}

function processUserData(data) {
  data.userData = data;
  currentTab.value = 'OutputOptions';
  console.log(data.userData);
}
</script>

<template>
  <component :is="tabs[currentTab]" id="currentTab" @file-uploaded="processUserData"></component>
</template>

<style scoped>
  #currentTab {
    padding-top: 20px;
    width: 95%;
    margin: auto;
    text-align: center;
  }
</style>
