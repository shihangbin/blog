import MarkdownPreview from 'vite-plugin-markdown-preview'
import { ImagePreviewPlugin } from 'vitepress-plugin-image-preview'

import { markdownIdResolver } from './markdown-id-resolver'

// Vite/VitePress 插件集中管理，避免主配置文件过长。
export const vitePlugins = [
  // 修复 Windows 下 root-relative Markdown 链接解析。
  markdownIdResolver,
  // Markdown 悬停预览能力。
  MarkdownPreview(),
  // 文档图片预览。
  ImagePreviewPlugin({
    selector: '.content-container .main img',
    zoomRatio: 1.2,
    toolbar: ['zoomIn', 'zoomOut', 'reset', 'rotateLeft', 'rotateRight', 'download'],
  }),
]
