const cluster = require('cluster')


if (cluster.isMaster) {
  cluster.fork()
  cluster.fork()
  cluster.fork()
  console.log('fork')
} else {
  console.log('app')
  const app = require('./app.js')
  app.listen(3000)
}

// const app = require('./app.js')
// app.listen(3000)