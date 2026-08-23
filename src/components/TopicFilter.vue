<script setup>
defineProps({
  topics: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="topic-row" aria-label="Filter by topic">
    <button
      class="topic-chip"
      :class="{ selected: modelValue === '' }"
      type="button"
      @click="$emit('update:modelValue', '')"
    >
      All topics
    </button>

    <button
      v-for="topic in topics"
      :key="topic.slug"
      class="topic-chip"
      :class="{ selected: modelValue === topic.slug }"
      type="button"
      @click="$emit('update:modelValue', topic.slug)"
    >
      {{ topic.name }}
    </button>
  </div>
</template>
