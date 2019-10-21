const buffer1 = Buffer.from('jin')
const buffer2 = Buffer.from([1, 2, 3, 4, 55])

const buffer3 = Buffer.alloc(5)

console.log(buffer1)
console.log(buffer2)
console.log(buffer3)

buffer2.writeInt8(12, 1) // 第二位写入12
console.log(buffer2)

buffer2.writeInt16BE(512, 2)
console.log(buffer2)

buffer2.writeInt16LE(512, 2)
console.log(buffer2)


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

