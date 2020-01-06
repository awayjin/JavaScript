const rpcClient = require('./rpc/rpc-client.js')

module.exports = async function (sortType = 0, filtType = 0) {

  // 使用微服务拉取数据
  const data = await new Promise((resolve, reject) => {
    rpcClient.write({
      sortType,
      filtType,
    }, (err, data) => {
      err ?  reject(err) : resolve(data)
    })
  })
  return data
}