<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import LoadingState from '../components/LoadingState.vue'
import StateMessage from '../components/StateMessage.vue'
import { getArticle } from '../api/articles'

const route = useRoute()
const router = useRouter()
const article = ref(null)
const language = ref(localStorage.getItem('healthwaka-language') || 'en')
const loading = ref(true)
const error = ref('')

async function loadArticle() {
  loading.value = true
  error.value = ''
  try {
    article.value = await getArticle(route.params.slug, language.value)
  } catch (requestError) {
    article.value = null
    error.value = requestError.message || 'We could not load this article.'
  } finally {
    loading.value = false
  }
}

function selectLanguage(value) {
  language.value = value
  localStorage.setItem('healthwaka-language', value)
}

watch(language, loadArticle)

onMounted(loadArticle)
</script>

<template>
  <main class="shell article-page">
    <RouterLink class="back-link" to="/">← Back to articles</RouterLink>

    <LoadingState v-if="loading" />
    <StateMessage
      v-else-if="error"
      title="Article unavailable"
      :message="error"
      tone="error"
    />
    <article v-else-if="article" class="article-detail">
      <div class="article-detail-header">
        <div>
          <div class="article-card-meta">
            <span class="topic-label">{{ article.topic?.name }}</span>
            <span v-if="article.last_updated">Updated {{ article.last_updated }}</span>
          </div>
          <h1>{{ article.title }}</h1>
          <p class="article-lede">{{ article.summary }}</p>
        </div>
        <LanguageSwitcher
          :model-value="language"
          :fallback="article.fallback"
          @update:model-value="selectLanguage"
        />
      </div>

      <div class="article-byline" v-if="article.author">
        Published by <strong>{{ article.author }}</strong>
      </div>

      <div class="article-body">
        <p v-for="(paragraph, index) in article.body.split(/\n\s*\n/).filter(Boolean)" :key="index">
          {{ paragraph.trim() }}
        </p>
      </div>
    </article>
  </main>
</template>
