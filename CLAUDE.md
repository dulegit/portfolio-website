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
- **Path alias**: `@/` resolves to `src/`

### Component layers

Two distinct layers under `src/components/`:

- **`primitives/`** — atomic UI building blocks (Button, Badge, Card, Heading, Input, Container). Use `cva` for variant logic and `cn` (`src/lib/utils.ts`) for class merging. Follow the shadcn/ui pattern: `buttonVariants` exported separately so non-`<button>` elements can apply the same classes.
- **`modules/`** — full-width page sections (Hero, FeatureGrid, FAQ, CTA, RichText). Composed from primitives. Import via the barrel `@/components/modules`. Each module accepts CMS-agnostic props; map CMS data to module props in the page frontmatter.

### CMS abstraction

`src/lib/cms/` exports a `CMSProvider` interface (`src/types/cms.ts`) with methods for pages, posts, and authors. Currently wired to the local Astro Content Collections provider (`local.ts`). To swap in a headless CMS, implement `CMSProvider` and update the re-export in `src/lib/cms/index.ts`.

Content collections (defined in `src/content.config.ts`) expect files at:
- `src/content/pages/` — `title`, optional `seo`
- `src/content/posts/` — `title`, `excerpt`, `publishedAt`, optional `heroImage`, `author` (slug ref), `tags`, `seo`
- `src/content/authors/` — `name`, optional `bio`, `avatar`

### Styling

`src/styles/global.css` is the single file to edit for rebranding. Tokens use the OKLCH color space and follow the shadcn/ui v4 naming convention (`--primary`, `--muted-foreground`, etc.). Dark mode activates via the `.dark` class on a parent element. `@theme inline` maps all CSS variables into Tailwind utilities (`bg-primary`, `text-muted-foreground`, `rounded-md`, etc.).

Fonts (Roboto Slab for `--font-serif`, Nunito for `--font-sans`) are declared in `astro.config.mjs` and preloaded in `BaseLayout` via `<Font cssVariable="..." />`.

### Types

- `src/types/cms.ts` — CMS-shaped data types (`Post`, `Page`, `Author`, `CMSProvider`)
- `src/types/modules.ts` — UI-shaped types (`CTALink`) used directly in module props; map from CMS types to these in pages

## Linting & Formatting

Biome (not ESLint/Prettier). Key rules enforced:
- `useImportType`: `error` — use `import type` for type-only imports
- `useConsistentArrayType`: `error` — prefer `Type[]` over `Array<Type>`
- Single quotes, 2-space indent, 100 char line width, trailing commas everywhere except JSON

TypeScript extends `astro/tsconfigs/strict`.
