const blessed = require('blessed')

const screen = blessed.screen({
  fullUnicode: true,
})

const processBar = blessed.progressbar({
  parent: screen,
  top: 'center',
  left: 'center',
  height: 1,
  width: 80,
  style: {
    bg: 'gray',
    bar: {
      bg: 'green'
    }
  }
})


screen.key('C-c', () => {
  screen.destroy()
})

let total = 0

const timer = setInterval(() => {
  if (total >= 100) {
    total = 100
    clearInterval(timer)
  }


  processBar.setProgress(total)

  screen.render()

  total += 2
})

screen.render()