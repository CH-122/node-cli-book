import { createWriteStream } from 'fs'
import https from 'https'
import { ProgressBar } from './cli-progress.ts'

const downloadURLs = {
  linux:
    'https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/970501/chrome-linux.zip',
  darwin:
    'https://storage.googleapis.com/chromium-browser-snapshots/Mac/970501/chrome-mac.zip',
  win32:
    'https://storage.googleapis.com/chromium-browser-snapshots/Win/970501/chrome-win32.zip',
  win64:
    'https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/970501/chrome-win32.zip',
}

let value = 0

https.get(downloadURLs.darwin, (res) => {
  const file = createWriteStream('./chrome-darwin.zip')

  res.pipe(file)

  const totalBytes = parseInt(res.headers['content-length']!, 10)

  const progressBar = new ProgressBar(totalBytes, 0)

  progressBar.start()

  res.on('data', (chunk) => {
    value += chunk.length
    progressBar.update(value)
  })

  res.on('end', () => {
    progressBar.stop()
  })
})
