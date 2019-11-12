# process（进程）
process 对象是一个全局变量，它提供有关当前 Node.js 进程的信息并对其进行控制。无需使用 require()。

## 环境变量：process.env
process.env 属性返回包含用户环境的对象。 时常会判断当前服务运行的环境.
```js
// process.js
let env = process.env
console.log('env:', env)
if (env.NODE_ENV === 'production') {
  console.log('生产环境')
} else {
  console.log('非生产环境')
}
```
运行 `NODE_ENV=production node process.js`, 输出 `生产环境`

## 获取命令行参数：process.argv
process.argv 属性返回一个数组, 包含当启动 Node.js 进程时传入的命令行参数。

数组元素分别如下:
- 元素1：node
- 元素2：正在执行的 JavaScript 文件的路径
- 元素x: 将是任何其他命令行参数。

```js
// 打印 process.argv。
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

```

启动：node process.js one two=three --env-ss, 输出如下：
```
0: /Users/jinwei/.nvm/versions/node/v8.9.4/bin/node
1: /Users/jinwei/www/nodejs/JavaScript/nodejs/study-notes/process/process.js
2: one
3: two=three
4: --env-ss
```
