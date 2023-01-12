// import { PasswordMutateType, UserType } from 'stores/auth/user';
import request from '@/utils/request';
import { UserType, PasswordMutateType } from '@/types/stores/auth/user';
import { ReqOptions } from '@/types/common';

/**
 * 请求示例
 * 1. /example接口，请求url为/example
 * 2. /example/:id接口，请求url为/example/{id}
 * 3. /example/:id/someurl接口，请求url为/example/{id}/someurl
 * Note: 上述例子中的动态参数放在@param data 中
 */
class LoginFetch {
  login(data: { [key: string]: any }, reqOptions?: ReqOptions) {
    return request<UserType>({
      url: '/login',
      method: 'post',
      data,
      ...reqOptions,
    });
  }

  logout() {
    return request({
      url: '/logout',
      method: 'post',
    });
  }

  loginWithCode(data: { code: string }, reqOptions?: ReqOptions) {
    return request({
      url: '/accounts/verifyAuthCode',
      method: 'post',
      data,
      ...reqOptions,
    });
  }

  changePassword(params: PasswordMutateType) {
    return request({
      url: '/accounts/{id}/modifyPassword',
      method: 'put',
      data: { ...params },
    });
  }
}

export default new LoginFetch();

// import request from '@/utils/request';
// // import { LimitedResourceFetch } from './fetch';
// import { ReqOptions } from '@/types/common';

// class LoginFetch {
//   login(data: { [key: string]: any }, reqOptions?: ReqOptions) {
//     return request<UserType>({
//       url: '/login',
//       method: 'post',
//       data,
//       ...reqOptions,
//     });
//   }

//   async logout() {
//     return request<any[]>({
//       url: '/logout',
//       method: 'post',
//     });
//   }

//   async loginWithCode(data: { code: string }, reqOptions?: ReqOptions) {
//     return request<any[]>({
//       url: '/accounts/verifyAuthCode',
//       method: 'post',
//       data,
//       ...reqOptions,
//     });
//   }

//   async changePassword(params: PasswordMutateType) {
//     return request<any[]>({
//       url: '/accounts/{id}/modifyPassword',
//       method: 'put',
//       data: { ...params },
//     });
//   }
// }

// export default new LoginFetch();
