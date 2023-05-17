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

// Spreadsheet data, starts null, but fills in from
</script>

<template>
  <component :is="tabs[currentTab]"></component>
</template>

<style scoped></style>
