const blessed = require('blessed')

const screen = blessed.screen({
  fullUnicode: true,
})


const prompt = blessed.prompt({
  parent: screen,
  border: 'line',
  height: 'shrink',
  width: 'half',
  top: 'center',
  left: 'center',
  label: '{blue-fg}{bold}登录{/bold}{/blue-fg}',
  tags: true,
})


const msg = blessed.message({
  parent: screen,
  border: 'line',
  width: 'half',
  height: 'shrink',
  top: 'center',
  left: 'center',
  label: '{blue-fg}{bold}提示{/bold}{/blue-fg}',
  tags: true,
  hidden: true,
})

prompt.input('你的用户名？', '', (err, username) => {
  prompt.input('你的密码？', '', (err, password) => {
    if (username === 'hhhh' && password === '123456') {
      msg.display('登录成功', 1)
    } else {
      msg.display('用户名或密码错误', 1)
    }


    setTimeout(() => {
      screen.destroy()
      console.log(username, password);

    }, 1000)
  })
})


screen.key('C-c', () => {
  screen.destroy()
})

screen.render()
