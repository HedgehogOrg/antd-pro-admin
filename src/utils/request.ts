import { message } from 'antd';
import axios from 'axios';
import config from '../config/config';
import user from '../stores/user';

// 默认基础配置
const request = axios.create({
  baseURL: config.baseUrl,
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
    const { code, message: msg, data } = res.data
    if (code === 0 || code === undefined) {
      // 网络请求成功，业务数据正常
      return data
    }
    // 网络请求成功，但是业务操作失败
    switch (code) {
      case -1:
        message.error(msg)
        break;
      default:
        break;
    }
    return Promise.reject(res.data)
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
