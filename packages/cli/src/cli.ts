import type { BuildLibOptions, OptionsType } from './common/index.js'
import { Command } from 'commander'
import { cliVersion } from './index.js'

const program = new Command()

program.version(`@wendraw/starry ${cliVersion}`)

program
  .command('dev')
  .description('Run dev server')
  .option('-m, --mode <mode>', 'Vite mode')
  .option('-p, --platform <platform>', 'platform')
  .action(async (options: OptionsType) => {
    const { dev } = await import('./commands/dev.js')
    return dev(options)
  })

program
  .command('build')
  .description('Compile components in production mode')
  .option('-m, --mode <mode>', 'Vite mode')
  .option('-p, --platform <platform>', 'platform')
  .action(async (options: OptionsType) => {
    const { build } = await import('./commands/build.js')
    return await build(options)
  })

program
  .command('lib')
  .description('Compile library in production mode')
  .option('-m, --mode <mode>', 'Vite mode')
  .action(async (options: BuildLibOptions) => {
    const { buildLib } = await import('./commands/lib.js')
    return await buildLib(options)
  })

program
  .command('preview')
  .description('Run preview server')
  .option('-p, --platform <platform>', 'platform')
  .action(async (options: OptionsType) => {
    const { preview } = await import('./commands/preview.js')
    return await preview(options)
  })

program.parse()
