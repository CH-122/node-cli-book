import chalk from 'chalk'
import minimist from 'minimist'
import prompts from 'prompts'
import { TEMPLATES, FRAMEWORKS, Framework } from './config.js'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const argv = minimist<{ template?: string; help?: boolean }>(
  process.argv.slice(2),
  { alias: { h: 'help', t: 'template' }, string: '_' }
)

const helpMessage = `\
Usage: create-vite [OPUION]... [DIRECTORY]

Create a new Vite project in JavaScript or TypeScript.
With no argument, start the CLI in interactive mode.

Options:
  -t, --template NAME    use a specific template

Avaiable templates:
${chalk.yellow('vue-ts         vue3')}  
${chalk.blue('react-ts         react19')}
${chalk.red('svelte-ts         svelte')}  
`

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, '')
}

const defaultTargetDir = 'vite-project'

async function init() {
  const argTargetDir = formatTargetDir(argv._[0])
  const argTemplate = argv.template || argv.t

  const help = argv.help

  if (help) {
    console.log(helpMessage)
    return
  }

  let targetDir = argTargetDir || defaultTargetDir

  let result: prompts.Answers<'projectName' | 'framework' | 'variant'>

  try {
    result = await prompts(
      [
        {
          type: argTargetDir ? null : 'text',
          name: 'projectName',
          message: chalk.reset('Project name:'),
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir
          },
        },
        {
          type:
            argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
          name: 'framework',
          message: chalk.reset('Select a framework:'),
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            const frameworkColor = framework.color
            return {
              title: frameworkColor(framework.display || framework.name),
              value: framework,
            }
          }),
        },
        {
          type: (framework: Framework) => {
            return framework && framework.variants?.length >= 1
              ? 'select'
              : null
          },
          name: 'variant',
          message: chalk.reset('Select a variant:'),
          initial: 0,
          choices: (framework: Framework) => {
            return framework.variants.map((variant) => {
              const variantColor = variant.color
              return {
                title: variantColor(variant.display || variant.name),
                value: variant.name,
              }
            })
          },
        },
      ],
      {
        onCancel: () => {
          throw new Error(chalk.red('×') + ' Operation cancelled')
        },
      }
    )

    const { framework, variant } = result

    const root = path.join(process.cwd(), targetDir)

    let template: string = variant || argTemplate

    console.log(`\nScaffolding project in ${chalk.green(root)}...`)

    const templateDir = path.resolve(
      fileURLToPath(import.meta.url),
      '../..',
      `template/template-${template}`
    )

    console.log(templateDir)

    const renameFiles: Record<string, any> = {
      _gitignore: '.gitignore',
    }

    const write = (file: string, content?: string) => {
      const targetPath = path.join(root, renameFiles[file] || file)
      if (content) {
        fs.writeFileSync(targetPath, content)
      } else {
        copy(path.join(templateDir, file), targetPath)
      }
    }

    const copyDir = (srcDir: string, destDir: string) => {
      fs.mkdirSync(destDir, { recursive: true })
      for (const file of fs.readdirSync(srcDir)) {
        const srcFile = path.resolve(srcDir, file)
        const destFile = path.resolve(destDir, file)
        copy(srcFile, destFile)
      }
    }

    const copy = (src: string, dest: string) => {
      const stat = fs.statSync(src)
      if (stat.isDirectory()) {
        copyDir(src, dest)
      } else {
        fs.copyFileSync(src, dest)
      }
    }

    if (!fs.existsSync(root)) {
      fs.mkdirSync(root, { recursive: true })
    }

    const files = fs.readdirSync(templateDir)

    for (const file of files) {
      write(file)
    }

    const cdProjectName = path.relative(process.cwd(), root)
    console.log(`\nDone. Now run:\n`)

    if (root !== process.cwd()) {
      console.log(
        `cd ${
          cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName
        }`
      )
    }

    console.log(`pnpm install`)
    console.log(`pnpm dev`)
    console.log('')
  } catch (e: any) {
    console.error(e.message)
    return
  }
}

init().catch((e) => {
  console.error(e)
})
