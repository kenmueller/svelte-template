import type { RequestHandler } from './$types'

import errorFromValue from '$lib/error/from/value'

const robots = ({ origin }: URL) =>
	`User-agent: *
Sitemap: ${new URL('/sitemap.xml', origin).href}`

let data: string | null = null

export const GET: RequestHandler = ({ url }) => {
	try {
		return new Response((data ??= robots(url)), {
			headers: {
				'cache-control': 'no-cache',
				'content-type': 'text/plain'
			}
		})
	} catch (value) {
		const { code, message } = errorFromValue(value)
		return new Response(message, { status: code })
	}
}
