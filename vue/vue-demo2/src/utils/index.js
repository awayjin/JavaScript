import LocalStorage from 'local-storage'
import SourceApi from './source-api'

export default {
  install (Vue) {
    // 指令: 点击包含元素外关闭
    Vue.directive('clickOutSide', {
      bind (el, binding, vnode) {
        function documentHandler (e) {
          if (el.contains(e.target)) {
            return false
          }
          if (binding.expression) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = documentHandler
        document.addEventListener('click', documentHandler)
      },
      unbind (el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
      }
    })

    Vue.prototype.$appConfig = {
      // 远程资源
      api: SourceApi,
      // 路径
      url: {
        homepage: ''
      },
      // 提示信息
      tips: {
        errorServer: '服务器异常',
        errorData: '数据返回异常',
        errorLoad: '加载失败',
        errorReq: '请求错误 ',
        noData: '暂无数据',
        loading: '加载中...',
        successNoData: '请求成功,无数据! 状态码:',
        lastTip: '已是最后一页!'
      },
      scrollTop: {
        set (posY) {
          return window.scrollTo(0, posY)
        },
        get () {
          let scrollTop = Math.max(document.documentElement.scrollTop, window.pageYOffset, document.body.scrollTop)
          return scrollTop
        }
      },
      ls: LocalStorage,
      // 二维码
      QRCode: {
        weekVar: '', // 点击扫码的ID，要填充值的地方
        closeApp () {
          // 关闭调App接口
          let closeObj = {
            'method': 'closeWeb',
            'content': '',
            'success': '',
            'error': ''
          }
          window.location = '/native_service?data=' + JSON.stringify(closeObj)
        }
      }
    }
    // close $appConfig
  }
}
