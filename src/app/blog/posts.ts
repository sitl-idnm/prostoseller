import fs from 'node:fs/promises'
import path from 'node:path'
import { unstable_cache, revalidateTag } from 'next/cache'
import type { BlogPostMeta } from '@/shared/types/common'

export interface DiscoveredPost extends BlogPostMeta {
	id: string
	href: string
}

const POSTS_DIR = path.join(process.cwd(), 'src', 'app', 'blog', '(posts)')

export async function discoverPosts(): Promise<DiscoveredPost[]> {
	try {
		const dirs = await fs.readdir(POSTS_DIR, { withFileTypes: true })
		const posts: DiscoveredPost[] = []
		for (const dirent of dirs) {
			if (!dirent.isDirectory()) continue
			const slug = dirent.name
			const metaPath = path.join(POSTS_DIR, slug, 'meta.json')
			try {
				const [metaRaw] = await Promise.all([
					fs.readFile(metaPath, 'utf-8')
				])
				const meta = JSON.parse(metaRaw) as BlogPostMeta
				posts.push({
					id: slug,
					href: `/blog/${slug}`,
					...meta
				})
			} catch {
				// skip if no meta.json
				continue
			}
		}
		// sort by date desc if present
		posts.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
		return posts
	} catch {
		return []
	}
}

const POSTS_TAG = 'blog-posts'

export const getCachedPosts = unstable_cache(
	async () => {
		const posts = await discoverPosts()
		return posts
	},
	['blog-posts-key'],
	{ tags: [POSTS_TAG], revalidate: 300 }
)

export async function revalidateBlogPosts() {
	revalidateTag(POSTS_TAG)
}

export async function getPosts() {
	if (process.env.NODE_ENV !== 'production') {
		return discoverPosts()
	}
	return getCachedPosts()
}
