import si from 'systeminformation'
import contrib from 'blessed-contrib'

export default class NetworkMonitor {

  sparkline
  interval = null

  networkData = []

  constructor(line) {
    this.sparkline = line
  }

  init() {
    this.networkData = Array(60).fill(0)

    si.networkInterfaceDefault(iface => {
      const updater = () => {
        si.networkStats(iface, data => {

          this.updateData(data[0])
        })
      }


      updater()

      this.interval = setInterval(updater, 1000)
    })
  }

  updateData(data) {


    const rx_sec = Math.max(0, data['rx_sec'])

    this.networkData.shift()
    this.networkData.push(rx_sec)

    const rx_label = `Receiving:    ${formatBytes(rx_sec)}\nTotal received: ${formatBytes(data['rx_bytes'])}`

    this.sparkline.setData([rx_label], [this.networkData])
    this.sparkline.screen.render()
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0.00 B'

  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(1024))

  return +(bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i]
}
