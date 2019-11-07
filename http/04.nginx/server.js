const http = require('http')
const https = require('https')
const Axios = require('axios')
// Axios.defaults.headers.common['Authorization'] = 'de4adbf4bdc5474a9bf0a2a441639b9c'
// const instance = Axios.create({
//   // timeout: 1000,
//   headers: {'Authorization': 'de4adbf4bdc5474a9bf0a2a441639b9c'}
// })
// instance.defaults.headers.common['Authorization'] = 'de4adbf4bdc5474a9bf0a2a441639b9c'

http.createServer((req, res) => {
  console.log(req.headers.host)
  console.log(req.headers.referer)
  console.log('req.url:', req.url)
  res.writeHead(200, {
    'access-control-allow-origin': '*',
    // 允许自定义头
    'access-control-allow-headers': 'authorization',
    // 允许的方法
    'access-control-allow-methods': 'PUT, POST, Delete, GET'
  })
  res.end('333')

  // let url = 'https://fancy.4009515151.com/jobhandover/manager/api/user/current'

  // Axios({
  //   method: 'get',
  //   url: url,
  //   headers: {
  //     'Authorization': 'de4adbf4bdc5474a9bf0a2a441639b9c'
  //   }
  // })
  // // Axios.get(url)
  //   .then((data) => {
  //   console.log(data)
  //   res.end(data)
  // }, (error) => {
  //   console.log('err:', error)
  // })

  https.get({
    hostname: 'fancy-test.4009515151.com',
    // port: 443,
    path: 'jobhandover/manager/api/user/current',
    headers:{
      'Authorization':'de4adbf4bdc5474a9bf0a2a441639b9c'
    }
  }, (req) => {
    let html = ''
    req.on('data', data => {
      html += data
    })

    req.on('end', () => {
      console.log('html:', html)
      res.end(444)
    })

  }).on('error', (e) => {
    console.error(e);
  })

  console.log(req.url)
  res.writeHead(200)
  res.end('demo')
}).listen(8888)

