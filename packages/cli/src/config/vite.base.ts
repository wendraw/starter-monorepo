import type { InlineConfig } from 'vite'

import type { OptionsType } from '../common/index'
import type { BuildLibOptions } from '../common/index.js'
import vitePluginVue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import { setBuildTarget } from '../common/index.js'
import { genMonorepoAlias } from './monorepo-alias-resolve.js'
import { StarryUiResolver } from './unplugin-vue-component-resolver.js'

export async function getViteConfigForSiteDev(_: OptionsType): Promise<InlineConfig> {
  setBuildTarget('site')

  const alias = await genMonorepoAlias()

  return {
    resolve: {
      alias,
    },

    optimizeDeps: {
      // https://github.com/youzan/vant/issues/10930
      include: ['vue', 'vue-router'],
      exclude: Object.keys(alias),
    },

    plugins: [
      vitePluginVue(),
      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        exclude: ['**/components/**/*'],
      }),
      Layouts(),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue-router',
        ],
        dts: true,
        vueTemplate: true,
      }),
      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: true,
        resolvers: [StarryUiResolver('Starry', '@wendraw/ui')],
      }),
      // https://github.com/antfu/unocss
      UnoCSS(),
    ],

    server: {
      open: true,
      host: true,
    },
  }
}

export async function getViteConfigForSiteProd(e: OptionsType): Promise<InlineConfig> {
  const devConfig = await getViteConfigForSiteDev(e)

  return {
    ...devConfig,
  }
}

export async function getViteConfigForLib(opt: BuildLibOptions): Promise<InlineConfig> {
  const devConfig = await getViteConfigForSiteDev({ mode: 'prod' })
  return {
    ...devConfig,
    build: {
      lib: opt.entry
        ? {
            entry: opt.entry,
          }
        : undefined,
    },
  }
}
