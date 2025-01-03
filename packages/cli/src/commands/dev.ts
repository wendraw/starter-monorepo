import type { OptionsType } from '../common/index'
import { createRequire } from 'node:module'
import color from 'picocolors'
import { createServer } from 'vite'
import { mergeCustomViteConfig, setNodeEnv, setPlatform } from '../common/index.js'
import { getViteConfigForSiteDev } from '../config/vite.base.js'

export async function dev(options: OptionsType) {
  setNodeEnv('development')
  options.platform && setPlatform(options.platform)
  const config = await mergeCustomViteConfig(
    await getViteConfigForSiteDev(options),
    options.mode,
  )
  const server = await createServer(config)
  await server.listen(config.server?.port)
  const require = createRequire(import.meta.url)
  const { version } = require('vite/package.json') as { version: string }
  const viteInfo = color.cyan(`vite v${version}`)
  console.log(`\n  ${viteInfo}${color.green(' dev server running at:\n')}`)

  server.printUrls()
}
