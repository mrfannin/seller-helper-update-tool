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
    <div class="info">
      <p>Select the options for the updated spreadsheet.</p>
    </div>
    <div class="mainSection">
      <form>
        <div>
          <label for="priceToggle" id="priceToggleLabel"
            >Use Automated Pricing?</label
          >
          <select id="priceToggle" v-model="options.priceToggle">
            <option value="Yes" selected>Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div v-if="options.priceToggle === 'Yes'">
          <label for="pricePercentage" id="pricePercentageLabel"
            >Markup Percentage:</label
          >
          <input
            id="pricePercentage"
            type="number"
            min="0"
            max="100"
            v-model="options.pricePercentage"
          />
        </div>
        <div>
          <label for="enabledToggle" id="EnabledToggleLabel"
            >Use Automated Enabling?</label
          >
          <select id="enabledToggle" v-model="options.enabledToggle">
            <option value="Yes" selected>Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div v-if="options.enabledToggle === 'Yes'">
          <label for="enabledCutoff" id="enabledCutoffLabel"
            >Minimum Quantity to Enable:</label
          >
          <input
            id="enabledCutoff"
            type="number"
            min="0"
            max="100"
            v-model="options.enabledCutoff"
          />
        </div>
      </form>
    </div>
    <div class="continueButtons">
      <p class="button" @click.prevent="backTab">Back</p>
      <p class="button" @click.prevent="submitOptions">Continue</p>
    </div>
  </div>
</template>

<style scoped>
form div {
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
}
</style>
