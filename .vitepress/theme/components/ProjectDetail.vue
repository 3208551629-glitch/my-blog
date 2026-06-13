<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { projects } from '../../utils/projects'

const { frontmatter } = useData()

const project = computed(() => {
  return projects.find(p => p.name === frontmatter.value.projectName)
})

const statusMap: Record<string, { label: string; class: string }> = {
  active: { label: '活跃', class: 'status-active' },
  stable: { label: '稳定', class: 'status-stable' },
  archived: { label: '归档', class: 'status-archived' },
}
</script>

<template>
  <div v-if="project" class="project-detail">
    <div class="project-detail-header">
      <div class="project-detail-title-row">
        <h1 class="project-detail-title">
          <span v-if="project.featured" class="featured-badge" title="精选项目">⭐</span>
          {{ project.name }}
        </h1>
        <span :class="['project-status', statusMap[project.status].class]">
          {{ statusMap[project.status].label }}
        </span>
      </div>
      <p class="project-detail-desc">{{ project.description }}</p>
      <div class="project-detail-tags">
        <span v-for="tag in project.tags" :key="tag" class="project-tag">{{ tag }}</span>
      </div>
      <div class="project-detail-actions">
        <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener" class="action-btn primary">
          <span class="action-icon">&#8599;</span> 查看仓库
        </a>
        <a v-if="project.url" :href="project.url" target="_blank" rel="noopener" class="action-btn">
          <span class="action-icon">&#8599;</span> 在线演示
        </a>
      </div>
    </div>

    <div class="project-detail-content">
      <slot />
    </div>
  </div>
  <div v-else class="project-not-found">
    <h2>项目未找到</h2>
    <p>抱歉，该项目不存在或已被移除。</p>
    <a href="/my-blog/projects/" class="back-link">← 返回项目集</a>
  </div>
</template>

<style scoped>
.project-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
}

.project-detail-header {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.project-detail-title-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.project-detail-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: var(--vp-c-text-1);
}

.featured-badge {
  font-size: 1.5rem;
  margin-right: 4px;
}

.project-status {
  font-size: 0.8rem;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 500;
}

.status-active {
  background: rgba(46, 184, 92, 0.12);
  color: #2eb85c;
}

.status-stable {
  background: rgba(50, 126, 224, 0.12);
  color: #327ee0;
}

.status-archived {
  background: rgba(144, 147, 153, 0.12);
  color: #909399;
}

.project-detail-desc {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

.project-detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1.5rem;
}

.project-tag {
  font-size: 0.85rem;
  padding: 4px 12px;
  border-radius: 8px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
}

.project-detail-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  transition: all 0.2s;
}

.action-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.action-btn.primary {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: #fff;
}

.action-btn.primary:hover {
  background: var(--vp-c-brand-dark);
  border-color: var(--vp-c-brand-dark);
}

.action-icon {
  font-size: 0.8rem;
}

.project-detail-content {
  line-height: 1.8;
}

.project-not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.project-not-found h2 {
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.project-not-found p {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.back-link {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
