const express = require('express')

const app = express()
const PORT = process.env.PORT || 3003

// 跨域配置
app.all('*', function (req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', 'User-Agent, Origin, Cache-Control, Content-type');
  // res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS, HEAD');
  // res.header('Content-Type', 'application/json;charset=utf-8');
  // // res.header("Access-Control-Allow-Credentials", "true");
  // next();

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 5.4.3')
  res.header("Content-Type", "application/json;charset=utf-8");
  // next();
  if (req.method == 'OPTIONS') {
    res.status(200).end()
  } else {
    next()
  }
});

app.get('/backend/getUserInfo', (req, res) => {

  console.log('req:', req)
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
  // res.json({ code: 0, status: 200, data })
  res.json({ code: 20, status: 200, result: data, message: 'msg' })
  // res.json({
  //   code: 0,
  //   message: 'msg',
  //   result: [
  //     { a: 1, name: 'n1'},
  //     { a: 2, name: 'n1'},
  //   ]
  // })

})

app.listen(PORT, () => { console.log(`server is listening port ${PORT}`) })