import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '首页', link: '/' },
  { text: '资源导航', link: '/nav/' },
  {
    text: '前端',
    items: [
      { text: '总览', link: '/frontend/' },
      { text: 'JavaScript', link: '/frontend/JavaScript/00-前言' },
      { text: 'TypeScript', link: '/frontend/TypeScript/01-基础语法' },
      { text: 'Node.js', link: '/frontend/Nodejs/01-服务器' },
      {
        text: 'Node.js 重学',
        link: '/frontend/Nodejs重学/01-Node模块-fs',
      },
      { text: 'Vue3', link: '/frontend/Vue3/网站导航' },
    ],
  },
  {
    text: '后端',
    items: [
      { text: '总览', link: '/backend/' },
      { text: 'Java AI', link: '/backend/java AI/01_环境变量_变量_常量' },
      {
        text: 'MySQL',
        link: '/backend/MySQL/01.数据库基础',
      },
      {
        text: '服务器与部署',
        link: '/backend/服务器与部署/Nginx',
      },
      {
        text: '消息队列',
        link: '/backend/消息队列/RabbitMQ',
      },
      {
        text: '缓存与中间件',
        link: '/backend/缓存与中间件/Redis',
      },
      {
        text: '构建与依赖',
        link: '/backend/构建与依赖/Maven依赖管理项目构建工具',
      },
    ],
  },
  {
    text: '杂类',
    items: [
      { text: '总览', link: '/other/' },
      { text: 'Git', link: '/other/Git/Git入门指南' },
      { text: 'npm 常用指令', link: '/other/npm常用指令' },
      {
        text: '计算机硬件',
        link: '/other/计算机硬件/1-显卡',
      },
    ],
  },
  {
    text: '项目',
    items: [
      { text: '微信小程序', link: '/project/微信小程序/微信小程序' },
      { text: 'Vue3+TS 后台管理系统', link: '/project/vu3+ts后台管理系统/后台管理系统' },
      { text: 'Vue3 移动端项目', link: '/project/vu3移动端项目/冬三九旅途' },
    ],
  },
  // { text: '测试页', link: '/test/' },
]
