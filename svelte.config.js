/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-vercel'
import autoprefixer from 'autoprefixer'

const styles = ['colors', 'font']

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		postcss: {
			plugins: [autoprefixer()]
		},
		scss: {
			prependData: styles.map(path => `@use 'styles/${path}';`).join('')
		}
	}),
	compilerOptions: {
		immutable: true,
		hydratable: true
	},
	kit: {
		adapter: adapter(),
		files: {
			assets: 'public',
			hooks: {
				server: 'hooks/index.server',
				client: 'hooks/index.client'
			},
			lib: 'lib',
			routes: 'routes',
			serviceWorker: 'lib/worker',
			appTemplate: 'lib/app.html'
		},
		csp: {
			directives: {
				'base-uri': ['self'],
				'default-src': ['self'],
				'script-src': ['self', 'unsafe-inline'],
				'style-src': ['self', 'unsafe-inline']
			}
		},
		trailingSlash: 'never'
	}
}

export default config
