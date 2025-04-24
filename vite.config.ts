import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { prismjsPlugin } from 'vite-plugin-prismjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    prismjsPlugin({
      languages: 'all', // 语言
      plugins: ['line-numbers','show-language','copy-to-clipboard','inline-color'],
      theme: 'okaidia',// 主题
      css: true,
  })
  ],
  resolve: {
    alias: {
      '@': '/src', // 将 @ 别名为 src 目录
    },
  },
})
