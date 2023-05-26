<script setup>
import ToolMain from './components/ToolMain.vue';
</script>

<template>
  <div
    class="relative flex flex-col items-center top-20 mx-auto h-3/4 w-10/12 max-w-screen-xl rounded-md bg-gray-200/75 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
  >
    <header class="mt-4 pb-2 text-3xl w-full text-center border-b-2 border-slate-400/25">
      <h1>Seller Helper Update Tool</h1>
    </header>
    <main class="w-full h-full">
      <ToolMain></ToolMain>
    </main>
  </div>
</template>

<style scoped>
/* #app {
    position: fixed;
    left: 32%;
    top: 12%;
    width: 36%;
    height: 70%;
    margin: auto;
    background-color: #D3D3D3;
    padding-top: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  header {
    text-align: center;
  }

  main {
    width: 85%;
    margin: auto;
  } */
</style>
