import type { Alias } from 'vite'
import fs from 'node:fs/promises'
import path, { join, resolve } from 'node:path'
import { ROOT } from '../common/constant.js'
import { exists, isDir } from '../common/index.js'

type relativePath = '.' | `./${string}`
interface PackageJson {
  name: string
  type?: 'module' | 'commonjs'
  main?: string
  module?: string
  exports?: Record<relativePath, {
    import?: relativePath
    default?: relativePath
    require?: relativePath
  }>
  buildOptions?: {
    isLib: boolean
  }
}

/**
 * dir: user-path/wendraw/packages/styles
 * source: @wendraw/styles => user-path/wendraw/packages/styles
 *      or @wendraw/styles/colors => user-path/wendraw/packages/styles/colors
 */
export async function monorepoCustomResolver(dir: string, packagesJson: PackageJson, source: string) {
  let sourcePath = source
  // 如果 import 使用的是比 dir 长，那说明是使用了 export 的子包
  const exportSubpackPath = sourcePath.replace(dir, '')
  if (exportSubpackPath) {
    const relativePath = `.${resolve('./', exportSubpackPath)}` as relativePath
    if (packagesJson.exports?.[relativePath]) {
      // TODO: @wendraw exports 中的路径可能是构建后的产物，可能不能直接用
      const subpackPath = packagesJson.type === 'module'
        ? (packagesJson.exports[relativePath].import || packagesJson.exports[relativePath].default || '')
        : packagesJson.exports[relativePath].require ?? ''
      sourcePath = resolve(dir.replace(exportSubpackPath, ''), subpackPath)
    }
  }
  else {
    // 没有使用子包的模式
    // 先判断 exports
    const relativePath = '.'
    let subpackPath = packagesJson.type === 'module' ? packagesJson.module : packagesJson.main
    subpackPath = subpackPath || packagesJson.main // 可能没有配置 module 字段
    if (packagesJson.exports?.[relativePath]) {
      subpackPath = packagesJson.type === 'module'
        ? (packagesJson.exports[relativePath].import || packagesJson.exports[relativePath].default)
        : packagesJson.exports[relativePath].require
    }
    // 再使用 module
    sourcePath = resolve(dir.replace(exportSubpackPath, ''), subpackPath ?? '')
  }

  // 是否是文件
  if (await exists(sourcePath) && !isDir(sourcePath)) {
    return sourcePath
  }
  // 没有对应的声明就使用 src 下的 index
  const ext = ['.ts', '.tsx', '.js', '.jsx', '.mjs']
  for (const e of ext) {
    const resPath = resolve(sourcePath, 'src', `index${e}`) // 源码放在 src 下
    const rootPath = resolve(sourcePath, `index${e}`) // 源码放在根目录下
    if (await exists(resPath)) {
      return resPath
    }
    if (await exists(rootPath)) {
      return rootPath
    }
  }
  return source
}

async function getMonoRepoSubpackMap(dir: string) {
  const packageJsonMap: Record<string, PackageJson> = {}
  const getDeps = async (dir: string) => {
    const files = await fs.readdir(dir)

    for (const file of files) {
      if (!file.includes('node_modules') && isDir(resolve(dir, file))) {
        await getDeps(join(dir, file))
      }
    }
    const packageJsonPath = files
      .filter(file => file.endsWith('package.json'))
      .map(file => path.join(dir, file))[0]

    if (packageJsonPath) {
      packageJsonMap[dir] = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'))
    }
  }
  await getDeps(dir)

  return packageJsonMap
}

export async function genMonorepoAlias(prefix = '@wendraw'): Promise<Alias[]> {
  const alias: Alias[] = []
  // get all package from package.json subpackage
  const packageJsonMap = await getMonoRepoSubpackMap(ROOT)
  for (const dir in packageJsonMap) {
    const json = packageJsonMap[dir]
    if (json.buildOptions?.isLib) {
      continue // 如果是 lib 就不需要 alias
    }
    if (json?.name?.startsWith(prefix)) {
      alias.push({
        find: json.name,
        replacement: `${dir}`,
        customResolver: source => monorepoCustomResolver(dir, json, source),
      })
    }
  }
  return alias
}
