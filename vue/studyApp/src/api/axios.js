// import baseAxios from 'axios';
// //环境变量
// import {serverUrl} from './serverConfig'
// 获取token
// function setParam(param) {
// 	try{
// 	let token = localStorage.getItem("token");
// 	param.token = token;
// 	}catch(e){
// 		console.log('setParam(param)Error',e,e.message);
// 	}
//     return param;
// }
import methodSet from "@/common/js/public";
import axios from "axios";
import storage from "@/utils/storage";

/**
 * 开发期间如果返回401，粘贴如下地址到浏览器地址栏，登录
 * https://sit.4009515151.com/api/lebang/oauth/authorize?client_id=183f595244b764ad5a511dfacbbb3849&scopes=r-staff&redirect_uri=https%3A%2F%2Felsit.vankeservice.com%2Fapi%2Fapp%2Foauth&response_type=code&state=222&sign=y
 * 成功后把获取到的token，以 ?access_token={token}形式附加到测试地址的地址栏
 * 最终形式如下 http://localhost:8080/#/Home?access_token=fFRPOMIlcPYsO8dDlNbHiRa3TC2LNU
 */

const envConfig = require("../config/" + process.env.NODE_ENV); // 加载相应环境的配置文件
window.redirectToLogin = function() { // 重定向到登录，该函数可以在Home.vue中使用
  location.href = envConfig.LOGIN_URL;
}


// 超时时间
axios.defaults.timeout = 6000; // 30s
const service = axios.create({
});

// 跨域请求，允许保存cookie
// axios.defaults.withCredentials = true

// HTTPrequest拦截
service.interceptors.request.use(config => {
  let thisToken = methodSet.getQuery("access_token") || storage.getToken();
  config.headers['Authorization'] = `Bearer ${thisToken}`, // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  config.headers['Cache-control'] = 'no-cache'
  config.headers['x-client'] = 'app'
  //const t = new Date().getTime();
  //const url = config.url
  //config.url = url.indexOf('?') === -1 ? url + '?' + t : url + '&' + t

  return config
}, error => {
  return Promise.reject(error)
})


export default service;
