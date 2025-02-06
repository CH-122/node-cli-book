import si from 'systeminformation'
import contrib from 'blessed-contrib'

const parts = {
  p: 'pid',
  c: 'cpu',
  m: 'mem'
}

export default class ProcessMonitor {

  table
  interval = null

  pSort = parts.c


  reIndex = false

  reverse = false


  constructor(table) {
    this.table = table
  }


  init() {
    const updater = () => {
      si.processes(data => {
        this.updateData(data)
      })
    }

    updater()

    this.interval = setInterval(updater, 3000)

    this.table.screen.key(['m', 'c', 'p'], (ch, key) => {
      if (parts[ch] == this.pSort) {
        this.reverse = !this.reverse
      } else {
        this.pSort = parts[ch] || this.pSort
      }

      this.reIndex = true

      updater()
    })
  }


  updateData(data) {
    const part = this.pSort

    const list = data.list.sort((a, b) => {
      return b[part] - a[part]
    }).map(p => {
      return [
        p.pid + '',
        p.command,
        ' ' + p.cpu.toFixed(1),
        p.mem.toFixed(1)
      ]
    })


    var header = ['PID', 'Command', '%CPU', '%Memory']

    const position = {
      pid: 0,
      cpu: 2,
      mem: 3
    }[this.pSort] || 0

    header[position] += this.reverse ? ' ▲' : ' ▼'

    this.table.setData({
      headers: header,
      data: this.reverse ? list.reverse() : list
    })


    if (this.reIndex) {

      this.table.rows.select(0)
      this.reIndex = false
    }

    this.table.screen.render()
  }
}