import path from 'node:path'
import fs from 'node:fs'

export const revalidate = 86400 // regenerate once per day

function getBaseUrl(): string {
	const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || ''
	if (envUrl) return envUrl.replace(/^https?:\/\//, '').replace(/\/$/, '').startsWith('http') ? envUrl.replace(/\/$/, '') : `https://${envUrl.replace(/\/$/, '')}`
	return 'https://prostoseller.com'
}

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
}

function collectStaticAppRoutes(): string[] {
	const appDir = path.join(process.cwd(), 'src', 'app')
	const routes: string[] = []

	function walk(dir: string, baseRoute: string) {
		const entries = fs.readdirSync(dir, { withFileTypes: true })
		const hasPage = entries.some((e) => e.isFile() && (e.name === 'page.tsx' || e.name === 'page.ts'))
		const hasRoute = entries.some((e) => e.isFile() && (e.name === 'route.ts' || e.name === 'route.tsx'))

		if (hasPage || hasRoute) {
			routes.push(baseRoute || '/')
		}

		for (const entry of entries) {
			if (entry.isDirectory()) {
				const name = entry.name
				if (
					name.startsWith('(') ||
					name.startsWith('_') ||
					name.startsWith('[') ||
					name === 'api' ||
					(baseRoute === '/' && name === 'sitemap.xml')
				) {
					continue
				}
				const childDir = path.join(dir, name)
				const childRoute = baseRoute === '/' ? `/${name}` : `${baseRoute}/${name}`
				walk(childDir, childRoute)
			}
		}
	}

	walk(appDir, '/')

	return Array.from(new Set(routes)).sort()
}

function discoverBlogSlugs(): string[] {
	// Posts live under src/app/blog/(posts)/<slug>/page.tsx
	const postsDir = path.join(process.cwd(), 'src', 'app', 'blog', '(posts)')
	try {
		return fs
			.readdirSync(postsDir, { withFileTypes: true })
			.filter((d) => d.isDirectory())
			.map((d) => d.name)
			.filter((name) => !name.startsWith('['))
	} catch {
		return []
	}
}

function countImagesInBlogPost(slug: string): number {
	try {
		const pagePath = path.join(process.cwd(), 'src', 'app', 'blog', '(posts)', slug, 'page.tsx')
		const source = fs.readFileSync(pagePath, 'utf-8')
		// Count occurrences of images referenced in this post file.
		// We consider next/image usages and plain <img> with src pointing to /images/*
		const patterns = [
			/src\s*=\s*"\s*\/images\//g, // src="/images/..."
			/imageSrc\s*=\s*"\s*\/images\//g, // imageSrc="/images/..."
		]
		let count = 0
		for (const re of patterns) {
			const matches = source.match(re)
			if (matches) count += matches.length
		}
		return count
	} catch {
		return 0
	}
}

export async function GET() {
	const baseUrl = getBaseUrl()
	const today = new Date().toISOString().split('T')[0]

	const staticRoutes = collectStaticAppRoutes()
	const blogSlugs = discoverBlogSlugs()

	const blogRoutes = blogSlugs.map((slug) => `/blog/${slug}`)

	const allRoutes = Array.from(new Set([...staticRoutes, ...blogRoutes]))
		.filter((r) => r !== '/sitemap.xml')
		.sort()

	const urlEntries = allRoutes
		.map((routePath) => {
			const loc = `${baseUrl}${routePath === '/' ? '' : routePath}`

			const imageCount = routePath.startsWith('/blog/')
				? countImagesInBlogPost(routePath.split('/').pop() as string)
				: 0
			const imageCountXml = imageCount ? `\n    <image_count>${imageCount}</image_count>` : ''

			return (
				`  <url>\n` +
				`    <loc>${escapeXml(loc)}</loc>\n` +
				`    <lastmod>${today}</lastmod>\n` +
				`    <changefreq>daily</changefreq>\n` +
				`    <priority>${routePath === '/' ? '1.0' : '0.7'}</priority>\n` +
				(imageCountXml ? imageCountXml + '\n' : '') +
				`  </url>`
			)
		})
		.join('\n')

	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
		`${urlEntries}\n` +
		`</urlset>`

	return new Response(xml, {
		status: 200,
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
		},
	})
}
