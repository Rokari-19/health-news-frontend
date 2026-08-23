import { request } from './client'

export function getArticles({ search = '', topic = '', language = 'en' } = {}) {
  const params = new URLSearchParams({ language })
  if (search.trim()) params.set('search', search.trim())
  if (topic) params.set('topic', topic)

  return request(`/articles/?${params.toString()}`)
}

export function getArticle(slug, language = 'en') {
  const params = new URLSearchParams({ language })
  return request(`/articles/${encodeURIComponent(slug)}/?${params.toString()}`)
}

export function getTopics() {
  return request('/topics/')
}

export function getLanguages() {
  return request('/languages/')
}
