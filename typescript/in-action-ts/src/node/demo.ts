const util = require('util')

console.log('util', util.format('a: %c, b: %c', 11, 22))

const hello = () => {
  console.log('demo.ts hello 331122')
}

exports.hello = hello