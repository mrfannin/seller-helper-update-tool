<script setup>
import ToolMain from './components/ToolMain.vue';
</script>

<template>
  <div
    class="relative flex flex-col items-center top-40 mx-auto h-1/2 min-h-max w-10/12 max-w-screen-xl rounded-md bg-gray-200/75 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
  >
    <header class="mt-4 pb-2 text-3xl w-full text-center border-b-2 border-slate-400/25">
      <h1>Seller Helper Update Tool</h1>
    </header>
    <main class="w-full h-full">
      <ToolMain></ToolMain>
    </main>
  </div>
</template>
