import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify'; 

import tailwind from '@astrojs/tailwind';

import astroIcon from 'astro-icon';


export default defineConfig({
  vite: {
		server: {
			host: true,
			port: 4321,
			force: true,
			watch: {
				usePolling: true,
			},
			allowedHosts: ["localhost"],
		},
		build: {
			rollupOptions: {
				external: ['**/*.sh']
			}
		},
	},
  // SSR so auth endpoints work
  output: 'server',

  adapter: netlify(),
  integrations: [astroIcon(), tailwind()],
});