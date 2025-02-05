const blessed = require('blessed')
const contrib = require('blessed-contrib')

const screen = blessed.screen({
  fullUnicode: true,
})

const lineChat = contrib.line({
  width: '40%',
  height: 16,
  style: {
    line: "yellow",
    text: "green",
    baseline: "blue"
  },
  label: "temperature change"
})


const data = {
  x: ['2025/02/05', '2025/02/06', '2025/02/07', '2025/02/08', '2025/02/09'],
  y: [8, -2, 3, 12, -5]
}

screen.append(lineChat)

lineChat.setData([data])

screen.key('C-c', () => {
  screen.destroy()
})

screen.render()