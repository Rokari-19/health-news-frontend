import { request } from './client'

export function askHealthQuestion(question, language = 'en') {
  return request('/ask/', {
    method: 'POST',
    body: JSON.stringify({
      question,
      language,
    }),
  })
}
