import axios from 'axios'
import {base} from '../api/index.js'

//const http = axios.create()
// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为Token
axios.interceptors.request.use(
  config => {
    // 后台的路由白名单
    const whiteList = [`${base}/login`, `${base}/register`]
    const token = localStorage.getItem('token');

    if(whiteList.indexOf(config.url) === -1 && token) {
      config.headers.common['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http response 拦截器
axios.interceptors.response.use(response => {
  console.log('response', response)
  if (response.status === 200) {
    return response.data
  }
  if (response.status === 401) { // 401未授权  unauthorized
    window.location.href = '#/login'
  }
  return Promise.reject(response.data)
}, error => {
  if (error.response.data.error === 'jwt expired') { // token失效
    console.log('身份认证失效，请重新登录！')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    window.location.href = '#/login'
  }
  return Promise.reject(error)
})

export default axios


