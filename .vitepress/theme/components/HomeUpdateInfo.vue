<template>
  <div class="home-update-bar">
    <span class="home-update-icon">🔄</span>
    <span class="home-update-text">最近更新：</span>
    <time class="home-update-time">{{ displayTime }}</time>
    <span class="home-update-sep">|</span>
    <a href="/my-blog/changelog/" class="home-update-link">查看更新记录 →</a>
  </div>
</template>

<script setup lang="ts">
const pad = (n: number) => n.toString().padStart(2, '0')
const d = new Date()
const displayTime = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
</script>
