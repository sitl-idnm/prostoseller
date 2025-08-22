import { BlogPost } from '@/modules/blogPost'
import { getPosts } from '@/app/blog/posts'
import type { Metadata } from 'next'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import meta from './meta.json'

export const metadata: Metadata = {
	title: meta.title,
	description: meta.description ?? ''
}

export default async function PostPage() {
	const currentId = 'hello-world'
	const posts = await getPosts()
	const related = posts
		.filter(p => p.id !== currentId)
		.map(p => ({
			id: p.id,
			title: p.title,
			href: `/blog/${p.id}`,
			description: p.description,
			imageSrc: p.imageSrc,
			date: p.date,
			tags: p.tags
		}))

	return (
		<BlogPost
			title="Сезонные товары на маркетплейсах"
			author="Александр Петров"
			authorRole="Учредитель компании"
			date="15.07.2025"
			readTimeMin={5}
			views={1818}
			imageSrc="/images/banner.jpg"
			currentId={currentId}
			related={related}
		>
			<h2>Сезонный товар — что это такое</h2>
			<p>Реализация на маркетплейсах сезонной продукции позволяет ...</p>
			<h2>Специфика товаров</h2>
			<p>Временной ассортимент относится к товарам, которые пользуются спросом ...</p>
			<h2>Преимущества</h2>
			<p>Рост выручки в пиковые периоды ...</p>
		</BlogPost>
	)
}
