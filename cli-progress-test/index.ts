import ansiEscapes from 'ansi-escapes'
const blank = '░'
const full = '█'

process.stdout.write(ansiEscapes.cursorHide)
process.stdout.write(ansiEscapes.cursorSavePosition)
process.stdout.write(blank.repeat(100))

let progress = 0

setInterval(() => {
  if (progress < 100) {
    progress += 1
    process.stdout.write(ansiEscapes.cursorRestorePosition)
    process.stdout.write(full.repeat(progress) + blank.repeat(100 - progress))
  } else {
    process.stdout.write(ansiEscapes.cursorShow)
  }
}, 100)
