const cpu = require('os').cpus()
const cluster = require('cluster')

console.log('cpu:', cpu)
console.log('cluster:', cluster)
console.log('process.pid:', process.pid)