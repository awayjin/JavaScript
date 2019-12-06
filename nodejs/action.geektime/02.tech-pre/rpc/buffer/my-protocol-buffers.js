let protoBuffers = require('protocol-buffers')
let fs = require('fs')

let messages = protoBuffers(fs.readFileSync('my-test.proto'))

let buf = messages.Test.encode({
  num: 423.4,
  payload: 'hello proto'
})

console.log('buf:', buf)
// console.log('buf:', Buffer.from('012'))

let obj = messages.Test.decode(buf)
console.log('obj:', obj)
console.log('messages:', messages.Foo)