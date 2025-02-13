import blessed from 'blessed'
import contrib from 'blessed-contrib'
import si from 'systeminformation';
import CpuMonitor from './gtop/cpu.js';
import MemoryMonitor from './gtop/memory.js';
import NetworkMonitor from './gtop/network.js';
import DiskMonitor from './gtop/disk.js';
import ProcessMonitor from './gtop/process.js';

si.currentLoad((data) => {
  // console.log(data)
})

// si.processes(data => {
//   console.log(data);
// })

// return



const screen = blessed.screen({
  fullUnicode: true,
})

const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen })


const cpu = grid.set(0, 0, 4, 12, contrib.line, {
  label: 'CPU History',
  showLegend: true
})


new CpuMonitor(cpu).init();

const memoryAndSwap = grid.set(4, 0, 4, 8, contrib.line, {
  label: 'Memory and Swap History',
  showLegend: true
})

const memory = grid.set(4, 8, 2, 4, contrib.donut, {
  radius: 8,
  arcWidth: 2,
  label: 'Memory'
})

const swap = grid.set(6, 8, 2, 4, contrib.donut, {
  radius: 8,
  arcWidth: 2,
  label: 'Swap'
})

new MemoryMonitor(memoryAndSwap, memory, swap).init();

const network = grid.set(8, 0, 2, 6, contrib.sparkline, {
  label: 'Network History',
  showLegend: true
})

new NetworkMonitor(network).init();


const disk = grid.set(10, 0, 2, 6, contrib.donut, {
  label: 'Disk Usage',
  radius: 4,
  arcWidth: 2,
})

new DiskMonitor(disk).init();


const process = grid.set(8, 6, 4, 6, contrib.table, {
  keys: true,
  label: 'Processes',
  columnSpacing: 1,
  columnWidth: [7, 24, 7, 7]
})

new ProcessMonitor(process).init();

process.focus()




screen.key('C-c', () => {
  screen.destroy()
})

screen.render()
