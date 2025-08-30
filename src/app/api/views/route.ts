import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const VIEWS_FILE_PATH = path.join(process.cwd(), 'data', 'views.json')

interface ViewsData {
	[postId: string]: {
		views: number
		lastUpdated: number
	}
}

// Функция для чтения данных просмотров
async function readViewsData(): Promise<ViewsData> {
	try {
		const data = await fs.readFile(VIEWS_FILE_PATH, 'utf-8')
		return JSON.parse(data)
	} catch (error) {
		// Если файл не существует, создаем его с начальными данными
		const initialData: ViewsData = {
			'sezonnye-tovary-na-zimu': { views: 2345, lastUpdated: Date.now() },
			'sezonnye-tovary-na-osen': { views: 2217, lastUpdated: Date.now() },
			'prioritet-skladov-ozon': { views: 4106, lastUpdated: Date.now() },
			'kak-podklyuchit-ehdo-dlya-ozon': { views: 2604, lastUpdated: Date.now() },
			'samyie-prodavaemyie-tovaryi-na-ozon': { views: 3891, lastUpdated: Date.now() },
			'sezonnye-tovary-na-marketpleysah': { views: 1892, lastUpdated: Date.now() },
			'kak-otgruzit-tovar-na-ozon': { views: 2165, lastUpdated: Date.now() },
			'gde-nahodyatsya-sklady-ozon': { views: 4327, lastUpdated: Date.now() },
			'trebovaniya-k-upakovke-tovara-na-ozon': { views: 7122, lastUpdated: Date.now() }
		}

		// Создаем директорию если её нет
		await fs.mkdir(path.dirname(VIEWS_FILE_PATH), { recursive: true })
		await fs.writeFile(VIEWS_FILE_PATH, JSON.stringify(initialData, null, 2))
		return initialData
	}
}

// Функция для записи данных просмотров
async function writeViewsData(data: ViewsData): Promise<void> {
	await fs.writeFile(VIEWS_FILE_PATH, JSON.stringify(data, null, 2))
}

// GET - получение количества просмотров для статьи
export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const postId = searchParams.get('postId')

	if (!postId) {
		return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
	}

	try {
		const viewsData = await readViewsData()
		const postViews = viewsData[postId] || { views: 0, lastUpdated: Date.now() }

		return NextResponse.json({ views: postViews.views })
	} catch (error) {
		console.error('Error reading views data:', error)
		return NextResponse.json({ error: 'Failed to read views data' }, { status: 500 })
	}
}

// POST - увеличение счетчика просмотров
export async function POST(request: NextRequest) {
	try {
		const { postId } = await request.json()

		if (!postId) {
			return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
		}

		const viewsData = await readViewsData()

		// Проверяем, прошло ли достаточно времени с последнего обновления (30 минут)
		const now = Date.now()
		const lastUpdated = viewsData[postId]?.lastUpdated || 0
		const thirtyMinutes = 30 * 60 * 1000

		if (now - lastUpdated > thirtyMinutes) {
			// Увеличиваем счетчик
			viewsData[postId] = {
				views: (viewsData[postId]?.views || 0) + 1,
				lastUpdated: now
			}

			await writeViewsData(viewsData)
		}

		return NextResponse.json({
			views: viewsData[postId].views,
			incremented: now - lastUpdated > thirtyMinutes
		})
	} catch (error) {
		console.error('Error updating views data:', error)
		return NextResponse.json({ error: 'Failed to update views data' }, { status: 500 })
	}
}
