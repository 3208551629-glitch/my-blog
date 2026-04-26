import { ref, computed } from 'vue'

export function usePosts(posts) {
  const currentPage = ref(1)
  const pageSize = ref(10)

  const sortedPosts = computed(() => {
    return [...posts].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  })

  const totalPosts = computed(() => posts.length)
  const totalPages = computed(() =>
    Math.ceil(totalPosts.value / pageSize.value)
  )

  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return sortedPosts.value.slice(start, end)
  })

  const pinnedPosts = computed(() =>
    sortedPosts.value.filter(post => post.pinned)
  )

  function setPage(page) {
    currentPage.value = Math.max(1, Math.min(page, totalPages.value))
  }

  return {
    posts: sortedPosts,
    paginatedPosts,
    pinnedPosts,
    currentPage,
    totalPages,
    setPage
  }
}
