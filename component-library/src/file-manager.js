const blessed = require('blessed')

const screen = blessed.screen({
  fullUnicode: true,
})

const fm = blessed.filemanager({
  parent: screen,
  border: 'line',
  width: 'half',
  height: 'shrink',
  top: 'center',
  left: 'center',
  label: '文件管理器',
  keys: true,
  cwd: process.cwd(),
  style: {
    selected: {
      bg: 'blue'
    }
  },
  scrollbar: {
    bg: 'white'
  }
})

fm.on('file', (file) => {
  screen.destroy()

  console.log(file);

})

screen.key('C-c', () => {
  screen.destroy()
})

fm.refresh()

screen.render()