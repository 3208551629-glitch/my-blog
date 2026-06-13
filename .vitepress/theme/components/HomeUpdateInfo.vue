<script setup lang="ts">
import { useData, useRouter } from 'vitepress'
import { computed } from 'vue'

const { page } = useData()
const { site } = useData()

const updateTime = computed(() => {
  const ts = page.value.lastUpdated
  if (!ts) return ''
  const d = new Date(ts)
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
})
</script>

<template>
  <div class="home-update-bar">
    <span class="home-update-icon">🔄</span>
    <span class="home-update-text">最近更新：</span>
    <time :datetime="new Date(page.lastUpdated ?? Date.now()).toISOString()" class="home-update-time">
      {{ updateTime }}
    </time>
    <span class="home-update-sep">|</span>
    <a href="/my-blog/changelog/" class="home-update-link">查看更新记录 →</a>
  </div>
</template>
