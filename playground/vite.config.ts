import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      presets: [
        presetAttributify({ /* preset options */}),
        presetUno(),
      ],
    })],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@wendraw/lib': resolve(__dirname, '../packages/lib/src'),
    },
  },
  optimizeDeps: {
    exclude: ['@wendraw/lib', '@wendraw/ui'],
  },
})
