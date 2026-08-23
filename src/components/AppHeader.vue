<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isAskPage = computed(() => route.name === 'ask')
</script>

<template>
  <header class="site-header">
    <div class="shell header-inner">
      <RouterLink class="brand" to="/" aria-label="HealthWaka home">
        <span class="brand-mark">HW</span>
        <span>
          <strong>HealthWaka</strong>
          <small>Health information, made clearer.</small>
        </span>
      </RouterLink>

      <nav class="main-nav" aria-label="Main navigation">
        <RouterLink to="/" :class="{ active: route.name === 'home' }">Explore</RouterLink>
        <RouterLink to="/ask" :class="{ active: isAskPage }">Ask HealthWaka</RouterLink>
      </nav>
    </div>
  </header>
</template>
