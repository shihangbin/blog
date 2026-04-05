import type { DefaultTheme } from 'vitepress'

// 主题相关配置：导航、文档页行为、品牌信息。
export const createThemeConfig = (nav: DefaultTheme.Config['nav']) => ({
  i18nRouting: false,
  favicon: 'https://img.xbin.cn/blog/favicon.ico',
  logo: 'https://img.xbin.cn/blog/20260328192021445.png',
  outlineTitle: '目录',
  sidebarMenuLabel: '菜单',
  lastUpdatedText: '最近更新时间',
  returnToTopLabel: '返回顶部',

  // 顶部导航由单独模块维护，便于独立迭代。
  nav,
  lastUpdated: {
    text: '最后更新于',
    formatOptions: {
      dateStyle: 'short',
      timeStyle: 'medium',
    },
  },
  outline: {
    level: 'deep',
    label: '目录',
  },
  docFooter: {
    prev: '上一篇',
    next: '下一篇',
  },
  search: {
    provider: 'local',
  },

  // 右上角社交入口。
  socialLinks: [{ icon: 'github', link: 'https://github.com/shihangbin' }],

  editLink: {
    pattern: 'https://github.com/shihangbin/blog/edit/maindocs/:path',
    text: '在Github上编辑页面',
  },
})
