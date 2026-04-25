# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm dev          # dev server at localhost:4321
pnpm build        # production build to ./dist/
pnpm preview      # preview production build
pnpm lint         # Biome lint
pnpm format       # Biome format (writes in place)
pnpm astro check  # TypeScript/Astro type checking
```

## Architecture

Astro 6 static site with MDX, sitemap, and Tailwind CSS v4.

- **Routing**: file-based from `src/pages/` — `.astro` and `.md`/`.mdx` files become routes
- **Styling**: Tailwind v4 loaded via `@import "tailwindcss"` in `src/styles/global.css`; configured as a Vite plugin (no `tailwind.config.*` file)
- **Content**: MDX integration enabled — pages can use `.mdx` and import/render components
- **Sitemap**: auto-generated at build time; update `site` in `astro.config.mjs` from `https://example.com`

## Linting & Formatting

Biome (not ESLint/Prettier). Key rules enforced:
- `useImportType`: `error` — use `import type` for type-only imports
- `useConsistentArrayType`: `error` — prefer `Type[]` over `Array<Type>`
- Single quotes, 2-space indent, 100 char line width, trailing commas everywhere except JSON

TypeScript extends `astro/tsconfigs/strict`.
