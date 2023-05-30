<script setup>
const emit = defineEmits(['changeTab'])

function nextTab(){
  emit('changeTab', 'UserUpload');
}
</script>

<template>
  <div>
    <div class="text-lg space-y-2">
      <p>This tool can be used to download updated data for products from The Seller Helper. It also allows you to set the
        pricing and enabled options as you download.</p>
      <p>For a video tutorial on how to use this tool, <a href="" class="text-slate-500 hover:text-slate-400">click here</a>.</p>
    </div>
    <div class="mt-4">
      <button class="btn-primary" @click.prevent="nextTab">Next</button>
    </div>
  </div>
</template>