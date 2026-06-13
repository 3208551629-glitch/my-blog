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
  <div v-if="project" class="project-detail">
    <!-- Breadcrumb -->
    <nav class="breadcrumb">
      <a href="/my-blog/projects/" class="breadcrumb-link">项目集</a>
      <span class="breadcrumb-sep">/</span>
      <span class="breadcrumb-current">{{ project.name }}</span>
    </nav>

    <!-- Header -->
    <header class="project-header">
      <div class="header-content">
        <h1 class="project-title">
          <span v-if="project.featured" class="featured-icon">⭐</span>
          {{ project.name }}
        </h1>
        <p class="project-desc">{{ project.description }}</p>

        <div class="project-meta">
          <span :class="['status-badge', statusMap[project.status].class]">
            {{ statusMap[project.status].label }}
          </span>
          <span class="category-badge">{{ project.category }}</span>
        </div>

        <div class="project-tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>

        <div class="project-actions">
          <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener" class="btn btn-primary">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78.015-.795 1.125-.015 1.935.84 2.205 1.185.645.87 1.68 1.23 2.625 1.05.075-.525.27-1.23.495-1.545-2.67-.3-5.475-1.335-5.475-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23A11.49 11.49 0 0112 5.805c1.02 0 2.04.135 3.015.405 2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.82 5.625-5.475 5.925.285.315.51.87.51 1.785 0 1.29-.015 2.325-.015 2.64 0 .27.225.585.825.57A12.06 12.06 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            查看仓库
          </a>
          <a v-if="project.url" :href="project.url" target="_blank" rel="noopener" class="btn btn-secondary">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
            在线演示
          </a>
        </div>
      </div>
    </header>

    <!-- Divider -->
    <div class="section-divider"></div>

    <!-- Content -->
    <div class="project-content">
      <slot />
    </div>

    <!-- Footer -->
    <footer class="project-footer">
      <a href="/my-blog/projects/" class="back-link">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        返回项目集
      </a>
    </footer>
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
/* Container - Centered */
.project-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  justify-content: center;
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

/* Header */
.project-header {
  text-align: center;
  margin-bottom: 2rem;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.project-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.featured-icon {
  font-size: 1.75rem;
  line-height: 1;
}

.project-desc {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin: 0 0 1.5rem 0;
  line-height: 1.7;
  max-width: 600px;
}

/* Meta */
.project-meta {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
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
  justify-content: center;
  margin-bottom: 1.5rem;
}

.tag {
  font-size: 0.85rem;
  padding: 0.4rem 0.85rem;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

/* Actions */
.project-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.65rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  border: 1px solid transparent;
  cursor: pointer;
}

.icon {
  width: 1.1rem;
  height: 1.1rem;
  flex-shrink: 0;
}

.btn-primary {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: #fff;
}

.btn-primary:hover {
  background: var(--vp-c-brand-dark);
  border-color: var(--vp-c-brand-dark);
  transform: translateY(-1px);
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

/* Divider */
.section-divider {
  height: 1px;
  background: var(--vp-c-divider);
  margin: 2rem 0;
}

/* Content - Markdown Styles */
.project-content {
  line-height: 1.8;
}

.project-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2.5rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  text-align: center;
}

.project-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 2rem 0 0.75rem;
  color: var(--vp-c-text-1);
  text-align: center;
}

.project-content :deep(p) {
  margin: 1rem 0;
  color: var(--vp-c-text-2);
  text-align: center;
}

.project-content :deep(ul),
.project-content :deep(ol) {
  margin: 1rem 0;
  padding-left: 0;
  list-style: none;
  text-align: center;
}

.project-content :deep(li) {
  margin: 0.5rem 0;
  color: var(--vp-c-text-2);
  position: relative;
  padding-left: 1.5rem;
  display: inline-block;
  text-align: left;
  width: 100%;
  max-width: 500px;
}

.project-content :deep(li::before) {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--vp-c-brand);
  font-weight: bold;
}

.project-content :deep(code) {
  background: var(--vp-c-bg-soft);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
  color: var(--vp-c-text-1);
}

.project-content :deep(pre) {
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1rem auto;
  max-width: 600px;
  text-align: left;
}

.project-content :deep(pre code) {
  background: none;
  padding: 0;
}

.project-content :deep(a) {
  color: var(--vp-c-brand);
  text-decoration: none;
}

.project-content :deep(a:hover) {
  text-decoration: underline;
}

.project-content :deep(strong) {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

/* Footer */
.project-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--vp-c-brand);
}

.back-link .icon {
  width: 1rem;
  height: 1rem;
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
  .project-detail {
    padding: 1.5rem 1rem;
  }

  .project-title {
    font-size: 2rem;
  }

  .project-desc {
    font-size: 1rem;
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
