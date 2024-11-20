import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// @ts-ignore 此库无声明
import git from 'git-rev-sync'
import dayjs from 'dayjs'

import PackageJSON from './package.json'

import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

// 部署分支
let branch = ''
// 部署hash
let hash = ''
// 最近的tag
let tag = ''
try {
  branch = git.branch('./git')
  hash = git.long('./git')
  tag = git.tag('./git')
} catch (e) {
  console.error(e)
}

const __BUILD_INFO__ = {
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  git: {
    branch,
    hash,
    tag,
  },
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const m = mode === 'demo' ? 'demo' : 'dist'
  console.log('build mode:', m)

  return {
    plugins: [
      vue(),
      ...(m === 'dist'
        ? [
            dts({
              tsconfigPath: './tsconfig.build.json',
              rollupTypes: true,
              // insertTypesEntry: true
            }),
          ]
        : []),
      cssInjectedByJsPlugin(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      outDir: m === 'dist' ? m : `docs/demo`,
      // minify: m === 'dist',
      copyPublicDir: m !== 'dist',
      lib:
        m === 'dist'
          ? {
              name: PackageJSON.name,
              entry: fileURLToPath(
                new URL('./src/lib/components/GridDragResize/index.ts', import.meta.url)
              ),
              formats: ['es'],
              fileName: 'index',
            }
          : undefined,
      rollupOptions:
        m === 'dist'
          ? {
              external: ['vue'],
              output: {
                globals: {
                  vue: 'Vue',
                },
              },
            }
          : undefined,
    },
    base: './',
    server: {
      host: true,
    },
    define: {
      __BUILD_INFO__,
    },
  }
})
