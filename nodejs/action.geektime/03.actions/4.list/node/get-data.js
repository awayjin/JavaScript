const rpcClient = require('./rpc/rpc-client.js')

rpcClient.write({
  sortType: 222,
  filtType: 333,
}, (err, data) => {
  console.log('err:', err)
  console.log('data:', data)
})
