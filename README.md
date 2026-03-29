# vitepress-notes

基于 VitePress 的学习笔记与导航站模板，适合用于沉淀前端、后端、全栈等分类文档。

## 特性

- VitePress 1.x 驱动，支持 Markdown 写作
- 自动侧边栏生成（vitepress-sidebar）
- 代码示例预览（vite-plugin-markdown-preview）
- Tailwind CSS + Sass 样式体系
- 适配中文站点配置（zh-CN）

## 环境要求

- Node.js >= 20
- npm >= 10

## 快速开始

```bash
npm install
npm run dev
```

本地开发地址通常为：

```text
http://localhost:5173/
```

## 常用命令

```bash
# 本地开发
npm run dev

# 生产构建
npm run build

# 预览构建产物
npm run preview

# 格式化
npm run format
```

## 项目结构

```text
.
├─ .vitepress/
│  ├─ config.ts              # VitePress 主配置
│  ├─ configs/
│  │  ├─ nav.ts              # 顶部导航配置
│  │  ├─ sidebar.ts          # 侧边栏扫描配置
│  │  └─ ...
│  └─ theme/                 # 自定义主题与样式
├─ docs/                     # 文档内容目录（srcDir）
│  ├─ index.md
│  ├─ frontend/
│  ├─ backend/
│  ├─ fullstack/
│  └─ nav/
├─ public/                   # 静态资源
├─ patches/                  # patch-package 补丁
├─ netlify.toml
└─ vercel.json
```

## 内容维护指南

### 1) 新增文档

在 `docs/` 下按分类创建 `.md` 文件，例如：

```text
docs/frontend/JavaScript/11-事件循环.md
```

### 2) 更新顶部导航

在 `.vitepress/configs/nav.ts` 中添加或修改入口链接。

### 3) 侧边栏自动扫描

在 `.vitepress/configs/sidebar.ts` 中为分类配置：

- `documentRootPath`: 文档根目录（通常为 `docs`）
- `scanStartPath`: 开始扫描的子目录
- `resolvePath`: 对应访问前缀

## 关键配置说明

### `.vitepress/config.ts`

- `srcDir` 指向 `docs`
- `base` 会根据 `GITHUB_REPOSITORY` 自动推导（用于 GitHub Pages 子路径）
- `markdownIdResolver` 负责修复 Windows 下 root-relative Markdown 资源解析

### `vite-plugin-markdown-preview`

用于处理 Markdown 中的示例预览块。若你升级该插件，建议验证 `patches/` 中补丁是否仍然适配。

## 部署说明

### Vercel

仓库已包含 `vercel.json`，可直接导入项目后按默认流程构建。

### Netlify

仓库已包含 `netlify.toml`。

注意：当前 `netlify.toml` 使用的是 `pnpm build`，如果你采用 npm 工作流，请改为：

```toml
[build]
publish = "dist"
command = "npm run build"
```

## 常见问题

### ENOENT: no such file or directory, open 'D:\\fullstack...\\index.md'

这通常是 Windows 下 root-relative Markdown 路径被错误解析导致。项目已在 `.vitepress/config.ts` 中通过 `markdownIdResolver` 增加多级回退策略：

- 路由无扩展名时回退到 `docs/**.md` 或 `docs/**/index.md`
- 请求 `.../index.md` 时回退到同级 `... .md`
- 自动处理 URL 编码与 query/hash

如仍有个别页面报错，先检查：

- 导航链接是否遗漏 `/`
- 文件名与链接编码是否一致
- 真实文件是否存在于 `docs/` 目录

## License

MIT
