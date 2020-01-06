const rpcClient = require('./rpc/rpc-client.js')

rpcClient.write({
  columnid: 3
}, (err, data) => {
  console.log('err:', err)
  console.log('data:', data)
})