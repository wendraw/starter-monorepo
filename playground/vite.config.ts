import { resolve } from 'node:path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src/'),
    },
  },
  plugins: [
    UnoCSS(),
  ],
})
