import type { OptionsType } from '../common/index'
import { createRequire } from 'node:module'
import color from 'picocolors'
import { preview as previewVite } from 'vite'
import { setNodeEnv, setPlatform } from '../common/index.js'

export async function preview(options: OptionsType) {
  setNodeEnv('development')
  options.platform && setPlatform(options.platform)
  const previewServer = await previewVite({ server: { open: true } })

  const require = createRequire(import.meta.url)
  const { version } = require('vite/package.json') as { version: string }
  const viteInfo = color.cyan(`vite v${version}`)
  console.log(`\n  ${viteInfo}${color.green(' preview server running at:\n')}`)

  previewServer.printUrls()
}
