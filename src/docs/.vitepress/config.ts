import { defineConfig } from 'vitepress'
import path from 'node:path'

const outDir = path.resolve(__dirname, '../../../docs')
console.log('outDir:', outDir)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'vue3-zoom-drag',
  description: 'Docs about vue3-zoom-drag',
  outDir,
  base: '/vue3-zoom-drag/',
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xachary/vue3-zoom-drag' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/vue3-zoom-drag' },
    ],
    logo: '/favicon-48x48.jpeg',
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh',
      themeConfig: {
        nav: [
          { text: '首页', link: '/index' },
          { text: '快速上手', link: '/guide/install' },
          { text: 'API', link: '/api/index' },
          { text: '示例', link: 'https://xachary.github.io/vue3-zoom-drag/demo' },
          { text: '请我喝杯&#129380;!', link: '/donate' },
        ],
        sidebar: {
          '/guide/': [
            {
              text: '快速上手',
              items: [
                { text: '安装', link: '/guide/install' },
                { text: '使用', link: '/guide/usage' },
              ],
            },
          ],
          '/api/': [
            {
              text: 'API',
              items: [{ text: 'ZoomDrag', link: '/api/index' }],
            },
          ],
        },
        outlineTitle: '导航',
        docFooter: {
          prev: '上一页',
          next: '下一页',
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/index' },
          { text: 'Guide', link: '/en/guide/install' },
          { text: 'API', link: '/en/api/index' },
          { text: 'Demo', link: 'https://xachary.github.io/vue3-zoom-drag/demo' },
          { text: 'Buy me a &#129380;!', link: '/donate' },
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Quick Start',
              items: [
                { text: 'Install', link: '/en/guide/install' },
                { text: 'Usage', link: '/en/guide/usage' },
              ],
            },
          ],
          '/en/api/': [
            {
              text: 'API',
              items: [{ text: 'ZoomDrag', link: '/en/api/index' }],
            },
          ],
        },
        outlineTitle: 'Navigate',
        docFooter: {
          prev: 'Previous page',
          next: 'Next page',
        },
      },
    },
  },
})
