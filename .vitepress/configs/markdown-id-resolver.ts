import { existsSync } from 'node:fs'
import { extname, resolve } from 'node:path'

let viteRoot = process.cwd()

// 统一处理 Markdown 中以 / 开头的路径，兼容 Windows 与 docs 目录结构。
export const markdownIdResolver = {
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
