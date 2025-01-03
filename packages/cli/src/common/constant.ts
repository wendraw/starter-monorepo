import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'

function findRootDir(dir: string): string {
  if (existsSync(join(dir, 'pnpm-workspace.yaml'))) {
    return dir
  }

  const parentDir = dirname(dir)
  if (dir === parentDir) {
    return dir
  }

  return findRootDir(parentDir)
}

// Root paths
export const CWD = process.cwd()
export const ROOT = findRootDir(CWD)
export const ES_DIR = join(ROOT, 'es')
export const LIB_DIR = join(ROOT, 'lib')
export const DOCS_DIR = join(ROOT, 'docs')
export const STARRY_CONFIG_FILE = join(ROOT, 'starry.config.mjs')
export const PACKAGE_JSON_FILE = join(ROOT, 'package.json')

// Relative paths
const __dirname = dirname(fileURLToPath(import.meta.url))
export const CJS_DIR = join(__dirname, '..', '..', 'cjs')
export const DIST_DIR = join(__dirname, '..', '..', 'dist')
export const CONFIG_DIR = join(__dirname, '..', 'config')
export const SITE_SRC_DIR = join(__dirname, '..', '..', 'site')

// Dist files
export const PACKAGE_ENTRY_FILE = join(DIST_DIR, 'package-entry.js')
export const PACKAGE_STYLE_FILE = join(DIST_DIR, 'package-style.css')

export const STYLE_DEPS_JSON_FILE = join(DIST_DIR, 'style-deps.json')

// Config files
export const POSTCSS_CONFIG_FILE = join(CJS_DIR, 'postcss.config.cjs')
export const JEST_CONFIG_FILE = join(CJS_DIR, 'jest.config.cjs')

export const SCRIPT_EXTS = [
  '.js',
  '.jsx',
  '.vue',
  '.ts',
  '.tsx',
  '.mjs',
  '.cjs',
]
export const STYLE_EXTS = ['.css', '.less', '.scss']

export function getPackageJson() {
  const rawJson = readFileSync(PACKAGE_JSON_FILE, 'utf-8')
  return JSON.parse(rawJson)
}

export interface StarryConfig {
  // TODO: @wendraw 编译的定义配置项
  build: {
    configureVite?: (config: any) => any
  }
}

async function getStarryConfigAsync() {
  try {
    // https://github.com/nodejs/node/issues/31710
    // absolute file paths don't work on Windows
    return (await import(pathToFileURL(STARRY_CONFIG_FILE).href)).default as StarryConfig
  }
  catch (err) {
    console.error(err)
    return {}
  }
}

export async function getStarryConfig() {
  return await getStarryConfigAsync() as StarryConfig
}
