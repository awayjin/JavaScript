import _ from 'lodash'
import  './styles/normal.css'
// require('./styles/normal.css')

function component() {
  var element = document.createElement('div')
  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  // Lodash, currently included via a script, is required for this line to work
   // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack-3'], ' ')

  return element
}

document.body.appendChild(component())