// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

const [owner, repo] = (process.env.GITHUB_REPOSITORY || '').split('/');
const defaultSite = owner ? `https://${owner}.github.io` : 'https://example.github.io';
const configuredSite = process.env.SITE_URL || defaultSite;
const configuredBase = process.env.BASE_PATH || (process.env.GITHUB_ACTIONS === 'true' && repo ? `/${repo}` : '/');

// https://astro.build/config
export default defineConfig({
  site: configuredSite,
  base: configuredBase,
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});