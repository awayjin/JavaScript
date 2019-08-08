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

### 3.5 多⻚⾯打包通⽤⽅案

动态获取 entry 和设置 html-webpack-plugin 数量

利⽤ glob.sync
```html
sudo yarn add --dev glob
// 动态设置多页入口
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));

  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index];
      // '/Users/cpselvis/my-project/src/index/index.js'

      const match = entryFile.match(/src\/(.*)\/index\.js/);
      const pageName = match && match[1];

      entry[pageName] = entryFile;
      htmlWebpackPlugins.push(
        new HTMLWebpackPlugin({
          inlineSource: '.css$',
          template: path.join(__dirname, `src/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: ['vendors', pageName],
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false
          }
        })
      );
    });

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA();
```

### 3.6 基础库分离

思路：将 react、 react-dom 基础包通过 cdn 引⼊，不打⼊ bundle 中

#### 3.6.1 方法1：使用 html-webpack-externals-plugin

```shell
yarn add --dev html-webpack-externals-plugin

new HtmlWebpackExternalsPlugin({
  externals: [
    {
      module: 'react',
      entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
      global: 'React',
    },
    {
      module: 'react-dom',
      entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
      global: 'ReactDOM',
    },````

  ]
  
  <script src="https://11.url.cn/now/lib/16.2.0/react.min.js" ></script>
  <script src="https://11.url.cn/now/lib/16.2.0/react-dom.min.js" ></script>

```

#### 3.6.2 方法2 利⽤ SplitChunksPlugin 进⾏公共脚本分离

Webpack4 内置的，替代CommonsChunkPlugin插件

chunks 参数说明：
- async 异步引⼊的库进⾏分离(默认)
- initial 同步引⼊的库进⾏分离
- all 所有引⼊的库进⾏分离(推荐)

利⽤ SplitChunksPlugin 分离基础包

minChunks: 设置最⼩引⽤次数为2次

minSize: 分离的包体积的⼤⼩

```
optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /(react|react-dom)/, // 把 react react-dom 提取出 vendors-xx.js
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
chunks: ['vendors', 'commons', pageName],

  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  }
```

## 3.7 tree shaking(摇树优化)

概念： 1 个模块可能有多个⽅法，只要其中的某个⽅法使⽤到了，则整个⽂件都会被打到
bundle ⾥⾯去， tree shaking 就是只把⽤到的⽅法打⼊ bundle ， 没⽤到的⽅法会在
uglify 阶段被擦除掉。


使⽤： webpack 默认⽀持，在 .babelrc ⾥设置 modules: false 即可

· production mode的情况下默认开启

要求：必须是 ES6 的语法， CJS 的⽅式不⽀持


#### 3.7.1 DCE (Dead code elimination)
代码不会被执⾏，不可到达

代码执⾏的结果不会被⽤到

代码只会影响死变量（只写不读）

if (false) {
    console.log('这段代码永远不会执行’ );
}

#### 3.7.2 Tree-shaking 原理

利⽤ ES6 模块的特点:
- 只能作为模块顶层的语句出现
- import 的模块名只能是字符串常量
- import binding 是 immutable的

代码擦除： uglify 阶段删除⽆⽤代码


## 3.8 scope hoisting
现象：构建后的代码存在⼤量闭包代码

webpack mode 为 production 默认开启

必须是 ES6 语法， CJS 不⽀持

```html
// webpack 4.0 以下要手动加入
plugins: [
+ new webpack.optimize.ModuleConcatenationPlugin()
};
```

## 3.9 代码分割的意义

对于⼤的 Web 应⽤来讲，将所有的代码都放在⼀个⽂件中显然是不够有效的，特别是当你的
某些代码块是在某些特殊的时候才会被使⽤到。 webpack 有⼀个功能就是将你的代码库分割成
chunks（语块），当代码运⾏到需要它们的时候再进⾏加载。

适⽤的场景：
- 抽离相同代码到⼀个共享块
- 脚本懒加载，使得初始下载的代码更⼩

懒加载 JS 脚本的⽅式
- CommonJS： require.ensure
- ES6：动态 import（⽬前还没有原⽣⽀持，需要 babel 转换）

如何使⽤动态 import?
- npm install @babel/plugin-syntax-dynamic-import --save-dev

ES6：动态 import（⽬前还没有原⽣⽀持，需要 babel 转换）
- "plugins": ["@babel/plugin-syntax-dynamic-import"]


## 3.10 ESLint 的必要性
安装
```html
yarn add --dev eslint  eslint-plugin-import   eslint-plugin-react  eslint-plugin-jsx-a11y

yarn add --dev eslint-loader
yarn add --dev babel-eslint
yarn add --dev eslint-config-airbnb
```


## 3.11 webpack 打包库和组件

webpack 除了可以⽤来打包应⽤，也可以⽤来打包 js 库

实现⼀个⼤整数加法库的打包
- 需要打包压缩版和⾮压缩版本
- ⽀持 AMD/CJS/ESM 模块引⼊

库的⽬录结构和打包要求

打包输出的库名称:
- 未压缩版 large-number.js
- 压缩版 large-number.min.js

如何将库暴露出去？
- library: 指定库的全局变量
- libraryTarget: ⽀持库引⼊的⽅式

npm init -y
yarn add -D webpack webpack-cli
yarn add -D terser-webpack-plugin

```javascript
module.exports = {
    mode: "production",
    entry: {
      "large-number": "./src/index.js",
      "large-number.min": "./src/index.js"
    },
    output: {
        filename: "[name].js",
        library: "largeNumber",
        libraryExport: "default",
        libraryTarget: "umd"
    }
};
```

设置⼊⼝⽂件

package.json 的 main 字段为 index.js
```html
if (process.env.NODE_ENV === "production") {
module.exports = require("./dist/large-number.min.js");
} else {
module.exports = require("./dist/large-number.js");
}
```


## 3.12 服务端渲染 (SSR-React)


## 3.13 当前构建时的⽇志显示 
统计信息 stats

如何优化命令⾏的构建⽇志

使⽤ friendly-errors-webpack-plugin
plugins: [
+ new FriendlyErrorsWebpackPlugin()
]

## 3.14 如何判断构建是否成功
在 CI/CD 的 pipline 或者发布系统需要知道当前构建状态

每次构建完成后输⼊ echo $? 获取错误码


构建异常和中断处理

webpack4 之前的版本构建失败不会抛出错误码 (error code)

Node.js 中的 process.exit 规范
- 0 表示成功完成，回调函数中， err 为 null
- ⾮ 0 表示执⾏失败，回调函数中， err 不为 null， err.code 就是传给 exit 的数字


如何主动捕获并处理构建错误？
- compiler 在每次构建结束后会触发 done 这
  个 hook
- process.exit 主动处理构建报错

```javascript
plugins: [
    function() {
        this.hooks.done.tap('done', (stats) => {
            if (stats.compilation.errors && 
            stats.compilation.errors.length && 
            process.argv.indexOf('--watch') == -1) {
                console.log('build error');
                process.exit(1);
            }
        })
    }  
]
```
