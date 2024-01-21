// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import imageViewer from 'vitepress-plugin-image-viewer'
import { useRoute } from 'vitepress'
import './style.css'
import 'viewerjs/dist/viewer.min.css'

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  },
  setup() {
    // 获取路由
    const route = useRoute()
    // 使用
    imageViewer(route)
  },
}
