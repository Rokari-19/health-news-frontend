<script setup>
import { onMounted, ref, watch } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'
import SearchBar from '../components/SearchBar.vue'
import StateMessage from '../components/StateMessage.vue'
import TopicFilter from '../components/TopicFilter.vue'
import LoadingState from '../components/LoadingState.vue'
import { getArticles, getTopics } from '../api/articles'

const articles = ref([])
const topics = ref([])
const search = ref('')
const selectedTopic = ref('')
const language = ref(localStorage.getItem('healthwaka-language') || 'en')
const loading = ref(true)
const error = ref('')
let searchTimer

async function loadTopics() {
  try {
    topics.value = await getTopics()
  } catch {
    topics.value = []
  }
}

async function loadArticles() {
  loading.value = true
  error.value = ''

  try {
    articles.value = await getArticles({
      search: search.value,
      topic: selectedTopic.value,
      language: language.value,
    })
  } catch (requestError) {
    error.value = requestError.message || 'We could not load the health articles.'
  } finally {
    loading.value = false
  }
}

function submitSearch() {
  loadArticles()
}

function updateSearch(value) {
  search.value = value
  clearTimeout(searchTimer)
  searchTimer = setTimeout(loadArticles, 350)
}

watch(selectedTopic, loadArticles)
watch(language, (value) => {
  localStorage.setItem('healthwaka-language', value)
  loadArticles()
})

onMounted(async () => {
  await Promise.all([loadTopics(), loadArticles()])
})
</script>

<template>
  <div class="page-shell">
    <section class="hero shell">
      <div class="hero-copy">
        <span class="eyebrow">Community health library</span>
        <h1>Health information that makes sense.</h1>
        <p>
          Explore practical health articles from a single, searchable library, with Nigerian
          Pidgin support when a translated version is available.
        </p>
        <div class="hero-actions">
          <RouterLink class="button button-primary" to="/ask">Ask a health question</RouterLink>
          <a class="button button-secondary" href="#articles">Browse articles</a>
        </div>
      </div>
      <div class="hero-panel" aria-hidden="true">
        <span class="hero-orb hero-orb-one"></span>
        <span class="hero-orb hero-orb-two"></span>
        <div class="hero-card">
          <span class="mini-label">HealthWaka</span>
          <strong>Learn. Understand. Act.</strong>
          <p>Clear information, grounded in the published health library.</p>
        </div>
      </div>
    </section>

    <main id="articles" class="shell content-section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Explore</span>
          <h2>Health articles</h2>
        </div>
        <p>Search by topic or phrase to find what you need.</p>
      </div>

      <div class="controls-card">
        <SearchBar :model-value="search" @update:model-value="updateSearch" @submit="submitSearch" />
        <TopicFilter v-model="selectedTopic" :topics="topics" />
      </div>

      <LoadingState v-if="loading" />
      <StateMessage
        v-else-if="error"
        title="Could not load the library"
        :message="error"
        tone="error"
      />
      <StateMessage
        v-else-if="articles.length === 0"
        title="No articles found"
        message="Try a different search phrase or choose another topic."
      />
      <div v-else class="article-grid">
        <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
      </div>
    </main>
  </div>
</template>
