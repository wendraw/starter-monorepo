import type { BuildLibOptions } from '../common/index.js'
import { createRequire } from 'node:module'
import color from 'picocolors'
import { build as buildVite } from 'vite'
import { mergeCustomViteConfig, setNodeEnv } from '../common/index.js'
import { getViteConfigForLib } from '../config/vite.base.js'

export async function buildLib(options: BuildLibOptions) {
  setNodeEnv('production')
  const config = await mergeCustomViteConfig(
    await getViteConfigForLib(options),
    'prod',
  )

  const require = createRequire(import.meta.url)
  const { version } = require('vite/package.json') as { version: string }
  const viteInfo = color.cyan(`vite v${version}`)
  console.log(`\n  ${viteInfo}${color.green(' building \n')}`)
  await buildVite(config)
}
