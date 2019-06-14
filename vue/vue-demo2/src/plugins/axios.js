import Vue from 'vue'
import axios from 'axios'
import baseURL from '../utils/env-setup'

// axios.defaults.baseURL = 'https://vanvan.vankeservice.com/'
axios.defaults.baseURL = baseURL
// axios.defaults.headers.common['Authorization'] = 'Wpnz0wtYkZz85VN1z10KxjqQ4LA7NU'

// Full config:  https://github.com/axios/axios#request-config
// 中文 API:  https://www.kancloud.cn/yunye/axios/234845
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || ''
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 3 * 1000 // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // console.log('axios.js interceptors config:', config)
    // Do something before request is sent
    // config.headers['Authorization'] = 'Wpnz0wtYkZz85VN1z10KxjqQ4LA7NU'
    // axios.defaults.headers.common['Authorization'] = 'Wpnz0wtYkZz85VN1z10KxjqQ4LA7NU'
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

Plugin.install = function (Vue) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
