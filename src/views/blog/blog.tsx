import { FC } from 'react'
import classNames from 'classnames'

import styles from './blog.module.scss'
import { BlogProps } from './blog.types'
import { BlogItems } from '@/modules/blogItems'
import { getCachedPosts } from '@/app/blog/posts'
import { Wrapper } from '@/ui/wrapper'

const Blog: FC<BlogProps> = async ({ className }) => {
  const rootClassName = classNames(styles.root, className)
  const posts = await getCachedPosts()

  return (
    <main className={rootClassName}>
      <Wrapper>
        <BlogItems
          items={posts.map(p => ({
            id: p.id,
            title: p.title,
            href: `/blog/${p.id}`,
            description: p.description,
            imageSrc: p.imageSrc,
            date: p.date,
            tags: p.tags
          }))}
          columns={3}
          initialRows={1}
          showMoreStep={3}
        />
      </Wrapper>
    </main>
  )
}

export default Blog
