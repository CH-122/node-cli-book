function createFullWidthLine(text: string, bgColor: number = 44) {
  // 44 是蓝色背景
  // 获取终端宽度
  const terminalWidth = process.stdout.columns || 80

  // 清除当前行并移动到行首
  process.stdout.write('\r')

  // 设置背景色并填充整行
  const colorStart = `\x1b[${bgColor}m`
  const colorEnd = '\x1b[0m'
  const padding = ' '.repeat(terminalWidth - text.length)

  // 输出不换行
  process.stdout.write(`${colorStart}${text}${padding}${colorEnd}`)
}

createFullWidthLine(
  'Hello, World啦啦啦啦啦啦!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
)
