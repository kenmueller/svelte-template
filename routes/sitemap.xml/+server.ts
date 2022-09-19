import type { RequestHandler } from './$types'

import errorFromValue from '$lib/error/from/value'

const urls = ['/']

const sitemap = ({ origin }: URL) =>
	`<?xml version="1.0" encoding="UTF-8" ?>\
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" \
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 \
http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\
${urls
	.map(url => `<url><loc>${encodeURI(new URL(url, origin).href)}</loc></url>`)
	.join('')}\
</urlset>`

let data: string | null = null

export const GET: RequestHandler = ({ url }) => {
	try {
		return new Response((data ??= sitemap(url)), {
			headers: {
				'cache-control': 'no-cache',
				'content-type': 'application/xml'
			}
		})
	} catch (value) {
		const { code, message } = errorFromValue(value)
		return new Response(message, { status: code })
	}
}
