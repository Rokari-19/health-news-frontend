<script setup>
defineProps({
  article: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="article-card">
    <div class="article-card-meta">
      <span class="topic-label">{{ article.topic?.name }}</span>
      <span v-if="article.last_updated">{{ article.last_updated }}</span>
    </div>

    <h2>{{ article.title }}</h2>
    <p>{{ article.summary || 'Read the full article for more information.' }}</p>

    <div class="article-card-footer">
      <span v-if="article.fallback" class="fallback-label">English version shown</span>
      <RouterLink class="text-link" :to="`/articles/${article.slug}`">Read article <span aria-hidden="true">→</span></RouterLink>
    </div>
  </article>
</template>
