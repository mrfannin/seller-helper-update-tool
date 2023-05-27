<script setup>
/**
 * Data: User Options choses
 * Usage: Shows the options for the updated data, pricing formula and quantity options
 *        Emits choices back to ToolMain when done
 */

import { ref } from 'vue';

const emit = defineEmits(['backTab', 'optionsSubmitted']);

const options = ref({
  priceToggle: 'Yes',
  pricePercentage: 25,
  enabledToggle: 'Yes',
  enabledCutoff: 1,
});

// Emits an event to return back to the Upload section
function backTab() {
  emit('backTab', 'UserUpload');
}

// Emits an event to submit options to ToolMain
function submitOptions() {
  emit('optionsSubmitted', options.value);
}
</script>

<template>
  <div class="section">
    <div class="info border-b border-black pb-4 mb-4">
      <h2 class="text-xl font-bold pb-4">Choose Options</h2>
      <p>Select the options below for the updated spreadsheet.</p>
    </div>
    <div class="mainSection">
      <form class="flex flex-col space-y-4 text-lg">
        <div class="flex justify-between space-x-60">
          <label for="priceToggle" id="priceToggleLabel"
            >Use Automated Pricing?</label
          >
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
          <label for="enabledToggle" id="EnabledToggleLabel"
            >Use Automated Enabling?</label
          >
          <select id="enabledToggle" v-model="options.enabledToggle" class="w-20">
            <option value="Yes" selected>Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div class="flex justify-between" v-if="options.enabledToggle === 'Yes'">
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
    <div class="continueButtons space-x-6 mt-8">
      <button class="btn-primary" @click.prevent="backTab">Back</button>
      <button class="btn-primary" @click.prevent="submitOptions">Continue</button>
    </div>
  </div>
</template>

<style scoped>
/* form div {
  display: flex;
  width: 80%;
  margin: auto;
  justify-content: space-between;
  font-size: 18px;
  margin-top: 10px;
}

form {
  margin-bottom: 10px;
}

input {
  width: 48px;
  height: 20px;
  padding-left: 2px;
}

select {
  width: 54px;
} */
</style>
