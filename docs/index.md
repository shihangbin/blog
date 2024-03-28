---
# 提供三种布局，doc、page和home
# 官方文档相关配置：https://vitepress.dev/reference/default-theme-layout
layout: home
home: true

# 官方文档相关配置：https://vitepress.dev/reference/default-theme-home-page
# title: 冬三九 Study Guide
# titleTemplate: 不忘初心,方得始终!
# editLink: true
# lastUpdated: true
hero:
  name: WEB 三九
  text: Study Web Notes.
  tagline: 不忘初心,方得始终!
  image:
    # 首页右边的图片
    src: /images/logo.png
    # 图片的描述
    alt: logo
  # 按钮相关
  actions:
    - theme: brand
      text: 前端笔记
      link: /web_notes/index
    - theme: alt
      text: 个人成长
      link: /about
# 按钮下方的描述
features:
  - title: vue.js
    icon:
      src: https://img.xbin.cn/images/2023/07/31-12-27-323870.svg
    details: 轻松建构响应式界面，Vue.js是你的前端开发新选择。
    link: https://cn.vuejs.org/
    # linkText: 玩转 Vue3
  - title: React.js
    icon:
      src: https://img.xbin.cn/images/2023/07/31-12-37-ee440d.svg
    details: 用于构建 Web 和原生交互界面的库
    link: https://react.docschina.org/
    # linkText: 玩转 React
  - title: Node.js
    icon:
      src: https://img.xbin.cn/images/2023/07/31-12-32-1ace4f.svg
    details: Node.js® 是一个开源、跨平台的 JavaScript 运行时环境。
    link: https://nodejs.cn
    # linkText: 玩转 Node
---
