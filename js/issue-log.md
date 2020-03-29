## 1. vue:将px转化为rem，适配移动端vant-UI等框架(postcss-pxtorem)

(1)下载lib-flexible:
```
yarn add lib-flexible
```

(2)引入 lib-flexible:
在main.js中引入lib-flexible
```
import 'lib-flexible/flexible'
```

(3).设置meta标签
```
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
```

(4).安装postcss-pxtorem
```
yarn add postcss-pxtorem
```

(5) 配置 postcss-pxtorem
browsers 改为 overrideBrowserslist
```
module.exports = {
  plugins: {
    //...
    'autoprefixer': {
       // vant 官方的配置有问题 
       // browsers: ['Android >= 4.0', 'iOS >= 7']  // 修改前
       overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7'] // 修改后
    },
    'postcss-pxtorem': {
      rootValue: 37.5, // vant-UI的官方根字体大小是37.5
      propList: ['*']
    }
  }
}
```

可能 postcss-pxtorem 出现问题， 以上的解决方案：
```
 Replace Autoprefixer browsers option to Browserslist config.
 Use browserslist key in package.json or .browserslistrc file.

 Using browsers option can cause errors. Browserslist config
 can be used for Babel, Autoprefixer, postcss-normalize and other tools.

 If you really need to use option, rename it to overrideBrowserslist.

 Learn more at:
 https://github.com/browserslist/browserslist#readme
 https://twitter.com/browserslist
```
