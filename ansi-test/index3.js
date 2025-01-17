import ansiEscapes from 'ansi-escapes';

// 创建一个写入标准输出的快捷方法
const log = process.stdout.write.bind(process.stdout);

// 将光标移动到第1行第0列，然后输出 '111'
log(ansiEscapes.cursorTo(0, 1) + '111');

// 将光标移动到第2行第1列，然后输出 '222'
log(ansiEscapes.cursorTo(1, 2) + '222');

// 将光标移动到第3行第2列，然后输出 '333'
log(ansiEscapes.cursorTo(2, 3) + '333');

// 1.5秒后执行
setTimeout(() => {
  // 将光标移动到第1行第3列，然后清除从光标位置到行尾的内容
  log(ansiEscapes.cursorTo(3, 3) + ansiEscapes.eraseEndLine);
}, 1500);
