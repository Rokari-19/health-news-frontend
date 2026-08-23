<script setup>
defineProps({
  title: { type: String, required: true },
  message: { type: String, default: '' },
  tone: { type: String, default: 'neutral' },
})
</script>

<template>
  <div class="state-card" :class="`state-${tone}`">
    <h2>{{ title }}</h2>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
