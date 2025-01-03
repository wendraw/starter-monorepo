import type { ComponentResolver } from 'unplugin-vue-components'

/**
 * Resolver for UI Components
 *
 * @author @wendraw
 */
export function StarryUiResolver(prefix: string, from: string): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(new RegExp(`^${prefix}[A-Z]/i`)))
        return { name, from }
    },
  }
}
