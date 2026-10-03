import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://swipe-italia.org',
  integrations: [sitemap()],
  vite: {
    envDir: fileURLToPath(new URL('../..', import.meta.url)),
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: { prefixDefaultLocale: true },
  },
});
