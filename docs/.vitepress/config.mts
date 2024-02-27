import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: '三九 Study Notes',
  lastUpdated: true,
  appearance: 'dark',
  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    logo: '/images/logo.png',
    outlineTitle: '目录',
    sidebarMenuLabel: '菜单',
    lastUpdatedText: '最近更新时间',
    returnToTopLabel: '返回顶部',

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '前端笔记',
        link: '/web_notes/index',
      },
      {
        text: 'java笔记',
        link: '/java_notes/index',
      },
      {
        text: '文章杂类',
        link: '/article/index',
      },
      {
        text: '项目文档',
        link: '/document/index',
      },
      {
        text: '计算机基础',
        link: '/computer/index',
      },
    ],

    sidebar: generateSidebar([
      {
        documentRootPath: 'docs',
        collapseDepth: 1,
        rootGroupText: '前端笔记',
        resolvePath: '/web_notes/',
        scanStartPath: 'web_notes',
        manualSortFileNameByPriority: [
          'JavaScript',
          'TypeScript',
          'Vue3',
          'Nodejs',
          'Nodejs重学',
          'MySQL',
        ],
      },
      {
        documentRootPath: 'docs',
        collapseDepth: 1,
        rootGroupText: 'java笔记',
        resolvePath: '/java_notes/',
        scanStartPath: 'java_notes',
      },
      {
        documentRootPath: 'docs',
        collapseDepth: 1,
        rootGroupText: '文章杂类',
        resolvePath: '/article/',
        scanStartPath: 'article',
      },
      {
        documentRootPath: 'docs',
        collapseDepth: 1,
        rootGroupText: '项目文档',
        resolvePath: '/document/',
        scanStartPath: 'document',
      },
      {
        documentRootPath: 'docs',
        collapseDepth: 1,
        rootGroupText: '计算机基础',
        resolvePath: '/computer/',
        scanStartPath: 'computer',
      },
    ]),

    search: {
      provider: 'local',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/shihangbin' }],

    editLink: {
      pattern:
        'https://github.com/shihangbin/vitepress-notes/edit/maindocs/:path',
      text: '在Github上编辑页面',
    },
  },
})
