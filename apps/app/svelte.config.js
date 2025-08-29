import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-node for Firebase App Hosting
		adapter: adapter({
			// Use environment variable PORT, defaulting to 8080 for Firebase App Hosting
			env: {
				port: 'PORT',
				host: 'HOST'
			}
		}),
		alias: {
			'@misetomo/shared': '../../packages/shared/src',
			'@misetomo/shared/*': '../../packages/shared/src/*'
		}
	}
};

export default config;
