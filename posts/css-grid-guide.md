---
title: CSS Grid 布局完全指南
date: 2026-04-08
tags:
  - CSS
  - 前端
category: 技术
---

# CSS Grid 布局完全指南

CSS Grid 是现代网页布局的强大工具，本文将全面介绍其使用方法。

## 基础概念

Grid 布局由容器（Container）和项目（Item）组成：

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 200px;
  gap: 20px;
}
```

## 定义网格

### 固定尺寸

```css
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
}
```

### 弹性尺寸

```css
.container {
  display: grid;
  /* 三列，等分 */
  grid-template-columns: 1fr 1fr 1fr;
  /* 第一列固定，剩余空间平分 */
  grid-template-columns: 200px 1fr 1fr;
}
```

### repeat 函数

```css
.container {
  display: grid;
  /* 重复 3 个 1fr */
  grid-template-columns: repeat(3, 1fr);
  /* 自动填充，每列最小 200px */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
```

## 网格区域

```css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

## 项目定位

### 跨列跨行

```css
.item {
  grid-column: 1 / 3;  /* 从第1列到第3列 */
  grid-row: 1 / 2;     /* 从第1行到第2行 */
}

/* 或使用 span */
.item {
  grid-column: span 2;  /* 跨越2列 */
  grid-row: span 3;     /* 跨越3行 */
}
```

## 对齐方式

```css
.container {
  display: grid;
  /* 水平对齐 */
  justify-items: center;
  /* 垂直对齐 */
  align-items: center;
  /* 整体水平对齐 */
  justify-content: space-between;
  /* 整体垂直对齐 */
  align-content: center;
}
```

## 实战案例

### 响应式卡片布局

```css
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
```

### 圣杯布局

```css
.layout {
  display: grid;
  grid-template:
    "header header" auto
    "main sidebar" 1fr
    "footer footer" auto
    / 1fr 300px;
  min-height: 100vh;
}
```

## 总结

CSS Grid 让复杂布局变得简单直观，配合 Flexbox 可以应对绝大多数布局需求。
