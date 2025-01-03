import type { OptionsType } from '../common/index'
import { createRequire } from 'node:module'
import color from 'picocolors'
import { build as buildVite } from 'vite'
import { mergeCustomViteConfig, setNodeEnv, setPlatform } from '../common/index.js'
import { getViteConfigForSiteProd } from '../config/vite.base.js'

export async function build(options: OptionsType) {
  setNodeEnv(options.mode === 'prod' ? 'production' : 'development')
  options.platform && setPlatform(options.platform)
  const config = await mergeCustomViteConfig(
    await getViteConfigForSiteProd(options),
    options.mode,
  )
  const require = createRequire(import.meta.url)
  const { version } = require('vite/package.json') as { version: string }
  const viteInfo = color.cyan(`vite v${version}`)
  console.log(`\n  ${viteInfo}${color.green(' building \n')}`)
  await buildVite(config)
}
