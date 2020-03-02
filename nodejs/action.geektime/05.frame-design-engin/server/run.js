const mount = require('koa-mount');
const app = new (require('koa'))
const fs = require('fs')

const createTemplate = require('./template/vm-template.js');
// const createTemplate = require('./template/create-template');
const requestFactory = require('./requestors/request-factory.js')

// 注册 RPC 协议
requestFactory.registerProtocol(
  'geek-rpc',
  require('./requestors/geek-rpc')
)
// 注册 HTTP 协议
requestFactory.registerProtocol(
  'http',
  require('./requestors/http')
)

function server (appConfig) {
  Object.keys(appConfig).forEach((routePath) => {
    console.log('appConfig:', appConfig)

    const dataConfig = appConfig[routePath].dataConfig
    console.log('dataConfig:', dataConfig)

    const requests = Object.keys(dataConfig).reduce((acc, curValue) => {
      console.log('acc', acc, ', curValue:', curValue) // column
      acc[curValue] = requestFactory(dataConfig[curValue])
      return acc
    }, {})
    console.log('requests:', requests)

    const template = createTemplate(appConfig[routePath].template)
    app.use(
      mount(routePath, async (ctx) => {

        ctx.status = 200;
        const result = {
          count: 100
        };

        console.log('ctx.query:', ctx.query)

        const allR = await Promise.all(
          Object.keys(requests).map(key => {
            return requests[key](ctx.query).then((res) => {
              // console.log('res:', res)
              result[key] = res;
              return res
            })
          })
        ).catch((err) => {
          console.log('err:', err)
        })
        // console.log('allR:', allR)
        console.log('result:', result)

        ctx.body = template(result)

      })
    )

  })
}

const dataConfig = {
  column: {
    protocol: 'geek-rpc',
    ip: '127.0.0.1',
    port: 4000,
    // protobufFile: __webpack_require__(/*! ./workspace/src/proto/detail.proto */ "./workspace/src/proto/detail.proto"),
    protobufFile: fs.readFileSync(__dirname + "/proto/detail.proto"),
    requestStruct: 'ColumnRequest',
    responseStruct: 'ColumnResponse',
    before (res) {
      res['ddd'] = 'ddd'
      return res
    },
    then(res) {
      return res.column;
    },
    catch (res) {
      console.log('dataConfig catch:', res)
    }
  },
}
server(
  {
    '/detail': {
      dataConfig,
      // template: 'template msg'
      template: fs.readFileSync(`${__dirname}/template/vue-index.html`)
    }
  }
)



const port = 3000
app.listen(port, () => {
  console.log('App started at port:', port)
})