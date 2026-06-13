---
layout: page
title: 项目集
description: 个人开源项目与工具合集
---

<script setup>
import { ref, computed } from 'vue'
import ProjectCard from '../.vitepress/theme/components/ProjectCard.vue'
import ProjectFilter from '../.vitepress/theme/components/ProjectFilter.vue'
import { projects, categories } from '../.vitepress/utils/projects'

const activeCategory = ref('全部')
const searchQuery = ref('')

const activeCount = computed(() => projects.filter(p => p.status === 'active').length)
const totalCount = projects.length
const featuredCount = computed(() => projects.filter(p => p.featured).length)

const filteredProjects = computed(() => {
  let list = projects
  if (activeCategory.value !== '全部') {
    list = list.filter(p => p.category === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    )
  }
  return list
})

const displayProjects = computed(() => {
  const list = [...filteredProjects.value]
  if (activeCategory.value === '全部' && !searchQuery.value.trim()) {
    list.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })
  }
  return list
})
</script>

<div class="projects-page">
  <div class="projects-header">
    <h1>项目集</h1>
    <p class="projects-desc">
      共 <strong>{{ totalCount }}</strong> 个项目 · <strong>{{ featuredCount }}</strong> 个精选 · <strong>{{ activeCount }}</strong> 个活跃开发中
    </p>
  </div>

  <div class="projects-controls">
    <div class="search-wrapper">
      <span class="search-icon">&#128269;</span>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索项目名称、描述或标签..."
        class="search-input"
      />
    </div>
  </div>

  <ProjectFilter
    :categories="categories"
    v-model:active="activeCategory"
  />

  <p class="projects-count">显示 {{ displayProjects.length }} 个项目</p>

  <div class="projects-grid">
    <ProjectCard
      v-for="project in displayProjects"
      :key="project.name"
      :project="project"
    />
  </div>

  <div v-if="displayProjects.length === 0" class="projects-empty">
    <p>没有找到匹配的项目</p>
  </div>
</div>


