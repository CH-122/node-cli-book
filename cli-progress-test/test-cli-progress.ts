import { clearTimeout } from 'timers'
import { ProgressBar } from './cli-progress.ts'

const bar = new ProgressBar(200, 0)

bar.start()

let value = 0

const timer = setInterval(function () {
  value++

  bar.update(value)

  if (value >= bar.getTotalSize()) {
    clearTimeout(timer)
    bar.stop()
  }
}, 20)
