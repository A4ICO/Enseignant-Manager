<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>
  
  <header class="w-100 sticky-top">
    <NavBar></NavBar>
  </header>

  <main class="container mt-4">
    <RouterView />
  </main>

</template>

<style scoped>
</style>