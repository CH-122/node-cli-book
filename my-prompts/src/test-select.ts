import chalk from 'chalk'
import { Key, Prompt } from './prompt.ts'
import ansiEscapes from 'ansi-escapes'

export interface SelectPromptOptions {
  type: 'select'
  name: string
  message: string
  choices: string[]
}

export class SelectPrompt extends Prompt {
  out = process.stdout
  index = 0

  constructor(private options: SelectPromptOptions) {
    super()
    this.value = options.choices[0]
  }

  onKeyInput(str: string, key: Key) {
    if (key.name !== 'up' && key.name !== 'down') return

    if (key.name === 'up') {
      this.index = Math.max(0, this.index - 1)
    } else if (key.name === 'down') {
      this.index = Math.min(this.options.choices.length - 1, this.index + 1)
    }

    this.value = this.options.choices[this.index]

    this.render()
  }

  render() {
    this.out.write(ansiEscapes.cursorHide)
    this.out.write(ansiEscapes.eraseLine)

    this.out.write(ansiEscapes.cursorSavePosition)

    this.out.write(ansiEscapes.cursorTo(0))

    this.out.write(
      [
        chalk.bold(this.options.message),
        chalk.gray('>'),
        ' ',
        chalk.blue(this.value),
      ].join('')
    )

    for (let i = 0; i < this.options.choices.length; i++) {
      const choice = this.options.choices[i]
      this.out.write(ansiEscapes.cursorDown(1))
      this.out.write(ansiEscapes.cursorTo(2))

      if (this.value === choice) {
        this.out.write(chalk.blue('>') + ' ' + chalk.bold(choice))
      } else {
        this.out.write('  ' + choice)
      }
    }

    this.out.write(ansiEscapes.cursorRestorePosition)

    this.out.write(ansiEscapes.cursorShow)
  }
}
