import { existsSync } from 'node:fs'
import { basename, extname, resolve } from 'node:path'
import MarkdownPreview from 'vite-plugin-markdown-preview'
import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'

import { nav, head, sidebar } from './configs'

const APP_BASE_PATH = basename(process.env.GITHUB_REPOSITORY || '')

let viteRoot = process.cwd()

const markdownIdResolver = {
  name: 'vitepress-markdown-id-resolver',
  enforce: 'pre' as const,
  configResolved(config: { root: string }) {
    viteRoot = config.root
  },
  resolveId(source: string) {
    // 修复 Windows 下 root-relative 资源被解析到磁盘根目录的问题。
    if (!source.startsWith('/') || source.startsWith('//')) {
      return null
    }

    let cleanedSource = source
    try {
      cleanedSource = decodeURIComponent(source)
    } catch {
      // 若路径中包含非法编码，则保持原值继续尝试解析。
    }

    const relativePath = cleanedSource.split(/[?#]/)[0].slice(1)
    const normalizedPath = relativePath.replace(/\/+$/, '')
    const hasMdExt = normalizedPath.endsWith('.md')
    const hasFileExt = extname(normalizedPath) !== ''
    const candidates = [
      resolve(viteRoot, normalizedPath),
      resolve(viteRoot, 'public', normalizedPath),
    ]

    if (hasMdExt) {
      const withoutExt = normalizedPath.slice(0, -3)
      candidates.push(resolve(viteRoot, 'docs', normalizedPath))
      candidates.push(resolve(viteRoot, withoutExt, 'index.md'))
      candidates.push(resolve(viteRoot, 'docs', withoutExt, 'index.md'))

      // 兼容 /foo/bar/index.md 实际对应 docs/foo/bar.md 的场景。
      if (withoutExt.endsWith('/index')) {
        const basePath = withoutExt.slice(0, -'/index'.length)
        candidates.push(resolve(viteRoot, `${basePath}.md`))
        candidates.push(resolve(viteRoot, 'docs', `${basePath}.md`))
      }
    }

    if (!hasFileExt) {
      candidates.push(resolve(viteRoot, `${normalizedPath}.md`))
      candidates.push(resolve(viteRoot, 'docs', `${normalizedPath}.md`))
      candidates.push(resolve(viteRoot, normalizedPath, 'index.md'))
      candidates.push(resolve(viteRoot, 'docs', normalizedPath, 'index.md'))
    }

    for (const candidate of candidates) {
      if (existsSync(candidate)) {
        return candidate
      }
    }

    return null
  },
}

const vitePressConfigs = {
  // outDir: '../dist',
  base: APP_BASE_PATH ? `/${APP_BASE_PATH}/` : '/',
  lang: 'zh-CN',
  title: 'XBIN',
  srcDir: 'docs',
  description: 'XBIN 的学习笔记，包含前端常用知识、源码阅读笔记、各种奇淫技巧、日常提效工具等',
  head,
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    i18nRouting: false,
    favicon: '/public/favicon.ico',
    logo: 'https://img.xbin.cn/blog/20260328192021445.png',
    outlineTitle: '目录',
    sidebarMenuLabel: '菜单',
    lastUpdatedText: '最近更新时间',
    returnToTopLabel: '返回顶部',

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

    socialLinks: [{ icon: 'github', link: 'https://github.com/shihangbin' }],

    editLink: {
      pattern: 'https://github.com/shihangbin/vitepress-notes/edit/maindocs/:path',
      text: '在Github上编辑页面',
    },
  },
  // rewrites: {
  //   'guide/:page': 'help/:page',
  // },
  /* 访客统计 */
  visitor: {
    /** 统计 id（单独页面的统计会作为前缀使用）*/
    // badgeId: 'maomao1996.vitepress-nav-template',
  },
  /**
   * giscus 评论配置
   *  请根据 https://giscus.app/zh-CN 生成内容填写
   */
  comment: {
    /** github 仓库地址 */
    repo: '',
    /** giscus 仓库 ID */
    repoId: '',
    /** Discussion 分类 */
    category: '',
    /** giscus 分类 ID */
    categoryId: '',
  },
  vite: {
    plugins: [markdownIdResolver, MarkdownPreview()],
  },
}

export default defineConfig(withSidebar(vitePressConfigs, sidebar))
