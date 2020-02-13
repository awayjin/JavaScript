

console.log('process.env:', process.env)
console.log('process.env:', process.env.NODE_ENV)

// NODE_ENV=development node process.js
// node process.js NODE_ENV=development

const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'development') {
  console.log('开发环境', NODE_ENV)
} else {
  console.log('生产环境', NODE_ENV)
}

console.log('process', process)
console.log('process.memoryUsage():', process.memoryUsage())
