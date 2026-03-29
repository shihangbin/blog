import type { HeadConfig } from 'vitepress'

export const head: HeadConfig[] = [
  // 设置浏览器地址栏主题色。
  ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  // 启用移动端 Web App 模式。
  ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
  // 启用 iOS Web App 模式。
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  // 配置 iOS 状态栏样式。
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'dark' }],
  // iOS 主屏幕图标。
  ['link', { rel: 'apple-touch-icon', href: 'https://img.xbin.cn/blog/favicon.ico' }],
  // Safari 固定标签页图标。
  ['link', { rel: 'mask-icon', href: 'https://img.xbin.cn/blog/favicon.ico', color: '#3eaf7c' }],
  // Windows 磁贴图标。
  ['meta', { name: 'msapplication-TileImage', content: 'https://img.xbin.cn/blog/favicon.ico' }],
  // Windows 磁贴主题色。
  ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
]
