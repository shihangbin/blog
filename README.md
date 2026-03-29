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

在 docs 下按分类创建 md 文件，例如：

```text
docs/frontend/JavaScript/11-事件循环.md
```

### 2) 更新顶部导航

编辑 [.vitepress/configs/nav.ts](.vitepress/configs/nav.ts) 中的入口链接。

### 3) 侧边栏自动扫描

编辑 [.vitepress/configs/sidebar.ts](.vitepress/configs/sidebar.ts)：

- documentRootPath: 文档根目录（通常为 docs）
- scanStartPath: 开始扫描的子目录
- resolvePath: 对应访问前缀

## 站点定制指引

面向对 VitePress 不熟悉、希望快速改出自己的站点样式与内容。

### 1) 首页内容

修改 [docs/index.md](docs/index.md)，重点是 `hero` 与 `features`。

示例：

```yaml
hero:
	name: WEB XBIN
	text: Study Web Notes.
	tagline: 不忘初心,方得始终!
	image:
		src: /logo.png
		alt: WEB XBIN
	actions:
		- text: 前端导航
			link: /nav/
			theme: alt
features:
	- icon: 📖
		title: 前端物语
		details: 整理前端常用知识点<br />如有异议按你的理解为主，不接受反驳
```

### 2) 顶部导航

修改 [.vitepress/configs/nav.ts](.vitepress/configs/nav.ts)。

### 3) 导航页数据

修改 [docs/nav/data.ts](docs/nav/data.ts)，每个站点项包含 `icon`、`title`、`desc`、`link`。

### 4) 站点图标与标题

- Head 图标配置： [.vitepress/configs/head.ts](.vitepress/configs/head.ts)
- 站点标题与描述： [.vitepress/configs/site-config.ts](.vitepress/configs/site-config.ts)
- 主题 Logo： [.vitepress/configs/theme-config.ts](.vitepress/configs/theme-config.ts)

## 配置模块说明

当前配置已模块化，主文件 [.vitepress/config.ts](.vitepress/config.ts) 仅负责组装。

### 文件职责

- [.vitepress/configs/index.ts](.vitepress/configs/index.ts)：统一导出入口
- [.vitepress/configs/site-config.ts](.vitepress/configs/site-config.ts)：站点基础配置
- [.vitepress/configs/theme-config.ts](.vitepress/configs/theme-config.ts)：主题配置
- [.vitepress/configs/feature-config.ts](.vitepress/configs/feature-config.ts)：访客统计与评论配置
- [.vitepress/configs/vite-plugins.ts](.vitepress/configs/vite-plugins.ts)：插件集合
- [.vitepress/configs/markdown-id-resolver.ts](.vitepress/configs/markdown-id-resolver.ts)：Windows 路径解析修复
- [.vitepress/configs/head.ts](.vitepress/configs/head.ts)：head 标签
- [.vitepress/configs/nav.ts](.vitepress/configs/nav.ts)：顶部导航
- [.vitepress/configs/sidebar.ts](.vitepress/configs/sidebar.ts)：侧边栏

### 主配置组装关系

1. 根据 `GITHUB_REPOSITORY` 计算 `base`
2. 合并 `createSiteConfig(head)`
3. 设置 `themeConfig = createThemeConfig(nav)`
4. 合并 `featureConfig`
5. 注入 `vite.plugins = vitePlugins`

### 维护建议

- 主配置仅保留组装逻辑，避免业务细节堆叠
- 每个模块只维护单一职责
- 调整插件后执行一次 `npm run build` 回归

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

这通常是 Windows 下 root-relative Markdown 路径被错误解析导致。项目已在 [.vitepress/configs/markdown-id-resolver.ts](.vitepress/configs/markdown-id-resolver.ts) 中增加多级回退策略：

- 路由无扩展名时回退到 docs/**.md 或 docs/**/index.md
- 请求 .../index.md 时回退到同级 ... .md
- 自动处理 URL 编码与 query/hash

如仍有个别页面报错，先检查：

- 导航链接是否遗漏 `/`
- 文件名与链接编码是否一致
- 真实文件是否存在于 `docs/` 目录

## License

MIT

## 提交

### 1) 配置远程（首次）

```bash
git remote add github https://github.com/shihangbin/blog.git
git remote add gitee https://gitee.com/shihangbin/blog.git
```

```bash
# 如果 github 已存在，更新地址
git remote set-url github https://github.com/shihangbin/blog.git

# 如果 gitee 已存在，更新地址
git remote set-url gitee https://gitee.com/shihangbin/blog.git
```

```bash
git remote -v
```

### 2) 提交代码（本地）

```bash
git add .
git commit -m "更新内容"
```

### 3) 推送方式 A：单独推送到一个远程

```bash
git push -u github main
```

```bash
git push -u gitee main
```

### 4) 推送方式 B：同一次提交推送到两个远程

```bash
git push -u github main && git push -u gitee main
```

