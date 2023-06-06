<script setup>
/**
 * Tab for the user to select the options they want on the file.
 * Primarily a form in the template with the different options.
 */

import { ref } from 'vue';
import HelpTooltip from './HelpTooltip.vue';

const emit = defineEmits(['changeTab', 'optionsSubmitted']);

// All of the options are connected to the form with v-model
// pricePercentage and enabledCutoff only show when the toggles are Yes
const options = ref({
  priceToggle: 'Yes',
  pricePercentage: 25,
  enabledToggle: 'Yes',
  enabledCutoff: 1,
});

// Emits an event to return back to the Upload section
function backTab() {
  emit('changeTab', 'UploadTab');
}

// Emits an event to ToolMain with the selected options as a parameter
function submitOptions() {
  emit('optionsSubmitted', options.value);
}
</script>

<template>
  <div class="section">
    <div class="info mb-4 border-b border-black pb-4">
      <h2 class="pb-4 text-xl font-bold">Choose Options</h2>
      <p>Select the options below for the updated spreadsheet.</p>
    </div>
    <div class="mainSection">
      <form class="flex flex-col space-y-4 text-lg">
        <div class="flex justify-between space-x-60">
          <div class="relative">
            <label for="priceToggle" id="priceToggleLabel"
              >Use Automated Pricing?</label
            >
            <HelpTooltip class="absolute right-[206px] top-0"
              >Adds a Price column to the spreadsheet, with the formula Price =
              Cost * Percentage</HelpTooltip
            >
          </div>
          <select id="priceToggle" v-model="options.priceToggle" class="w-20">
            <option value="Yes" selected>Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div class="flex justify-between" v-if="options.priceToggle === 'Yes'">
          <label for="pricePercentage" id="pricePercentageLabel"
            >Markup Percentage:</label
          >
          <input
            id="pricePercentage"
            type="number"
            min="0"
            max="100"
            v-model="options.pricePercentage"
            class="w-20"
          />
        </div>
        <div class="flex justify-between">
          <div class="relative">
            <label for="enabledToggle" id="EnabledToggleLabel"
              >Use Automated Enabling?</label
            >
            <HelpTooltip class="absolute right-[220px] top-0"
              >Adds an Enabled column. Sets option to 1 if the quantity is equal
              to or above the minimum, and sets it to 0 if it is
              below.</HelpTooltip
            >
          </div>
          <select
            id="enabledToggle"
            v-model="options.enabledToggle"
            class="w-20"
          >
            <option value="Yes" selected>Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div
          class="flex justify-between"
          v-if="options.enabledToggle === 'Yes'"
        >
          <label for="enabledCutoff" id="enabledCutoffLabel"
            >Minimum Quantity to Enable:</label
          >
          <input
            id="enabledCutoff"
            type="number"
            min="0"
            max="100"
            v-model="options.enabledCutoff"
            class="w-20"
          />
        </div>
      </form>
    </div>
    <div class="continueButtons mt-8 space-x-6">
      <button class="btn-primary" @click.prevent="backTab">Back</button>
      <button class="btn-primary" @click.prevent="submitOptions">
        Continue
      </button>
    </div>
  </div>
</template>
