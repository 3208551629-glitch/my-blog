<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import BackToTop from './components/BackToTop.vue'
import HomeUpdateInfo from './components/HomeUpdateInfo.vue'

const { frontmatter, isDark } = useData()
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <!-- 首页底部信息 -->
    <template #home-features-after>
      <HomeUpdateInfo />
    </template>

    <!-- 自定义页脚 -->
    <template #layout-bottom>
      <BackToTop />
    </template>
  </Layout>
</template>
