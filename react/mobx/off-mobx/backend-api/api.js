const express = require('express')

const app = express()
const PORT = process.env.PORT || 3001

// 跨域配置
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'User-Agent, Origin, Cache-Control, Content-type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS, HEAD');
  res.header('Content-Type', 'application/json;charset=utf-8');
  // res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.get('/getUserInfo', (req, res) => {
  const data = [
    {
      id: Math.random(),
      name: '张三',
      age: 20
    },
    {
      id: Math.random(),
      name: '李四',
      age: 23
    }
  ]
  res.json({ code: 0, status: 200, data })
})

app.listen(PORT, () => { console.log(`server is listening port ${PORT}`) })