import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		target: '#root',
		files: {
			assets: 'public',
			hooks: 'hooks',
			lib: 'lib',
			routes: 'routes',
			serviceWorker: 'lib/service-worker',
			template: 'lib/index.html'
		}
	}
}

export default config
