import { consola } from 'consola'
import { createSpinner } from 'nanospinner'
import color from 'picocolors'
import { ROOT } from '../common/constant.js'

export function slimPath(path: string) {
  const str = path.replace(ROOT, '')
  return color.yellow(str)
}

export { consola, createSpinner }
