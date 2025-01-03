import { resolve } from 'node:path'
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
})
