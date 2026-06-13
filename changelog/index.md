---
title: 更新记录
editLink: false
lastUpdated: false
---

# 📋 更新记录

<script setup lang="ts">
const entries = [
  {
    date: '2026-06-13',
    items: [
      { type: 'add', text: '首页添加最近更新时间' },
      { type: 'add', text: '添加更新记录页面' },
      { type: 'add', text: '新增 3 篇博文：VitePress Layout 定制、项目集搭建、时间戳方案对比' },
      { type: 'update', text: '分类页同步更新新文章链接' }
    ]
  },
  {
    date: '2026-06-12',
    items: [
      { type: 'add', text: '项目集页面新增搜索功能' },
      { type: 'add', text: '精选项目标记 ⭐ 徽标' },
      { type: 'update', text: '项目集仅显示真实存在的 GitHub 项目' },
      { type: 'fix', text: '修复搜索样式被 markdown 解析打断的问题' }
    ]
  },
  {
    date: '2026-06-11',
    items: [
      { type: 'add', text: '项目集页面上线，展示个人开源项目' },
      { type: 'update', text: '首页英雄区样式优化' }
    ]
  }
]

const typeLabel: Record<string, string> = {
  add: '新增',
  update: '优化',
  fix: '修复'
}

const typeClass: Record<string, string> = {
  add: 'tag-add',
  update: 'tag-update',
  fix: 'tag-fix'
}
</script>

<div class="changelog">
  <div v-for="entry in entries" :key="entry.date" class="changelog-entry">
    <div class="changelog-date">{{ entry.date }}</div>
    <ul class="changelog-items">
      <li v-for="(item, i) in entry.items" :key="i" class="changelog-item">
        <span :class="['changelog-tag', typeClass[item.type]]">{{ typeLabel[item.type] }}</span>
        <span>{{ item.text }}</span>
      </li>
    </ul>
  </div>
</div>

<style scoped>
.changelog {
  max-width: 720px;
  margin: 0 auto;
  padding: 1rem 0;
}

.changelog-entry {
  position: relative;
  padding-left: 1.5rem;
  padding-bottom: 1.5rem;
  border-left: 2px solid var(--vp-c-divider);
}

.changelog-entry:last-child {
  border-left-color: transparent;
}

.changelog-date {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  margin-bottom: 0.5rem;
}

.changelog-date::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--vp-c-brand);
}

.changelog-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.changelog-item {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.3rem 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}

.changelog-tag {
  flex-shrink: 0;
  display: inline-block;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.4;
}

.tag-add {
  background: #e6f7ed;
  color: #0a7c42;
}

.tag-update {
  background: #e8f0fe;
  color: #1a56db;
}

.tag-fix {
  background: #fef3e8;
  color: #b45309;
}

.dark .tag-add {
  background: rgba(10, 124, 66, 0.2);
  color: #4ade80;
}

.dark .tag-update {
  background: rgba(26, 86, 219, 0.2);
  color: #60a5fa;
}

.dark .tag-fix {
  background: rgba(180, 83, 9, 0.2);
  color: #fbbf24;
}
</style>
