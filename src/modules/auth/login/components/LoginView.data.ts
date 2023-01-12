/**
 * Author: Alvin
 * Modified By: Alvin
 * Created Date: 2022-04-07 14:41:07
 * Last Modified: 2022-04-07 16:55:36
 * Description:
 */

// 登录类型: 1= 账号密码 2=企业微信 3=短信验证码
export enum LoginType {
  PASSWORD = 1,
  WORKWEIXIN = 2,
  MESSAGE = 3,
}

export interface LoginInfo {
  account: string,
  password?: string,
  kind: LoginType;
}

export interface LoginInterface {
  onLogin?: (info: LoginInfo) => void,
  loading?: boolean
}
