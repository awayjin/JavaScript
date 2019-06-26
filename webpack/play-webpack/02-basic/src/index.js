import bar from './bar'
import json from './demo.json'
import rawTxt from 'raw-loader!./raw.txt'
bar()
console.log('json', json)
console.log('rawTxt2:', rawTxt)
// console.log('rawTxt2:', JSON.parse(rawTxt))

var func = () => {
  console.log('arrow function')
}

func()