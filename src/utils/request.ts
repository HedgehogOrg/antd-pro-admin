import { message } from 'antd';
import axios from 'axios';
import Config from '@/config/config';
import user from '@/stores/user';

// 默认基础配置
const request = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 20000
})

// 请求前拦截
request.interceptors.request.use((req) => {
  req.headers!.Authorization = user.token
  return req
})

// 返回前拦截
request.interceptors.response.use((res) => {
  const { status: statusCode, statusText } = res
  // 网络请求成功
  if (statusCode >= 200 && statusCode <= 299) {
    return res.data
  } else if (statusCode >= 400 && statusCode <= 499) {
    message.error('客户端请求出错')
  } else if (statusCode >= 500 && statusCode <= 599) {
    message.error('服务器出错')
  }
  return Promise.reject({ code: statusCode, message: statusText })
}, error => {
  // 网络请求失败
  if (error.message === 'Network Error') {
    message.error('网络请求失败')
  } else {
    message.error(error.message)
  }
  return Promise.reject(error)
})

export default request
