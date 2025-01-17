import readline from 'node:readline'

// Enable keypress events on stdin
readline.emitKeypressEvents(process.stdin)

// Put stdin into raw mode to get each keypress
process.stdin.setRawMode(true)

// Listen for keypress events
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit()
  }

  // Log the pressed key string and key object
  console.log(str, key)
})
