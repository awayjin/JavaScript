# taro 小程序

## 导入已有项目
通过微信开发者工具打开项目的`dist`文件夹
```shell script
git checkout -b feat-XXX
yarn
# 微信小程序开发
yarn dev:weapp
```

## 组件
html常用标签，在小程序里可能不会生效。所以请用 taro 组件。
`import { View, Text, Butoon } from '@tarojs/components'`

### 父字组件的交互

组件的事件传递都要以 on 开头

## API
微信小程序原生 API，比如 `wx.navigateTo` 改成 `Taro.navigateTo` 就可用了。
```
import Taro, { useRouter, useState, useEffect, useReachBottom } from '@tarojs/taro';
// 此处是B页面
Taro.navigateTo({
  url: 'C?id=1'
})
```


## 参考
taro 坑:
https://www.jianshu.com/p/f0e703a8d4b2

source:
https://github.com/shuiruohanyu/taro-meituan
