const rpcClient = require('./rpc/rpc-client.js')

module.exports = async function (filtType = 0, sortType = 0) {

  // 使用微服务拉取数据
  const data = await new Promise((resolve, reject) => {
    rpcClient.write({
      filtType,
      sortType,
    }, (err, data) => {
      err ?  reject(err) : resolve(data.columns)
    })
  })
  return data
}
