<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Search health articles...',
  },
})

defineEmits(['update:modelValue', 'submit'])
</script>

<template>
  <form class="search-form" role="search" @submit.prevent="$emit('submit')">
    <label class="sr-only" for="article-search">Search health articles</label>
    <span class="search-icon" aria-hidden="true">⌕</span>
    <input
      id="article-search"
      :value="modelValue"
      type="search"
      :placeholder="placeholder"
      autocomplete="off"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <button type="submit">Search</button>
  </form>
</template>
