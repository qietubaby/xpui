/**
 * @Desc node版本检查
 * @Author dongji136
 * @Date 2021/03/22
 */
const version = process.version
const vl = version
  .replace('v', '')
  .split('.')
  .map(Number)
const limit = [12, 13, 1]

let pass = true

if (vl[0] < limit[0]) {
  pass = false
}

if (vl[0] === limit[0] && (vl[1] < limit[1] || vl[2] < limit[2])) {
  pass = false
}

if (!pass) {
  console.log(
    '\x1B[31m%s\x1B[39m',
    `
  node版本必须 >= ${limit.join('.')}，请执行：nvm install && nvm use\n
`,
  )
  process.exit(1)
}

process.exit(0)
