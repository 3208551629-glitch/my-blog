import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '霄鸿臻的博客',
  description: '霄鸿臻的个人技术博客',
  lang: 'zh-CN',
  base: '/my-blog/',

  themeConfig: {
    logo: '/images/logo.svg',
    siteTitle: '霄鸿臻的博客',

    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      {
        text: '分类',
        items: [
          { text: '📝 技术笔记', link: '/categories/tech-notes' },
          { text: '💡 项目实战', link: '/categories/project-practice' },
          { text: '🎯 成长思考', link: '/categories/growth-thinking' }
        ]
      },
      { text: '归档', link: '/archives/' },
      { text: '标签', link: '/tags/' },
      { text: '工具', link: '/codesnap/' },
      { text: '关于', link: '/about/' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/3208551629-glitch' }
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2024-present'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文章',
            buttonAriaLabel: '搜索文章'
          },
          modal: {
            noResultsText: '没有找到相关结果',
            resetButtonTitle: '清除搜索',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'ESC'
            }
          }
        }
      }
    },

    outline: {
      level: [2, 4],
      label: '目录'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    lastUpdated: {
      text: '最后更新于'
    }
  },

  markdown: {
    lineNumbers: true,
    math: true
  },

  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['link', { rel: 'icon', href: '/images/logo.svg' }]
  ]
})
