import type { HeadConfig } from 'vitepress'

// 站点级基础配置，和主题实现无关。
export const createSiteConfig = (head: HeadConfig[]) => ({
  // 默认以暗色主题启动。
  appearance: 'dark' as const,
  lang: 'zh-CN',
  icon: 'https://img.xbin.cn/blog/favicon.ico',
  title: 'XBIN',
  srcDir: 'docs',
  description: 'XBIN 的学习笔记，包含前端常用知识、源码阅读笔记、各种奇淫技巧、日常提效工具等',
  head,
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    lineNumbers: true,
  },
})
