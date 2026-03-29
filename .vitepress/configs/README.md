# VitePress 配置模块说明

本目录用于拆分 `.vitepress/config.ts`，把不同职责的配置独立维护。

## 文件职责

- `index.ts`：统一导出入口
- `site-config.ts`：站点级基础配置（语言、标题、markdown、默认暗色等）
- `theme-config.ts`：主题配置（导航、目录、页脚、搜索、社交链接等）
- `feature-config.ts`：扩展能力配置（访客统计、评论系统）
- `vite-plugins.ts`：Vite/VitePress 插件集合
- `markdown-id-resolver.ts`：自定义路径解析插件，修复 root-relative 链接在 Windows 下的解析问题
- `head.ts`：head 标签配置
- `nav.ts`：顶部导航配置
- `sidebar.ts`：侧边栏配置

## 主配置组装关系

`config.ts` 中通过以下方式组装：

1. 根据 `GITHUB_REPOSITORY` 计算 `base`
2. 合并 `createSiteConfig(head)`
3. 设置 `themeConfig = createThemeConfig(nav)`
4. 合并 `featureConfig`
5. 注入 `vite.plugins = vitePlugins`

## 常见修改入口

- 改默认主题、站点标题：`site-config.ts`
- 改导航和社交链接：`theme-config.ts`、`nav.ts`
- 增删插件：`vite-plugins.ts`
- 改评论和统计：`feature-config.ts`

## 维护建议

- `config.ts` 只保留“组装逻辑”，避免堆叠业务细节
- 每个配置模块只维护一个职责
- 修改插件后执行一次 `npm run build` 做回归验证
