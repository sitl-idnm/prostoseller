export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type Dict<T = unknown> = Record<string, T>

export interface BlogPostMeta {
	title: string
	description?: string
	date?: string
	tags?: string[]
	imageSrc?: string
}
