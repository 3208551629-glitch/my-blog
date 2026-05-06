---
layout: home

hero:
  name: 霄鸿臻的博客
  text: 记录学习与成长
  tagline: 技术 · 生活 · 思考
  image:
    src: /images/hero.svg
    alt: 博客封面
  actions:
    - theme: brand
      text: 开始阅读
      link: /posts/
    - theme: alt
      text: 关于我
      link: /about/

features:
  - icon: 📝
    title: 技术笔记
    details: 记录前端、后端、DevOps 等技术学习心得
    link: /categories/tech-notes
  - icon: 💡
    title: 项目实战
    details: 分享实际项目中的经验与踩坑记录
    link: /categories/project-practice
  - icon: 🎯
    title: 成长思考
    details: 关于职业发展、学习方法、效率提升的思考
    link: /categories/growth-thinking
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(
    120deg,
    #bd34fe 30%,
    #41d1ff
  );
  --vp-home-hero-image-background-image: linear-gradient(
    -45deg,
    #bd34fe 50%,
    #47caff 50%
  );
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
