/*
 * @author: zhidl
 * @Date: 2019-06-13 14:56:18
 * @description: 
 */

import axios from 'axios'
import qs from 'qs'
import router from '../../router'

// 响应时间
axios.defaults.timeout = 60000;
// 配置请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  // 在发送请求之前做某件事
  if (config.method === 'post') {
    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
      config.data = qs.stringify(config.data)
    }
  }
  return config
}, (error) => {
  // console.log('错误的传参', 'fail')
  return Promise.reject(error)
})

// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(response => {
  
  return response
}, error => {
  // Do something with response error
  // console.warn('axios response error')
  return Promise.reject(error)
})

export {
  axios
}