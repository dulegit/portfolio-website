# Astro Starter

A minimal, production-ready Astro starter for static client sites. Ships with
a CMS abstraction layer backed by local Markdown/MDX (Content Collections),
Tailwind v4 with shadcn-style design tokens, six core primitives built as pure
`.astro` components, and Biome for lint + format.

**No UI framework runtime by default.** Primitives are server-rendered. Add
Vue or React only when a specific project needs client-side interactivity.

## Quick start

```sh
pnpm install
pnpm dev
```

## Primitives

Six core components built as pure `.astro` — zero client JS:

| Component | Purpose |
| --- | --- |
| `Button` | `default`, `destructive`, `outline`, `secondary`, `ghost`, `link` variants |
| `Card` (+ sub-components) | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| `Input` | Styled form input with focus + invalid states |
| `Badge` | `default`, `secondary`, `destructive`, `outline` variants |
| `Container` | Layout wrapper, `sm` / `default` / `lg` / `xl` / `full` widths |
| `Heading` | Decouples semantic level (`as="h1"`) from visual size (`size="3xl"`) |

```astro
---
import Button from '@/components/primitives/button.astro';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/primitives/card';
---

<Card>
  <CardHeader>
    <CardTitle as="h2">Title</CardTitle>
  </CardHeader>
  <CardContent>
    <Button variant="outline">Action</Button>
  </CardContent>
</Card>
```

## Design tokens

Everything visual is driven by CSS variables in `src/styles/global.css`.
Per-project branding = editing that one file. OKLCH color space, same tokens
as shadcn/ui v4 (`--primary`, `--muted-foreground`, `--radius`, etc.), so when
you later install real shadcn components they inherit your tokens automatically.

Dark mode ships out of the box — add `class="dark"` to `<html>` to toggle.

## Relationship to shadcn/ui

This starter adopts shadcn's **design language** (tokens, variant patterns,
`cn()` helper) but renders primitives as pure Astro components — no React
runtime, no hydration.

**When a project needs a complex interactive component** (Dialog, DropdownMenu,
Popover, Combobox, Tooltip — anything built on Radix):

```sh
pnpm astro add react
npx shadcn@latest init    # detects existing tokens, doesn't overwrite
npx shadcn@latest add dialog
```

The shadcn CLI will install the React component next to your primitives. It
uses the same `--primary`, `--border`, `--radius` variables already defined in
`global.css`, so visual consistency is free. Use the React component as a
`client:*` island where you need it; keep using the Astro primitives everywhere
else.

## Adding interactivity

For simple UI (menus, accordions, toggles, small forms), a `<script>` tag
inside an `.astro` component ships zero framework runtime:

```astro
<button id="menu-toggle">Menu</button>
<script>
  document.getElementById('menu-toggle')?.addEventListener('click', () => {
    document.documentElement.classList.toggle('menu-open');
  });
</script>
```

Reach for a framework when state gets complex or you need a specific library.

## The CMS abstraction

Never import from `astro:content` directly. Import from `src/lib/cms`:

```ts
import { cms } from '@/lib/cms';

const post = await cms.getPost('hello-world');
const { items, hasMore } = await cms.listPosts({ limit: 10, tag: 'astro' });
```

### Files

```
src/
├── types/cms.ts                    # Shared types (CMSProvider interface)
├── content.config.ts               # Zod schemas for Content Collections
├── lib/
│   ├── utils.ts                    # cn() helper
│   └── cms/
│       ├── index.ts                # Public API
│       └── local.ts                # Content Collections implementation
├── styles/global.css               # Tokens + Tailwind v4 + base layer
├── components/primitives/          # Six Astro primitives
│   ├── button.astro
│   ├── card/
│   │   ├── index.ts                # Barrel re-export
│   │   ├── card.astro
│   │   ├── card-header.astro
│   │   ├── card-title.astro
│   │   ├── card-description.astro
│   │   ├── card-content.astro
│   │   └── card-footer.astro
│   ├── input.astro
│   ├── badge.astro
│   ├── container.astro
│   └── heading.astro
├── layouts/base-layout.astro       # Imports global.css
└── pages/                          # Thin compositions
```

Adding a new CMS backend = new file implementing `CMSProvider`, then swap the
export in `src/lib/cms/index.ts`. No page or component needs to change.

## Conventions

- **Primitives** (`src/components/primitives/`): styling-only Astro
  components. No data fetching, no business logic.
- **Modules** (`src/components/modules/`, build as needed): Hero, FeatureGrid,
  etc. Accept typed props matching CMS types. Server-rendered.
- **Islands** (`src/components/islands/`, only if framework added): Vue or
  React components, hydrated with `client:*` directives.
- **Pages** (`src/pages/`): Thin compositions. Fetch via `cms`, pass to modules.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start dev server |
| `pnpm build` | Type-check + build production |
| `pnpm preview` | Preview production build |
| `pnpm check` | Astro type check |
| `pnpm lint` | Biome lint |
| `pnpm format` | Biome format (write) |
| `pnpm check:all` | Biome lint + format + fix |
