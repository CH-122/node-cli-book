import si from 'systeminformation'
import contrib from 'blessed-contrib'

export default class Disk {

  donut
  interval = null

  constructor(donut) {
    this.donut = donut
  }

  init() {
    const updater = () => {
      si.fsSize('', data => {
        this.updateData(data)
      })
    }

    updater()

    this.interval = setInterval(updater, 1000)
  }


  updateData(data) {

    const disk = data[0]

    const label = formatSize(disk.used) + ' / ' + formatSize(disk.size)

    this.donut.setData([
      {
        percent: disk.use / 100,
        label: label,
        color: 'green'
      }
    ])

    this.donut.screen.render()
  }
}



function formatSize(bytes) {
  return (bytes / 1024 / 1024 / 1024).toFixed(2) + 'GB'
}
