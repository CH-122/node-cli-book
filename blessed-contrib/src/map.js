import blessed from 'blessed'
import contrib from 'blessed-contrib'

const screen = blessed.screen({
  fullUnicode: true,
})


const map = contrib.map({ label: '世界地图' })

screen.append(map)

map.addMarker({
  lat: 39.9042,
  lon: 116.4074,
  color: 'red',
  char: '🏠'
})


screen.key('C-c', () => {
  screen.destroy()
})

screen.render()
