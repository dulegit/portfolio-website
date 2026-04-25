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
      name: 'Roboto Slab',
      cssVariable: '--font-serif',
      weights: [400, 600],
    },
    {
      provider: fontProviders.google(),
      name: 'Nunito',
      cssVariable: '--font-sans',
      weights: [400, 600],
    },
  ],
});
