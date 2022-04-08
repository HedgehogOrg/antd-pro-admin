import { message } from 'antd';
import axios from 'axios';
import Config from '@/config/config';
import user from '@/stores/user';
import { APIVersion, Method } from '@/enums';

export type RequestOptions = {
  url: string;
  method?: string;
  data?: object;
  version?: string;
};

axios.defaults.baseURL = `${Config.BASE_URL}/api`;
axios.defaults.timeout = 20000;
axios.defaults.headers.common = {
  'X-Api-Ver': '1.0',
  'Content-Type': 'application/json',
};

// 请求前拦截
axios.interceptors.request.use((req) => {
  req.headers!.Authorization = user.token;
  return req;
}, (err) => Promise.reject(err));

// 返回前拦截
axios.interceptors.response.use((res) => {
  const { status: statusCode, statusText } = res;

  // 网络请求成功
  if (statusCode >= 200 && statusCode <= 299) {
    return res.data;
  } if (statusCode >= 400 && statusCode <= 499) {
    message.error('客户端请求错误');
  } if (statusCode >= 500 && statusCode <= 599) {
    message.error('服务器错误');
  }

  return Promise.reject({ code: statusCode, message: statusText });
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
    url, method = Method.GET, data, version = APIVersion.V1,
  } = options;

  axios.defaults.headers.common.Accept = `application/vnd.sd.${version}+json`;

  switch (method.toLowerCase()) {
    case Method.GET:
      return axios.get(url, {
        params: data,
      });
    case Method.POST:
      return axios.post(url, data);
    case Method.PUT:
      return axios.put(url, data);
    case Method.DELETE:
      return axios.delete(url, { data });
    default:
      return axios.get(url, {
        params: data,
      });
  }
};

const request = (options: RequestOptions) => fetch(options)
  .then((res) => res)
  .catch((err) => Promise.reject(err));

export default request;
