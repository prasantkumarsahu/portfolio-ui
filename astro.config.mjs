// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';

// Public URL of the deployed site (e.g. https://yourname.dev), set in .env or the host's
// environment. Canonical URLs, the sitemap and absolute social-card URLs need it.
const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  site: SITE_URL || undefined,
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()]
  }
});
