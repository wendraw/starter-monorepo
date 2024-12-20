import fs from 'node:fs'
import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// import dts from 'vite-plugin-dts'

const componentMap: Record<string, string> = {}

fs.readdirSync(path.resolve(__dirname, 'src')).forEach((name) => {
  const componentDir = path.resolve(__dirname, 'src', name)
  const isDir = fs.lstatSync(componentDir).isDirectory()
  if (isDir && fs.readdirSync(componentDir).includes('index.vue'))
    componentMap[name] = fileURLToPath(new URL(`./src/${name}/index.vue`, import.meta.url))
})

export default defineConfig({
  plugins: [
    vue(),
    // dts(),
  ],
  resolve: {
    alias: {
      '@wendraw/lib': resolve(__dirname, '../lib/src'),
      '@wendraw/lib2': resolve(__dirname, '../inner/lib2/src'),
    },
  },
  build: {
    lib: {
      entry: {
        index: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        ...componentMap,
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ['vue', '@wendraw/lib', '@wendraw/lib2'],
      output: {
        assetFileNames: '[name].[ext]',
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['@wendraw/lib', '@wendraw/lib2'],
  },
})
