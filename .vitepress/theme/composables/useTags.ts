import { computed } from 'vue'

export function useTags(posts) {
  const allTags = computed(() => {
    const tagMap = new Map()

    posts.forEach(post => {
      post.tags?.forEach(tag => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
      })
    })

    return Array.from(tagMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))
  })

  function filterByTag(tag) {
    if (!tag) return posts
    return posts.filter(post => post.tags?.includes(tag))
  }

  return {
    allTags,
    filterByTag
  }
}
