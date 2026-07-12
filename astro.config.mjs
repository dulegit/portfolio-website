import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  build: {
    // Single-page site: inline all CSS into the HTML <head> so it ships with
    // the document and never blocks the first paint on a separate request.
    // REVISIT when adding blog posts / multiple pages: switch to 'auto' (the
    // default) so the shared stylesheet is linked externally and cached across
    // page navigations instead of re-inlined into every page.
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    responsiveStyles: true,
  },
  // REVISIT when adding blog posts / multiple pages: re-add `prefetch` to speed
  // up navigation between internal pages. Prefer a measured strategy over the
  // old `prefetchAll: true` + 'viewport' setup, e.g.:
  //   prefetch: { defaultStrategy: 'hover' }
  // It was removed here because a single-page site has no internal links to
  // prefetch — the script was pure dead weight (an unused ~1.5KB JS request).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Nunito Sans',
      cssVariable: '--font-sans',
      weights: [400, 500, 600, 700, 900],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: [400, 500],
    },
  ],
});
