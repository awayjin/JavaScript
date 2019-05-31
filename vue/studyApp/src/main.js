'use strict';

import 'es6-promise/auto'
import Vue from 'vue'   /*引入vue.js  require 是一样的      */
import Mint from 'mint-ui';
import App from './App.vue' /*引入一个组件*/
import "babel-polyfill";
import router from './router'
import request from "@/api/request";
import service from '@/api/axios';
import { Indicator } from 'mint-ui';
import message from "@/utils/message";
import storage from "@/utils/storage";//本地存储方法封装

import './assets/css/reset.css';
import 'mint-ui/lib/style.css';
import './assets/css/myMint.css';
import './assets/css/border.css';
import './assets/icon_font.css';

import VueRouter from 'vue-router'
import VueVideoPlayer from 'vue-video-player'
Vue.use(VueRouter)
Vue.use(Mint);
Vue.use(VueVideoPlayer)

Vue.prototype.$request = request

Vue.config.productionTip = false
/* eslint-disable no-new */

// respone拦截器
service.interceptors.response.use(
  response => {
    // 系统级问题
    if (response.status === 500) { // 服务器500
      message.toastOnce("系统异常，请联系管理员");
    }
    if(response.data.code === 400){
      message.toastOnce("网络不稳定");
    }
    if(response.status != 200){
      message.toastOnce("网络不稳定");
    }
    Indicator.close();

    return response.data;
  },
  error => {
    Indicator.close();
    //console.log("response error:", error);

    if (error.toString().indexOf('401') > -1) {
      // 1. token失效或者第一次进入需要登录
      storage.clearToken(); // 清除token
      message.toastOnce("授权已过期，请重新登录");
      // window.location.href='api/app/index'    // 登录
    } else if (error.toString().indexOf('500') > -1) {
      // 2. 服务器500 (Maybe)
      message.toastOnce("系统异常，请联系管理员"); // (修改意见：跳到500页面，点击回到APP)
    } else if (navigator.onLine === false) { // error.code === undefined ||
      // 3. 完全没有网络
      message.toastOnce("连接失败，请确保手机网络可用"); // 提示稍后再试
    } else if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
      // 4. 连接超时 可能没有连接万科wifi或者网络慢、服务器超时
      message.toastOnce("连接超时，请稍后重试"); // 408 提示稍后再试
    }else{
      // message.toastOnce("网络不稳定");
    }
    Promise.reject(error);
  }
);
// End respone拦截器


// JSON.parse 替换方法

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
