// JS字符串与二进制的相互转化 https://www.cnblogs.com/i,t-deepinmind/p/7430025.html
// 字符编码笔记：ASCII，Unicode 和 UTF-8:  http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html

// 1. bit就是位，也叫比特位，是计算机表示数据最小的单位
// 2 .byte就是字节
// 3.1byte=8bit
// 4.1byte就是1B
// 5.一个字符=2字节
// 6.1KB=1024B

// 创建一个 8 位长度的字符，每 1 位代表它的一个字符
// 每一位都是 16 进制的数字
// BE-LE 大端小端排布。高位跟低位的排布
const buffer1 = Buffer.from('012') // 字符串

const buffer2 = Buffer.from([1, 2, 3, 10, 11, 55]) // 数字数组


console.log('buffer1:', buffer1)
console.log('Buffer.from([]):', Buffer.from(['233']))
console.log('Buffer.from():', Buffer.from('233'))
console.log('buffer1 toString:', buffer1.toString())
console.log('buffer2:', buffer2)

buffer1.writeInt8(12)
console.log('writeInt8 buffer1:', buffer1)

buffer2.writeInt8(12, 1) // 第二位写入12, 占用一位o[
console.log('writeInt8 buffer2:', buffer2)
// console.log('writeInt8 buffer2:', buffer2.readInt16BE())

buffer2.writeInt16BE(12, 1) // 占用二位
console.log('writeInt16BE buffer2:', buffer2)

buffer2.writeInt32LE(12, 2) // 占用二位
console.log('writeInt32LE buffer2:', buffer2)


const buffer3 = Buffer.alloc(6)  // 指定 buffer 长度
console.log('buffer3:', buffer3)
buffer3.writeInt16BE(1)
console.log('buffer3:', buffer3)
buffer3.writeInt32BE(24, 2)
console.log('buffer3:', buffer3)
console.log('readInt32BE buffer3:', buffer3.readInt32BE())

const buffer4 = Buffer.alloc(6)
console.log('buffer4:', buffer4)
buffer4.writeInt16BE(1)
console.log('buffer4:', buffer4)
buffer4.writeInt32BE(136797, 2)
console.log('buffer4:', buffer4)
console.log('buffer4:', buffer4.slice(0, 2).readInt16BE(0,2))
console.log('buffer4:', buffer4.readInt32BE(2))



const buffer5 = Buffer.alloc(8)
buffer5.writeInt32BE(4)
buffer5.writeInt32BE('1234567', 4)
console.log('buffer5.length:', buffer5.length, ', buffer5:', buffer5.readInt32BE(4))


// 创建一个长度为 10、且用零填充的 Buffer
// let buffer4 = Buffer.alloc(10)r
// console.log('buffer4:', buffer4)
//
// // 创建一个长度为 10、且用 0x1 填充的 Buffer
// let buffer5 = Buffer.alloc(10, 10)
// console.log('buffer5:', buffer5)
//
// let buffer6 = Buffer.from([1, 2, 3])
// console.log('buffer6:', buffer6)
// buffer6.writeInt16BE()
// console.log('buffer6:', buffer6)


// console.log(Buffer.from([1, 2, 3, 8, 9, 10, 'A']))
//
// const fs = require('fs')
// const protobuf = require('protocol-buffers')
//
// const schema = protobuf(fs.readFileSync(__dirname + '/test.proto', 'utf-8'))
//
// console.log('schema:', schema)
//
// const buf = schema.Column.encode({
//   id: 1,
//   name: 'Node.js',
//   price: 98.4
// })
// console.log('解码：', schema.Column.decode(buf))

