import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const componentMap: Record<string, string> = {}

fs.readdirSync(path.resolve(__dirname, 'src')).forEach((name) => {
  const componentDir = path.resolve(__dirname, 'src', name)
  const isDir = fs.lstatSync(componentDir).isDirectory()
  if (isDir && fs.readdirSync(componentDir).includes('index.vue'))
    componentMap[name] = fileURLToPath(new URL(`./src/${name}/index.vue`, import.meta.url))
})

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        ...componentMap,
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.js`,
    },
  },
})
