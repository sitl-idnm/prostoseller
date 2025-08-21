import { notFound } from 'next/navigation'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
	// This dynamic route will render the file-backed page under (posts)
	// Next.js will automatically route /blog/hello-world to app/blog/(posts)/hello-world/page.tsx
	// If no file exists, show 404
	if (!params?.slug) return notFound()
	return null
}
