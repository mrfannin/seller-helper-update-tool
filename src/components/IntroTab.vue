<script setup>
/**
 * Starting tab in the app.
 * Has an intro and link to the tutorial video, and a button to move to the Upload Tab.
 */
const emit = defineEmits(['changeTab']);

// Emits changeTab event to ToolMain to change to UploadTab
function nextTab() {
  emit('changeTab', 'UploadTab');
}
</script>

<template>
  <div class="mb-12 flex justify-center">
    <div class="space-y-2 text-lg">
      <p>
        This tool can be used to download updated data for products from The
        Seller Helper. It also allows you to set the pricing and enabled options
        as you download.
      </p>
      <p>
        For a video tutorial on how to use this tool,
        <a href="" class="text-slate-500 hover:text-slate-400">click here</a>.
      </p>
    </div>
    <div class="mt-4">
      <button class="btn-primary" @click.prevent="nextTab">Start</button>
    </div>
  </div>
</template>
