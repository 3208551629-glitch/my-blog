<script setup lang="ts">
defineProps<{
  categories: string[]
  active: string
}>()

defineEmits<{
  'update:active': [value: string]
}>()
</script>

<template>
  <div class="project-filter">
    <button
      v-for="cat in categories"
      :key="cat"
      :class="['filter-btn', { active: cat === active }]"
      @click="$emit('update:active', cat)"
    >
      {{ cat }}
    </button>
  </div>
</template>

<style scoped>
.project-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 1.5rem 0;
}

.filter-btn {
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 0.85rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-text-1);
}

.filter-btn.active {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: #fff;
}
</style>
