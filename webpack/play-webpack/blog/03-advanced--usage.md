# Webpack 进价用法

### 3.1 清理构建目录

当前构建时的问题，每次构建的时候不会清理⽬录，造成构建的输出⽬录 output ⽂件越来越多

通过 npm scripts 清理构建⽬录
- rm -rf ./dist && webpack
- rimraf ./dist && webpack

⾃动清理构建⽬录

避免构建前每次都需要⼿动删除 dist.使⽤ clean-webpack-plugin
- 默认会删除 output 指定的输出⽬录
- sudo yarn add --dev clean-webpack-plugin

```html

const { CleanWebpackPlugin } = require("clean-webpack-plugin")

output: {
  filename: '[name]_[hash:8].js', 
  path: path.resolve(__dirname, 'dist')
},
plugins: [
  new CleanWebpackPlugin()
]
```

### 3.2 PostCSS 插件 autoprefixer ⾃动补⻬ CSS3 前缀

使⽤ autoprefixer 插件

yarn add --dev postcss-loader autoprefixer

```html
  {
    test: /.less$/,
    use: [
      // 'style-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      'less-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            require('autoprefixer')({
              browsers: ['last 2 version', '>1%', 'ios 7']
            })
          ]
        }
      }
    ]
  }
```

### 3.3 响应式布局 REM

W3C 对 rem 的定义：根元素的字体大小(font-size of the root element)

rem 和 px 的对比：
- rem 是相对单位
- px 是绝对单位

移动端 CSS px ⾃动转换成 rem，使⽤ px2rem-loader

⻚⾯渲染时计算根元素的 font-size 值
- 可以使⽤⼿淘的lib-flexible库
- [lib-flexible](https://github.com/amfe/lib-flexible)

```html
yarn add --dev px2rem-loader
yarn add --save lib-flexible
npm i lib-flexible -S

{
    loader: 'px2rem-loader',
    options: {
        remUnit: 75,
        remPrecision: 8
    }
}

```

### 3.4 资源内联的意义

代码层⾯：
- ⻚⾯框架的初始化脚本
- 上报相关打点
- css 内联避免⻚⾯闪动

请求层⾯：减少 HTTP ⽹络请求数
- ⼩图⽚或者字体内联 (url-loader)

raw-loader 内联 html, raw-loader 内联 JS

```html
yarn add --dev raw-loader@0.5.1
 <script>
   ${ require('raw-loader!./meta.html') }

    ${ require('raw-loader!babel-loader!../node_modules/lib-flexible/flexible.js') }
  </script>
```
