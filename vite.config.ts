import type { UserConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: ['.']
		}
	},
	build: {
		assetsInlineLimit: 0
	}
}

export default config
