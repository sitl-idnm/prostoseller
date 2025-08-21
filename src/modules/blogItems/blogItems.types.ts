export interface BlogListItemData {
  id: string
  title: string
  href: string
  description?: string
  imageSrc?: string
  date?: string
  tags?: string[]
}

export interface BlogItemsProps {
  className?: string
  items: BlogListItemData[]
  gap?: number | string
  columns?: number
  initialRows?: number
  showMoreStep?: number | 'all'
}
