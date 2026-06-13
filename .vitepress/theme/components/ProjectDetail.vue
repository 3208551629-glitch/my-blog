<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { projects } from '../../utils/projects'

const { frontmatter } = useData()

const project = computed(() => {
  return projects.find(p => p.name === frontmatter.value.projectName)
})

const statusMap: Record<string, { label: string; class: string; icon: string }> = {
  active: { label: '活跃开发中', class: 'status-active', icon: '●' },
  stable: { label: '稳定维护中', class: 'status-stable', icon: '●' },
  archived: { label: '已归档', class: 'status-archived', icon: '●' },
}
</script>

<template>
  <div v-if="project" class="project-detail">
    <!-- Hero Section -->
    <div class="project-hero">
      <div class="project-hero-content">
        <!-- Breadcrumb -->
        <nav class="breadcrumb">
          <a href="/my-blog/projects/" class="breadcrumb-link">项目集</a>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">{{ project.name }}</span>
        </nav>

        <!-- Title Row -->
        <div class="title-row">
          <h1 class="project-title">
            <span v-if="project.featured" class="featured-star" title="精选项目">⭐</span>
            {{ project.name }}
          </h1>
          <span :class="['status-badge', statusMap[project.status].class]">
            <span class="status-icon">{{ statusMap[project.status].icon }}</span>
            {{ statusMap[project.status].label }}
          </span>
        </div>

        <!-- Description -->
        <p class="project-description">{{ project.description }}</p>

        <!-- Tags -->
        <div class="project-tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>

        <!-- Actions -->
        <div class="project-actions">
          <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener" class="btn btn-primary">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5A5.2 5.2 0 0 0 8 14a5.2 5.2 0 0 0-6 3.5A4.8 4.8 0 0 0 1 22M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
            </svg>
            查看仓库
          </a>
          <a v-if="project.url" :href="project.url" target="_blank" rel="noopener" class="btn btn-secondary">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
            在线演示
          </a>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="project-body">
      <div class="project-main">
        <slot />
      </div>

      <!-- Sidebar -->
      <aside class="project-sidebar">
        <div class="sidebar-card">
          <h3 class="sidebar-title">项目信息</h3>
          <div class="sidebar-content">
            <div class="info-item">
              <span class="info-label">分类</span>
              <span class="info-value">{{ project.category }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">状态</span>
              <span :class="['info-value', 'status-text', statusMap[project.status].class]">
                {{ statusMap[project.status].label }}
              </span>
            </div>
            <div v-if="project.featured" class="info-item">
              <span class="info-label">精选</span>
              <span class="info-value">⭐ 精选项目</span>
            </div>
          </div>
        </div>

        <div class="sidebar-card">
          <h3 class="sidebar-title">技术标签</h3>
          <div class="sidebar-tags">
            <span v-for="tag in project.tags" :key="tag" class="sidebar-tag">{{ tag }}</span>
          </div>
        </div>

        <div class="sidebar-card">
          <h3 class="sidebar-title">快速链接</h3>
          <div class="sidebar-links">
            <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener" class="sidebar-link">
              <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3.5M13 13v4m0 0v-4m0 4l-4-4m4 4l4-4M12 3c-1.5 0-2.5.5-3 1.5C8 5.5 8.5 7 9 8c.5 1 1 2 1 3"/>
              </svg>
              GitHub 仓库
            </a>
            <a v-if="project.url" :href="project.url" target="_blank" rel="noopener" class="sidebar-link">
              <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
              在线演示
            </a>
            <a href="/my-blog/projects/" class="sidebar-link">
              <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              返回项目集
            </a>
          </div>
        </div>
      </aside>
    </div>
  </div>

  <!-- Not Found -->
  <div v-else class="project-not-found">
    <div class="not-found-icon">🔍</div>
    <h2>项目未找到</h2>
    <p>抱歉，该项目不存在或已被移除。</p>
    <a href="/my-blog/projects/" class="btn btn-primary">← 返回项目集</a>
  </div>
</template>

<style scoped>
/* Hero Section */
.project-hero {
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 2rem 0 2.5rem;
  margin: -2rem -1.5rem 2rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.project-hero-content {
  max-width: 1200px;
  margin: 0 auto;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
}

.breadcrumb-link {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: var(--vp-c-brand);
}

.breadcrumb-separator {
  color: var(--vp-c-text-3);
}

.breadcrumb-current {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

/* Title */
.title-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.project-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
}

.featured-star {
  font-size: 1.5rem;
  margin-right: 0.25rem;
  filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.4));
}

/* Status Badge */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid transparent;
}

.status-icon {
  font-size: 0.6rem;
  line-height: 1;
}

.status-active {
  background: rgba(46, 184, 92, 0.1);
  color: #2eb85c;
  border-color: rgba(46, 184, 92, 0.2);
}

.status-stable {
  background: rgba(50, 126, 224, 0.1);
  color: #327ee0;
  border-color: rgba(50, 126, 224, 0.2);
}

.status-archived {
  background: rgba(144, 147, 153, 0.1);
  color: #909399;
  border-color: rgba(144, 147, 153, 0.2);
}

/* Description */
.project-description {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin: 0 0 1.25rem 0;
  line-height: 1.7;
  max-width: 700px;
}

/* Tags */
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  font-size: 0.8rem;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.2s;
}

.tag:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
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
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  border: 1px solid transparent;
  cursor: pointer;
}

.btn-icon {
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background: var(--vp-c-bg);
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.btn-secondary:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
  transform: translateY(-1px);
}

/* Body Layout */
.project-body {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.project-main {
  min-width: 0;
}

/* Sidebar */
.project-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.sidebar-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.25rem;
  transition: border-color 0.2s;
}

.sidebar-card:hover {
  border-color: var(--vp-c-brand);
}

.sidebar-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.info-label {
  color: var(--vp-c-text-3);
}

.info-value {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.status-text {
  font-size: 0.8rem;
}

/* Sidebar Tags */
.sidebar-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.sidebar-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
}

/* Sidebar Links */
.sidebar-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
  border-bottom: 1px solid var(--vp-c-divider);
}

.sidebar-link:last-child {
  border-bottom: none;
}

.sidebar-link:hover {
  color: var(--vp-c-brand);
}

.link-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

/* Not Found */
.project-not-found {
  text-align: center;
  padding: 6rem 2rem;
  max-width: 400px;
  margin: 0 auto;
}

.not-found-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.project-not-found h2 {
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.project-not-found p {
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
}

/* Responsive */
@media (max-width: 960px) {
  .project-body {
    grid-template-columns: 1fr;
  }

  .project-sidebar {
    position: static;
    order: -1;
  }

  .project-title {
    font-size: 2rem;
  }

  .project-hero {
    margin: -1rem -1rem 1.5rem;
    padding: 1.5rem 1rem;
  }
}

@media (max-width: 640px) {
  .project-title {
    font-size: 1.75rem;
  }

  .title-row {
    flex-direction: column;
    align-items: flex-start;
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
