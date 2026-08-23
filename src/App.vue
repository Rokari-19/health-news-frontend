<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="app-root">
    <AppHeader />
    <main class="app-main">
      <RouterView />
    </main>
    <footer class="site-footer">
      <div class="shell footer-inner">
        <span>HealthWaka</span>
        <span>Health information should be understandable.</span>
      </div>
    </footer>
  </div>
</template>
