# XSS 攻击原理和预防 

### 包含内容
- 什么是 XSS?
- XSS 类型
- 通过代码演示 XSS 的攻击方式
- XSS 的防御措施，编码、过滤、校正

### 什么是 XSS
跨站脚本攻击（英语：Cross-site scripting Attack，简称为：XSS）是一种网站应用程序的安全漏洞攻击，是代码注入的一种。它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响。

### XSS 类型
- 反射型
> 发出请求时，xss代码出现在url中，作为输入提交到服务器端，服务器端解析后响应，xss代码随响应内容一起传回给浏览器，最后浏览器解析执行xss代码。这个过程像一次反射，故叫反射型xss

- 存储型
> 存储型XSS和反射型 XSS 差别仅在于， 提交的代码会存储在服务器端(数据库，内存，文件系统)，下次请求目标页面时不用再提交XSS代码


### 通过代码理解 XSS 的攻击方式

通过 express 来生成项目, 运行 `npm start`
```
express -e xss
```

在 `routes/index.js` 更改代码
```javascript
router.get('/', function (req, res) {
  res.set('X-XSS-Protection', 0) // 关闭 XSS 保护
  res.render('index', {
    title: 'Express XSS Demo',
    xss: req.query.xss
  })
})
```

在 `views/index.ejs` 加入代码, 注意 `<%-` 是不转义
```ejs
xss: <%- xss %>
```

浏览器地址栏输入
```
// 自执行: http://localhost:3000/?xss=<img src='' onerror='alert(11)'>
// 诱导: http://localhost:3000/?xss=<p onclick='alert(22)'>click me</p>
// iFrame 广告等: http://localhost:3000/?xss=<iframe src='//qq.com' />
```

### XSS 的防御措施

编码：
对用户输入的数据进行`HTML Entity`编码.
字符用转义字符显示。字符，十进制，转义字符

过滤：
移除用户上传的`DOM`属性，如`onerror`等。
移除用户上传的`style`节点、`script`节点、`iframe`节点。

校正：
避免直接对`HTML Entity`解码。
使用 `DOM Parse` 转换，校正不配对的 `DOM` 标签。
