<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formattedDate = computed(() => {
  return new Date(props.post.date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const readingTime = computed(() => {
  const wordCount = props.post.excerpt?.length || 0
  return Math.max(1, Math.ceil(wordCount / 300))
})
</script>

<template>
  <article class="post-card" :class="{ pinned: post.pinned }">
    <a :href="post.url" class="post-link">
      <div class="post-content">
        <div class="post-header">
          <h3 class="post-title">
            <span v-if="post.pinned" class="pin-icon">📌</span>
            {{ post.title }}
          </h3>
          <span v-if="post.category" class="category">{{ post.category }}</span>
        </div>
        <p class="post-excerpt">{{ post.excerpt }}</p>
        <div class="post-meta">
          <time :datetime="post.date">{{ formattedDate }}</time>
          <span class="reading-time">{{ readingTime }} 分钟阅读</span>
          <div class="post-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </a>
  </article>
</template>

<style scoped>
.post-card {
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.post-card.pinned {
  border-left: 4px solid var(--vp-c-brand);
}

.post-link {
  display: block;
  padding: 24px;
  text-decoration: none;
  color: inherit;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.post-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.pin-icon {
  font-size: 1rem;
}

.category {
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
  background: var(--vp-c-brand);
  color: white;
}

.post-excerpt {
  color: var(--vp-c-text-light);
  line-height: 1.6;
  margin: 0 0 16px;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.85rem;
  color: var(--vp-c-text-lighter);
}

.post-tags {
  display: flex;
  gap: 6px;
  margin-left: auto;
}

.tag {
  padding: 4px 10px;
  border-radius: 12px;
  background: var(--vp-c-bg-mute);
  font-size: 0.8rem;
  transition: background 0.2s;
}

.tag:hover {
  background: var(--vp-c-brand);
  color: white;
}

@media (max-width: 640px) {
  .post-meta {
    flex-wrap: wrap;
    gap: 8px;
  }

  .post-tags {
    margin-left: 0;
    width: 100%;
  }
}
</style>
