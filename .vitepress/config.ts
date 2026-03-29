import { basename } from 'node:path'
import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'

import {
  createSiteConfig,
  createThemeConfig,
  featureConfig,
  nav,
  head,
  sidebar,
  vitePlugins,
} from './configs'

// GitHub Pages 部署时自动挂载仓库名作为 base，本地开发则使用根路径。
const APP_BASE_PATH = basename(process.env.GITHUB_REPOSITORY || '')

// 站点基础配置：语言、标题、Markdown、暗色模式等。
const siteConfig = createSiteConfig(head)
// 主题配置：导航、页脚、搜索、社交链接等。
const themeConfig = createThemeConfig(nav)

const vitePressConfigs = {
  base: APP_BASE_PATH ? `/${APP_BASE_PATH}/` : '/',
  ...siteConfig,
  themeConfig,
  ...featureConfig,
  vite: {
    plugins: vitePlugins,
  },
}

export default defineConfig(withSidebar(vitePressConfigs, sidebar))
