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
      '@wendraw/ui': resolve(__dirname, '../packages/ui/src'),
      '@wendraw/lib': resolve(__dirname, '../packages/lib/src'),
      '@wendraw/lib2': resolve(__dirname, '../packages/inner/lib2/src'),
    },
  },
  optimizeDeps: {
    exclude: ['@wendraw/ui', '@wendraw/lib', '@wendraw/lib2'],
  },
})
