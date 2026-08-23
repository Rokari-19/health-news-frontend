<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'en',
  },
  fallback: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="language-switcher" aria-label="Content language">
    <span class="language-label">Language</span>
    <div class="language-options">
      <button
        type="button"
        :class="{ selected: modelValue === 'en' }"
        @click="$emit('update:modelValue', 'en')"
      >
        English
      </button>
      <button
        type="button"
        :class="{ selected: modelValue === 'pcm' }"
        @click="$emit('update:modelValue', 'pcm')"
      >
        Nigerian Pidgin
      </button>
    </div>
    <span v-if="fallback" class="fallback-label">Pidgin unavailable, showing English</span>
  </div>
</template>
