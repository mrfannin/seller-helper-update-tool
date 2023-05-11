<script setup>
  import UpdateTool from './components/UpdateTool.vue';
</script>

<template>
  <div id="app">
    <header>
      <h1>Seller Helper Update Tool</h1>
    </header>

    <main>
      <UpdateTool></UpdateTool>
    </main>
  </div>
</template>

<style scoped>
  #app {
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
  }
</style>
