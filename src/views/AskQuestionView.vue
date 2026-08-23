<script setup>
import { computed, ref } from 'vue'
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import StateMessage from '../components/StateMessage.vue'
import { askHealthQuestion } from '../api/questions'

const question = ref('')
const language = ref(localStorage.getItem('healthwaka-language') || 'en')
const answer = ref(null)
const loading = ref(false)
const error = ref('')

const canSubmit = computed(() => question.value.trim().length > 0 && !loading.value)

function selectLanguage(value) {
  language.value = value
  localStorage.setItem('healthwaka-language', value)
  answer.value = null
  error.value = ''
}

async function submitQuestion() {
  if (!canSubmit.value) return

  loading.value = true
  error.value = ''
  answer.value = null

  try {
    answer.value = await askHealthQuestion(question.value.trim(), language.value)
  } catch (requestError) {
    error.value = requestError.message || 'The health assistant is unavailable right now.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="shell ask-page">
    <section class="ask-intro">
      <span class="eyebrow">HealthWaka assistant</span>
      <h1>Ask a health question.</h1>
      <p>
        Get a concise answer grounded in the published HealthWaka library. If the available
        articles do not contain enough information, the assistant will say so rather than guess.
      </p>
    </section>

    <section class="question-card">
      <div class="question-card-top">
        <LanguageSwitcher :model-value="language" @update:model-value="selectLanguage" />
      </div>

      <form @submit.prevent="submitQuestion">
        <label for="health-question">What would you like to know?</label>
        <textarea
          id="health-question"
          v-model="question"
          rows="6"
          maxlength="1000"
          placeholder="For example: How can I reduce my risk of malaria?"
        ></textarea>
        <div class="question-actions">
          <span>{{ question.length }}/1000</span>
          <button class="button button-primary" type="submit" :disabled="!canSubmit">
            {{ loading ? 'Thinking…' : 'Ask HealthWaka' }}
          </button>
        </div>
      </form>
    </section>

    <section v-if="loading" class="answer-card answer-loading" aria-live="polite">
      <span class="spinner" aria-hidden="true"></span>
      <p>Reading the published health content…</p>
    </section>

    <StateMessage
      v-else-if="error"
      title="We could not answer that"
      :message="error"
      tone="error"
    />

    <section v-else-if="answer" class="answer-card" aria-live="polite">
      <div class="answer-heading">
        <span class="eyebrow">Answer</span>
        <h2>Your question, answered from the library.</h2>
      </div>
      <p class="answer-text">{{ answer.answer }}</p>

      <div v-if="answer.sources?.length" class="sources">
        <h3>Sources</h3>
        <RouterLink
          v-for="source in answer.sources"
          :key="source.article_id"
          class="source-item"
          :to="`/articles/${source.slug}`"
        >
          <span>
            <strong>{{ source.title }}</strong>
            <small>{{ source.language === 'pcm' ? 'Nigerian Pidgin' : 'English' }}</small>
          </span>
          <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </section>
  </main>
</template>
