import blessed from 'blessed'
import contrib from 'blessed-contrib'

const screen = blessed.screen({
  fullUnicode: true,
})


const grid = new contrib.grid({
  rows: 12, cols: 12, screen: screen
})


const gauge = grid.set(0, 0, 6, 6, contrib.gauge, {
  label: '下载进度',
  width: 'half',
  height: 1,
  stroke: 'green',
  fill: 'white',
  percent: 0.3,
})

const donut = grid.set(0, 6, 6, 6, contrib.donut, {
  label: '进度',
  radius: 10,
  arcWidth: 2,
  remainColor: 'black',
  data: [
    { percent: 0.3, label: 'a:', color: 'red' },
    { percent: 0.2, label: 'b:', color: 'green' },
  ]
})


screen.key('C-c', () => {
  screen.destroy()
})

screen.render()