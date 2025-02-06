import { copyFileSync, mkdirSync, statSync, rmSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import * as glob from 'glob'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

async function copyTemplates() {
  const templatesDir = join(__dirname, '../template')
  const distDir = join(__dirname, '../dist/template')

  // 如果目标目录存在，先删除它
  try {
    rmSync(distDir, { recursive: true, force: true })
  } catch (err) {
    // 忽略不存在的目录错误
  }

  // 重新创建目标目录
  mkdirSync(distDir, { recursive: true })

  // 使用 glob 查找所有 template-* 文件和目录
  const templatePaths = await glob.glob('template-*', {
    cwd: templatesDir,
    absolute: false
  })

  console.log('Found templates:', templatePaths)

  // 复制每个模板
  for (const path of templatePaths) {
    const sourcePath = join(templatesDir, path)
    const targetPath = join(distDir, path)

    // 检查是否是目录
    const stats = statSync(sourcePath)
    if (stats.isDirectory()) {
      // 如果是目录，递归复制整个目录
      copyDir(sourcePath, targetPath)
    } else {
      // 如果是文件，直接复制
      copyFileSync(sourcePath, targetPath)
    }
  }
}

// 递归复制目录的辅助函数
function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true })
  const entries = glob.sync('**/*', { cwd: src, dot: true })

  for (const entry of entries) {
    const srcPath = join(src, entry)
    const destPath = join(dest, entry)

    const stats = statSync(srcPath)
    if (stats.isDirectory()) {
      mkdirSync(destPath, { recursive: true })
    } else {
      copyFileSync(srcPath, destPath)
    }
  }
}

// 由于使用了 async 函数，需要处理 Promise
copyTemplates().catch(console.error)