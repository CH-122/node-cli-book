#!/usr/bin/env node
import { Command } from 'commander'
import chalk from 'chalk'
import path from 'path'
import { access, writeFile } from 'node:fs/promises'
import { transformFile } from './transform.js'
const program = new Command()

program.name('hh-nest-cli').description('自动添加 controller').version('1.0.0')

program
  .command('transform')
  .description('修改 module 代码，添加 controller')
  .argument('path', '待转换的文件路径')
  .action(async (filePath: string) => {
    if (!filePath) {
      console.log(chalk.red('文件路径不能为空'))
    }

    const p = path.join(process.cwd(), filePath)

    try {
      await access(p)

      const formattedCode = await transformFile(filePath)

      writeFile(p, formattedCode)

      console.log(`${chalk.bgBlueBright('UPDATE')} ${filePath}`)
    } catch (error) {
      console.log(chalk.red('文件路径不存在'))
    }
  })

program.parse()
