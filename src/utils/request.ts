// import { message } from 'antd';
// import axios from 'axios';
// import Config from '@/config/config';
// import user from '@/stores/user';
// import { APIVersion, Method } from '@/enums';

// export type RequestOptions = {
//   url: string;
//   method?: string;
//   data?: object;
//   version?: string;
// };

// axios.defaults.baseURL = `${Config.BASE_URL}/api`;
// axios.defaults.timeout = 20000;
// axios.defaults.headers.common = {
//   'X-Api-Ver': '1.0',
//   'Content-Type': 'application/json',
// };

// // 请求前拦截
// axios.interceptors.request.use((req) => {
//   req.headers!.Authorization = user.token;
//   return req;
// }, (err) => Promise.reject(err));

// // 返回前拦截
// axios.interceptors.response.use((res) => {
//   const { status: statusCode, statusText } = res;

//   // 网络请求成功
//   if (statusCode >= 200 && statusCode <= 299) {
//     return res.data;
//   } if (statusCode >= 400 && statusCode <= 499) {
//     message.error('客户端请求错误');
//   } if (statusCode >= 500 && statusCode <= 599) {
//     message.error('服务器错误');
//   }

//   return Promise.reject({ code: statusCode, message: statusText });
// }, (error) => {
//   // 网络请求失败
//   if (error.message === 'Network Error') {
//     message.error('网络请求失败');
//   } else {
//     message.error(error.message);
//   }
//   return Promise.reject(error);
// });

// const fetch = (options: RequestOptions) => {
//   const {
//     url, method = Method.GET, data, version = APIVersion.V1,
//   } = options;

//   axios.defaults.headers.common.Accept = `application/vnd.sd.${version}+json`;

//   switch (method.toLowerCase()) {
//     case Method.GET:
//       return axios.get(url, {
//         params: data,
//       });
//     case Method.POST:
//       return axios.post(url, data);
//     case Method.PUT:
//       return axios.put(url, data);
//     case Method.DELETE:
//       return axios.delete(url, { data });
//     default:
//       return axios.get(url, {
//         params: data,
//       });
//   }
// };

// const request = (options: RequestOptions) => fetch(options)
//   .then((res) => res)
//   .catch((err) => Promise.reject(err));

// export default request;

// import { request as fetch } from 'Remote/Router';

// export type RequestOptions = {
//   url: string;
//   method?: string;
//   data?: { [key: string]: any };
//   version?: string;
//   showErrorMessage?: boolean;
// };
// const request = <Response = any>(options: RequestOptions): Promise<Response> => fetch<Response>(options);

// export default request;

import { message as Message } from 'antd';
import axios from 'axios';
import user from '@/stores/auth/UserStore';
import { Method } from '@/enums';
import requrestDefault from './requrestDefault';
import intl from './intl';
import { RequestOptions } from '@/types/common';

Object.assign(axios.defaults, requrestDefault);

// 请求前拦截
axios.interceptors.request.use((req) => {
  if (user.token) {
    req.headers!.Authorization = `Bearer ${user.token}`;
  }
  return req;
}, (err) => Promise.reject(err));

const fetch = <Response>(options: RequestOptions) => {
  const {
    url, method = Method.GET, data, version,
  } = options;

  let newUrl = url;

  // Api版本号处理，mock数据不加版本号
  if (version && !localStorage.getItem('USE_MOCK')) {
    newUrl = `/${version}${newUrl}`;
  }
  const newData: { [key: string]: any } = {};

  if (data) {
    Object.keys(data).forEach((key) => {
      if (url.indexOf(`{${key}}`) > -1) {
        newUrl = newUrl.replace(`{${key}}`, data[key]);
      } else {
        newData[key] = data[key];
      }
    });
  }

  switch (method.toUpperCase()) {
    case Method.GET:
      return axios.get<Response>(newUrl, { params: newData });
    case Method.POST:
      return axios.post<Response>(newUrl, newData);
    case Method.PUT:
      return axios.put<Response>(newUrl, newData);
    case Method.DELETE:
      return axios.delete<Response>(newUrl, { data: newData });
    case Method.PATCH:
      return axios.patch<Response>(newUrl, newData);
    default:
      return axios.get<Response>(newUrl, {
        params: newData,
      });
  }
};

const request = <Response = any>(options: RequestOptions) => {
  let showError = true;
  if (Reflect.has(options, 'showErrorMessage')) {
    showError = !!options.showErrorMessage;
  }
  return fetch<Response>(options)
    .then((res) => res.data)
    .catch((err) => {
      const t = intl.error;
      const { response, request: req } = err;
      let code;
      let message;
      let statusCode;

      if (response && response instanceof Object) {
        // 服务器有返回
        code = response.data?.code;
        message = response.data?.message || err.message;
        statusCode = response.status;

        if (statusCode === 401) {
          setTimeout(() => {
            user.clear();
          }, 1500);
        }
        console.warn(err.response.data);
      } else if (req) {
        // 请求发出去，服务器没返回
        message = JSON.stringify(req);
        code = 'SERVER_NO_RESPONSE';
        statusCode = 0;
        console.warn(req);
      } else {
        // 请求发起失败
        message = err.message;
        code = 'NETWORK_ERROR';
        if (err.message.includes('timeout')) {
          code = 'TIMEOUT';
        }
        statusCode = -1;
        console.warn(err);
      }
      if (showError) {
        Message.error(t(code) || code);
      }

      return Promise.reject({
        code,
        message,
        statusCode,
      });
    });
};

export default request;
