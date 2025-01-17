import ansiEscapes from 'ansi-escapes'
import { EOL } from 'os'

const write = process.stdout.write.bind(process.stdout)

export class ProgressBar {
  total: number = 0
  value: number = 0

  constructor(total: number, initialValue: number = 0) {
    this.total = total
    this.value = initialValue
  }

  getTotalSize() {
    return this.total
  }

  getValue() {
    return this.value
  }

  render() {
    const processLength = 40

    const blank = '░'
    const full = '█'

    let progress = this.value / this.total

    if (progress < 0) {
      progress = 0
    } else if (progress > 1) {
      progress = 1
      this.value = this.total
    }

    const fullLength = Math.floor(progress * processLength)
    const blankLength = processLength - fullLength

    const progressBar = full.repeat(fullLength) + blank.repeat(blankLength)

    write(ansiEscapes.cursorRestorePosition)
    write(progressBar)
    write(`  ${this.value}/${this.total}`)
  }

  start() {
    write(ansiEscapes.cursorHide)
    write(ansiEscapes.cursorSavePosition)
    this.render()
  }

  stop() {
    write(ansiEscapes.cursorShow)
    write(EOL)
  }

  update(value: number) {
    this.value = value
    this.render()
  }
}
