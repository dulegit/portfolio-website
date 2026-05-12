import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    responsiveStyles: true,
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Nunito Sans',
      cssVariable: '--font-sans',
      weights: [300, 400, 500, 600, 700, 900],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: [400, 500],
    },
  ],
});
