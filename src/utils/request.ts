import { message } from 'antd';
import axios from 'axios';
import Config from '@/config/config';
import user from '@/stores/user';

export type RequestOptions = {
  url: string;
  method?: string;
  data?: object;
  version?: string;
};

export enum APIVersion {
  V1 = 'v1',
  V2 = 'v2',
  V3 = 'v3',
}

axios.defaults.baseURL = Config.BASE_URL;
axios.defaults.timeout = 20000;

// 请求前拦截
axios.interceptors.request.use((req) => {
  req.headers!.Authorization = user.token;
  return req;
});

// 返回前拦截
axios.interceptors.response.use((res) => {
  const { status: statusCode, statusText } = res;
  // 网络请求成功
  if (statusCode >= 200 && statusCode <= 299) {
    return res.data;
  } if (statusCode >= 400 && statusCode <= 499) {
    message.error('客户端请求出错');
  } else if (statusCode >= 500 && statusCode <= 599) {
    message.error('服务器出错');
  }

  return Promise.resolve({ code: statusCode, message: statusText });
}, (error) => {
  // 网络请求失败
  if (error.message === 'Network Error') {
    message.error('网络请求失败');
  } else {
    message.error(error.message);
  }
  return Promise.reject(error);
});

const fetch = (options: RequestOptions) => {
  const {
    url, method = 'get', data,
  } = options;

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: data,
      });
    case 'post':
      return axios.post(url, data);
    case 'put':
      return axios.put(url, data);
    case 'delete':
      return axios.delete(url, { data });
    default:
      return axios.get(url, {
        params: data,
      });
  }
};

const request = (options: RequestOptions) => fetch(options)
  .then((res) => res)
  .catch((err) => {
    console.log(err);
  });

export default request;
