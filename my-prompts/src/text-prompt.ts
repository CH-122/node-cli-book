import ansiEscapes from 'ansi-escapes'
import { Key, Prompt } from './prompt.ts'
import chalk from 'chalk'

export interface TextPromptOptions {
  type: 'text'
  name: string
  message: string
}

function isNonPrintableChar(char: string) {
  return /^[\x00-\x1F\x7F]$/.test(char)
}

export class TextPrompt extends Prompt {
  out = process.stdout
  cursor = 0
  firstRender = true

  constructor(private options: TextPromptOptions) {
    super()
  }

  clearScreen() {
    this.out.write(ansiEscapes.clearScreen)
    this.out.write(ansiEscapes.cursorTo(0, 0))
  }

  onKeyInput(str: string, key: Key) {
    if (key.name === 'backspace') {
      this.cursor--
      this.value = this.value.slice(0, this.cursor)
    }

    if (!isNonPrintableChar(str)) {
      this.value += str
      this.cursor++
    }

    this.render()
  }

  render() {
    // 只在第一次渲染时清空屏幕
    if (this.firstRender) {
      this.clearScreen()
      this.firstRender = false
    }

    this.out.write(ansiEscapes.eraseLine)
    this.out.write(ansiEscapes.cursorTo(0))

    this.out.write(
      [
        chalk.bold(this.options.message),
        chalk.gray('›'),
        ' ',
        chalk.blue(this.value),
      ].join('')
    )

    this.out.write(ansiEscapes.cursorSavePosition)

    this.out.write(ansiEscapes.cursorDown(1) + ansiEscapes.cursorTo(0))

    if (this.value === '') {
      this.out.write(chalk.red('请输入名字'))
    } else {
      this.out.write(ansiEscapes.eraseLine)
    }

    this.out.write(ansiEscapes.cursorRestorePosition)
  }
}
