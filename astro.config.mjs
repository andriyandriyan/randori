import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://randori.id',
  integrations: [
    tailwind(),
    compress(),
    sitemap(),
    robotsTxt(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
});