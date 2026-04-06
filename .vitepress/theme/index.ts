import { h, watch } from 'vue'
import { useData, EnhanceAppContext } from 'vitepress'
// import DefaultTheme from 'vitepress/theme'
import DefaultTheme from 'vitepress/theme-without-fonts'

// 已切换到 vitepress-plugin-image-preview，保留旧实现仅作备用。
// import { createMediumZoomProvider } from './composables/useMediumZoom'

import MLayout from './components/MLayout.vue'
import MNavLinks from './components/MNavLinks.vue'

import './styles/index.scss'

let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,
  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(MLayout, props)
  },

  // 👇 预加载本地字体，消除官方警告
  transformHead({ assets }: { assets: string[] }) {
    const fonts: any[] = []

    // 匹配 CascadiaCode 字体（兼容 ttf/woff2）
    const cascadiaFont = assets.find(file =>
      /Cascadia-Code-Regular\.[\w-]+\.(ttf|woff2?)$/i.test(file)
    )
    if (cascadiaFont) {
      fonts.push([
        'link',
        {
          rel: 'preload',
          href: cascadiaFont,
          as: 'font',
          type: cascadiaFont.endsWith('.woff2')
            ? 'font/woff2'
            : cascadiaFont.endsWith('.woff')
              ? 'font/woff'
              : 'font/ttf',
          crossorigin: '',
        },
      ])
    }

    // 匹配 LXGW WenKai 字体（兼容 ttf/woff2）
    const lxgwwenkaiFont = assets.find(file =>
      /LXGWWenKai-Regular\.[\w-]+\.(ttf|woff2?)$/i.test(file)
    )
    if (lxgwwenkaiFont) {
      fonts.push([
        'link',
        {
          rel: 'preload',
          href: lxgwwenkaiFont,
          as: 'font',
          type: lxgwwenkaiFont.endsWith('.woff2')
            ? 'font/woff2'
            : lxgwwenkaiFont.endsWith('.woff')
              ? 'font/woff'
              : 'font/ttf',
          crossorigin: '',
        },
      ])
    }

    return fonts
  },

  enhanceApp({ app, router }: EnhanceAppContext) {
    // 已切换到 vitepress-plugin-image-preview，停用 medium-zoom 旧方案。
    // createMediumZoomProvider(app, router)

    app.provide('DEV', import.meta.env.DEV)

    app.component('MNavLinks', MNavLinks)

    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () =>
          updateHomePageStyle(
            /* /vitepress-nav-template/ 是为了兼容 GitHub Pages */
            location.pathname === '/' || location.pathname === '/vitepress-nav-template/'
          ),
        { immediate: true }
      )
    }
  },
}

if (typeof window !== 'undefined') {
  // detect browser, add to class for conditional styling
  const browser = navigator.userAgent.toLowerCase()

  // 先判 edge，再判 chrome，避免误判
  if (browser.includes('edg/')) {
    document.documentElement.classList.add('browser-edge')
  } else if (browser.includes('chrome')) {
    document.documentElement.classList.add('browser-chrome')
  } else if (browser.includes('firefox')) {
    document.documentElement.classList.add('browser-firefox')
  } else if (browser.includes('safari')) {
    document.documentElement.classList.add('browser-safari')
  }
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
      :root {
        animation: rainbow 12s linear infinite;
      }`
    // 用 head 更稳，不依赖 body 是否已可用
    document.head.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return
    homePageStyle.remove()
    homePageStyle = undefined
  }
}
