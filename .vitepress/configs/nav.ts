import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '首页', link: '/' },
  { text: '资源导航', link: '/nav/' },
  {
    text: '前端',
    items: [
      { text: '总览', link: '/frontend' },
      { text: 'JavaScript', link: '/frontend/JavaScript/00-%E5%89%8D%E8%A8%80' },
      { text: 'TypeScript', link: '/frontend/TypeScript/01-%E5%9F%BA%E7%A1%80%E8%AF%AD%E6%B3%95' },
      { text: 'Node.js', link: '/frontend/Nodejs/01-%E6%9C%8D%E5%8A%A1%E5%99%A8' },
      {
        text: 'Node.js 重学',
        link: '/frontend/Nodejs%E9%87%8D%E5%AD%A6/01-Node%E6%A8%A1%E5%9D%97-fs',
      },
      { text: 'Vue3', link: '/frontend/Vue3/%E7%BD%91%E7%AB%99%E5%AF%BC%E8%88%AA' },
    ],
  },
  {
    text: '后端',
    items: [
      { text: '总览', link: '/backend' },
      { text: 'Java AI', link: '/backend/java%20AI/01-Java-%E7%9A%84%E6%A6%82%E8%BF%B0' },
      {
        text: 'MySQL',
        link: '/backend/MySQL/01-MySQL%E4%BB%8B%E7%BB%8D%E5%92%8C%E5%AE%89%E8%A3%85',
      },
    ],
  },
  {
    text: '杂类',
    items: [
      { text: '总览', link: '/other' },
      { text: 'Git', link: '/other/Git/Git%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97' },
      { text: 'npm 常用指令', link: '/other/npm%E5%B8%B8%E7%94%A8%E6%8C%87%E4%BB%A4' },
      {
        text: '计算机硬件',
        link: '/other/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A1%AC%E4%BB%B6/1-%E6%98%BE%E5%8D%A1',
      },
    ],
  },
  // { text: '测试页', link: '/test/' },
]
