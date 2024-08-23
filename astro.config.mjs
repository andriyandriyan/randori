import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import playformCompress from '@playform/compress';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://randori.id',
  integrations: [
    tailwind(),
    icon({
      include: {
        mdi: ['*'],
      },
    }),
    playformCompress(),
    sitemap(),
    robotsTxt(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    svelte(),
  ],
});