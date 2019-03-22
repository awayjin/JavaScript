import _ from 'lodash'
import  './styles/normal.css'
import printMe from './print'
// require('./styles/normal.css')

var arrow = (par) => {
  console.log(par)
}
function component() {
  var element = document.createElement('div')
  var btn = document.createElement('button')
  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  // Lodash, currently included via a script, is required for this line to work
   // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack-000'], ' ')

  btn.innerHTML = 'Click me and check the console'
  btn.onclick = printMe

  element.appendChild(btn)

  arrow('par--33')

  return element
}

// document.body.appendChild(component())
let element = component() // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(element)

// 若是热模块替换
// if (module.hot) {
//   module.hot.accept('./print.js', function() {
//     console.log('333--Accepting the updated printMe module!');
//     printMe();
//    document.body.removeChild(element);
//     element = component(); // 重新渲染页面后，component 更新 click 事件处理
//     document.body.appendChild(element);
//   })
// }
if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('1---------------------------------!');
    console.log('12.--Accepting the updated printMe module!');
    // printMe()
    document.body.removeChild(element)
    element = component() // 重新渲染页面后，component 更新 click 事件处理
    document.body.appendChild(element)
  })
}