# HealthWaka Frontend

HealthWaka is a responsive health-information web application built for the technical assessment. It provides a simple way to browse published health content, filter and search articles, switch between English and Nigerian Pidgin, and ask grounded health questions.

## Stack

- Vue 3
- Vite
- Vue Router
- JavaScript
- Vitest + Vue Test Utils
- ESLint / Oxlint / Prettier

The frontend communicates with a separate Django REST API. AI requests are sent to the backend; no Gemini credentials are exposed to the browser.

## Features

- Browse published health articles
- Search article content
- Filter articles by topic
- View article details
- Switch between English and Nigerian Pidgin when a translation exists
- Fall back to English when the requested translation is unavailable
- Ask a health question and receive an answer grounded in published health content
- Display source articles used for an AI answer
- Responsive layout for desktop and mobile
- Loading, empty, and error states

## Local development

Requirements: Node.js and npm.

```bash
npm install
```

Create `.env` from `.env.example` and point the API URL at the local Django server:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Start the development server:

```bash
npm run dev
```

## Production build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Tests and linting

```bash
npm run test:unit
npm run lint
```

## Deployment

The frontend is designed for deployment as a Vite application on Vercel. Set `VITE_API_BASE_URL` to the deployed Django API before creating the production build.

Because Vue Router uses history mode, the hosting platform must rewrite application routes to the SPA entry point. The Vercel configuration in this repository handles that requirement.

## Backend

The frontend expects the Django API to expose endpoints for articles, topics, languages, and health questions. See the backend repository for the API implementation and engineering decisions.
