function add(a: number, b: number) {
  if (a === 1) {
    throw new Error('xxx')
  }
  return a + b
}

function main() {
  console.log(add(1, 2))
}

main()

/**
 *  node --import ./dist/register.js ./dist/index.js
 *  --import 在执行文件前先执行一个文件
 *
 */
