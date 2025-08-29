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
			// Firebase App Hosting configuration
			// Use environment variables for PORT and HOST
			// Firebase sets PORT=8080 and HOST=0.0.0.0
			out: 'build',
			precompress: false,
			envPrefix: '',
		}),
		alias: {
			'@misetomo/shared': '../../packages/shared/src',
			'@misetomo/shared/*': '../../packages/shared/src/*'
		}
	}
};

export default config;
