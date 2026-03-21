# Nuxt 3 Boilerplate

An opinionated [Nuxt 3](https://nuxt.com) boilerplate with Tailwind CSS, Flowbite, Pinia, PWA support, `@nuxt/content` (document-driven), and Kysely — ready for any deployment platform.

## Features

- **Nuxt 3** with TypeScript
- **Tailwind CSS** + **Flowbite** component library
- **Pinia** state management with persistence
- **@nuxt/content** (document-driven) + `nuxt-content-assets`
- **@vite-pwa/nuxt** for progressive web app support
- **Kysely** query builder (bring your own dialect)
- **FontAwesome 7** icon integration
- **Color mode** (dark/light) via `@nuxtjs/color-mode`
- Platform-agnostic — no vendor lock-in

## Setup

```bash
# Clone the repository (with content submodule)
git clone --recurse-submodules https://github.com/YOUR_ORG/YOUR_REPO

# Install dependencies
bun install

# Copy and configure environment variables
cp .env.example .env
```

## Development

```bash
bun run dev
```

The dev server starts at http://localhost:3000.

## Production

```bash
# Build for production
bun run build

# Preview the production build locally
bun run preview
```

## Project Structure

```
assets/css/          CSS stylesheets (Tailwind, admin, markdown)
components/          Vue components
content/             Markdown content (@nuxt/content)
database/            Database repositories (Kysely)
docs/examples/       Optional feature examples (auth, content-submodule)
helpers/             Utility functions
layouts/             Nuxt layouts
middleware/          Client-side route middleware
migrations/          Database migration scripts
models/              Data models
pages/               File-based routing
plugins/             Nuxt plugins (FontAwesome, Chart.js)
server/
  ├── middleware/    Server middleware
  ├── routes/v1/    API routes
  └── utils/        Server utilities
settings/            App constants
store/               Pinia stores
types/               TypeScript type definitions
```

## Optional Modules

See `docs/examples/` for drop-in patterns:

- **Auth** — JWT authentication with RBAC, Pinia store, and route middleware
- **Content Submodule** — Git submodule pattern for shared documentation

## Deployment

This template is platform-agnostic. Check the [Nuxt deployment docs](https://nuxt.com/docs/getting-started/deployment) for guidance on deploying to your platform of choice.

## License

[MIT](./LICENSE)
