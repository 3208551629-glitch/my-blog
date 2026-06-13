<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { projects } from '../../utils/projects'

const { frontmatter } = useData()

const project = computed(() => {
  return projects.find(p => p.name === frontmatter.value.projectName)
})

const statusMap: Record<string, { label: string; class: string }> = {
  active: { label: '活跃开发中', class: 'status-active' },
  stable: { label: '稳定维护中', class: 'status-stable' },
  archived: { label: '已归档', class: 'status-archived' },
}
</script>

<template>
  <div v-if="project" class="project-detail-header">
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <a href="/my-blog/projects/" class="breadcrumb-link">项目集</a>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-current">{{ project.name }}</span>
    </nav>

    <!-- Title -->
    <h1 class="project-title">
      <span v-if="project.featured" class="featured-icon">⭐</span>
      {{ project.name }}
    </h1>

    <!-- Description -->
    <p class="project-desc">{{ project.description }}</p>

    <!-- Meta -->
    <div class="project-meta">
      <span :class="['status-badge', statusMap[project.status].class]">
        {{ statusMap[project.status].label }}
      </span>
      <span class="category-badge">{{ project.category }}</span>
    </div>

    <!-- Tags -->
    <div class="project-tags">
      <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>

    <!-- Actions -->
    <div class="project-actions">
      <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener" class="btn btn-primary">
        查看仓库
      </a>
      <a v-if="project.url" :href="project.url" target="_blank" rel="noopener" class="btn btn-secondary">
        在线演示
      </a>
    </div>
  </div>

  <!-- Not Found -->
  <div v-else class="not-found">
    <div class="not-found-icon">🔍</div>
    <h2>项目未找到</h2>
    <p>抱歉，该项目不存在或已被移除。</p>
    <a href="/my-blog/projects/" class="btn btn-primary">返回项目集</a>
  </div>
</template>

<style scoped>
/* Header Container */
.project-detail-header {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.breadcrumb-link {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: var(--vp-c-brand);
}

.breadcrumb-sep {
  color: var(--vp-c-text-3);
}

.breadcrumb-current {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

/* Title */
.project-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1.2;
}

.featured-icon {
  font-size: 1.75rem;
  line-height: 1;
}

/* Description */
.project-desc {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin: 0 0 1.25rem 0;
  line-height: 1.7;
}

/* Meta */
.project-meta {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-active {
  background: rgba(46, 184, 92, 0.1);
  color: #2eb85c;
}

.status-stable {
  background: rgba(50, 126, 224, 0.1);
  color: #327ee0;
}

.status-archived {
  background: rgba(144, 147, 153, 0.1);
  color: #909399;
}

.category-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
}

/* Tags */
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  font-size: 0.85rem;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

/* Actions */
.project-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  border: 1px solid transparent;
  cursor: pointer;
}

.btn-primary {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: #fff;
}

.btn-primary:hover {
  background: var(--vp-c-brand-dark);
  border-color: var(--vp-c-brand-dark);
}

.btn-secondary {
  background: var(--vp-c-bg);
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.btn-secondary:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

/* Not Found */
.not-found {
  text-align: center;
  padding: 6rem 2rem;
}

.not-found-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.not-found h2 {
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.not-found p {
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
}

/* Responsive */
@media (max-width: 640px) {
  .project-title {
    font-size: 2rem;
  }

  .project-actions {
    width: 100%;
  }

  .btn {
    flex: 1;
    justify-content: center;
  }
}
</style>
