import { BlogPost } from '@/modules/blogPost'

export default function PostPage() {
	return (
		<BlogPost
			title="Сезонные товары на маркетплейсах"
			author="Александр Петров"
			authorRole="Учредитель компании"
			date="15.07.2025"
			readTimeMin={5}
			views={1818}
			imageSrc="/images/banner.jpg"
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
