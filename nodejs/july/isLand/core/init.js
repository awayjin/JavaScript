const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
  static init (app) {
    InitManager.app = app
    InitManager.initLoadRouter()
    InitManager.loadHttpException()
    InitManager.loadConfig()
  }

  // 导入路由
  static initLoadRouter () {
    const cwd = `${process.cwd()}/app/api`
    requireDirectory(module, cwd, {
      visit: loadModuleRouter
    })

    function loadModuleRouter (obj) {
      if (obj instanceof Router) {
        // 导入 Router 目录
        InitManager.app.use(obj.routes())
      }
    }
  }

  // 挂载全局异常类
  static loadHttpException () {
    const errors = require('./http-exception')
    global.errors = errors
  }

  // 配置文件
  static loadConfig (argPath = '') {
    const configPath = argPath || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }

}

module.exports = InitManager