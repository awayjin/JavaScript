const requestors = {}
function factory (config) {
  console.log('request-factory.js config:', config)
  if (!requestors[config.protocol]) {
    console.log(`暂不支持的协议 22: ${config.protocol}`)
    throw new Error(`暂不支持的协议: ${config.protocol}`)
  }
  // console.log('forbidden')
  config.before = config.before || (d => d)
  config.then = config.then
  config.catch = config.catch || (d => d);

  requestors[config.protocol].compile(config)

  return async function (data) {

    try {
      data = config.before(data)
    } catch (e) {
      // 如果beforeHook抛出了错误，则交给catch处理。
      // 开发者可以在before抛出的error上挂属性来让catch做一些分辨逻辑。
      config.catch(e)
      // 如果catch没抛出其他错误，则认为此次请求是平安取消的
      return Promise.resolve(null)
    }

    return  {
      result: await requestors[config.protocol]
        .request(data)
        // 如果config.then里抛出乐错误
        .then(config.then)
        // 如果config.catch返回了null，那这整个请求过程其实是不算失败的
        .catch(config.catch)
    }

  }
}

/**
 * @param protocol 数据源协议名字
 * @param requestor{function} 请求流程定义
 */
factory.registerProtocol = function (protocol, requestor) {
  requestors[protocol] = requestor
}

module.exports = factory

// factory.registerProtocol = function (protocol, requestor) {
//   requestors[protocol] = requestor;
// }
//
// module.exports = factory;