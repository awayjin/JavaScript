const fs = require('fs')
const protobuf = require('protocol-buffers')

const schema = protobuf(fs.readFileSync(__dirname + '/test.proto', 'utf-8'))

console.log(schema)

const buf = schema.Column.encode({
  id: 1,
  name: 'Node.js',
  price: 98.4
})
console.log('解码：', schema.Column.decode(buf))
