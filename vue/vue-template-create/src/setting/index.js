import LocalStorage from 'local-storage'
// import sourceOrgManagement from './source-org-management' // 组织管理

export default {
  install (Vue) {
    // 指令: 点击包含元素外关闭
    Vue.directive('clickOutSide', {
      bind (el, binding) {
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
      unbind (el) {
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
      }
    })

    Vue.prototype.$appConfig = {
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
      // 远程资源
      api: {
        // 首页
        home () {
          // return `h5/v1/user/dashboard`
          return `/static/datum/home.json`
        }
      },
      // 离线存储
      // this.$appConfig.ls.get('UESR_INFO')
      // this.$appConfig.ls.set('UESR_INFO', '2222')
      ls: LocalStorage
    }
  }
}
