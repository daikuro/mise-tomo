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
			// The application will use PORT environment variable (Firebase sets it to 8080)
			// No default port is needed as Firebase always provides PORT
		}),
		alias: {
			'@misetomo/shared': '../../packages/shared/src',
			'@misetomo/shared/*': '../../packages/shared/src/*'
		}
	}
};

export default config;
