interface Post {
  title: string
  date: string
  tags: string[]
  excerpt: string
  url: string
  cover?: string
  pinned?: boolean
  category?: string
}

const posts: Post[] = [
  {
    title: '欢迎来到我的博客',
    date: '2026-04-18',
    tags: ['博客', 'VitePress'],
    excerpt: '这是我的第一篇博客文章，介绍了这个博客的搭建过程。',
    url: '/posts/hello-world',
    category: '随笔'
  },
  {
    title: 'Vue 3 组合式 API 入门',
    date: '2026-04-15',
    tags: ['Vue3', 'JavaScript', '前端'],
    excerpt: 'Vue 3 引入了组合式 API，提供了一种更灵活的方式来组织组件逻辑。',
    url: '/posts/vue3-composition-api',
    category: '技术'
  }
]

export default posts
