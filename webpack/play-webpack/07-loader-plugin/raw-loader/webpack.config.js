const path = require('path')


console.log('join:::---', path.join(__dirname, './dist/main.js'))
console.log('resolve:---', path.resolve(__dirname, './dist/main.js'))
console.log('\n')


console.log('join:---', path.join('wwwroot', 'foo', 'bar'))
console.log('resolve:---', path.resolve('/wwwroot', '/foo', '/bar'))
console.log('resolve:---', path.resolve('/wwwroot', '/foo', '/bar'))
console.log('resolve:---', path.resolve(__dirname,'/img/so'))
console.log('\n')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.txt/,
        // path.resolve() 方法将路径或路径片段的序列解析为绝对路径。
        // use: path.resolve(__dirname, './src/raw-loader.js'),
        use: [
          {
            loader: path.resolve(__dirname, './src/raw-loader.js'),
            // 传参
            options: {
              name: 'name1',
              arg1: 'arg1'
            }
          }
        ]

      },
      // {
      //   test: /\.js/,
      //   use: [
      //     path.resolve('./loaders/a-loader.js'),
      //     path.resolve('./loaders/b-loader.js')
      //   ]
      // }
    ]
  }
}