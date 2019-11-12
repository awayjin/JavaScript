// 环境变量
let env = process.env
console.log('env:', env)
if (env.NODE_ENV === 'production') {
  console.log('生产环境')
} else {
  console.log('非生产环境')
}

let argv = process.argv
console.log('argv:', argv)

// 打印 process.argv。
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

// 启动：node process.js one two=three four