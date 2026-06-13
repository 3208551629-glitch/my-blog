<script setup lang="ts">
import { useRouter } from 'vitepress'

const props = defineProps<{
  project: {
    name: string
    description: string
    category: string
    tags: string[]
    repo?: string
    url?: string
    status: 'active' | 'stable' | 'archived'
    featured?: boolean
  }
}>()

const statusMap: Record<string, { label: string; class: string }> = {
  active: { label: '活跃', class: 'status-active' },
  stable: { label: '稳定', class: 'status-stable' },
  archived: { label: '归档', class: 'status-archived' },
}

const projectSlug = props.project.name.toLowerCase().replace(/\s+/g, '-')

function goToDetail() {
  window.location.href = `/my-blog/projects/${projectSlug}`
}
</script>

<template>
  <div class="project-card" :class="{ 'project-card-featured': project.featured }" @click="goToDetail">
    <div class="project-card-header">
      <h3 class="project-name">
        <span v-if="project.featured" class="featured-badge" title="精选项目">⭐</span>
        {{ project.name }}
      </h3>
      <span :class="['project-status', statusMap[project.status].class]">
        {{ statusMap[project.status].label }}
      </span>
    </div>
    <p class="project-desc">{{ project.description }}</p>
    <div class="project-tags">
      <span v-for="tag in project.tags" :key="tag" class="project-tag">{{ tag }}</span>
    </div>
    <div class="project-footer">
      <span class="project-category">{{ project.category }}</span>
      <div class="project-links">
        <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener" class="project-link" @click.stop>
          <span class="link-icon">&#8599;</span> Repo
        </a>
        <a v-if="project.url" :href="project.url" target="_blank" rel="noopener" class="project-link" @click.stop>
          <span class="link-icon">&#8599;</span> Demo
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;
}

.project-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.project-card-featured {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.project-card-featured:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-3px);
}

.featured-badge {
  font-size: 1rem;
  margin-right: 4px;
  display: inline-block;
}

.link-icon {
  font-size: 0.75rem;
  display: inline-block;
}

.project-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-name {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0;
  color: var(--vp-c-text-1);
}

.project-status {
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 10px;
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

.project-desc {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.project-tag {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 6px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
}

.project-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.project-category {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.project-links {
  display: flex;
  gap: 0.75rem;
}

.project-link {
  font-size: 0.8rem;
  color: var(--vp-c-brand);
  text-decoration: none;
}

.project-link:hover {
  text-decoration: underline;
}
</style>
