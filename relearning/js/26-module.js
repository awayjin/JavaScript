// Not supported (yet):
// import { webpack} from "webpack" // 引入一个模块
// import 'webpack'

export const console = () => {
  window.console.log('source, js')
  // window.console.log(webpack)
}

export const consoleTwo = () => {
  window.console.log('consoleTwo module')
}

export default {
  console,
  consoleTwo
}