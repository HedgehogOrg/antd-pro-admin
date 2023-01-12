import { makeAutoObservable } from 'mobx';
import { LoginType, UserType } from 'stores/auth/user';
import { ReqOptions } from '@/types/common';
import LoginFetch from '@/apis/LoginFetch';
import permissions from '../permissions';
import router from '@/routes/router';
import { getLanguage } from '@/locales';

const localToken = localStorage.getItem('ADMIN_TOKEN') || '';
const localUser = JSON.parse(localStorage.getItem('ADMIN_USER_INFO') || '{}');
const localLanguage = getLanguage();

// function getLanguage() {
//   const tmpLanguate = localStorage.getItem('ADMIN_LANGUAGE')
//     || (Intl ? Intl.NumberFormat().resolvedOptions().locale : navigator.languages)
//     || 'zh-CN';
//   return tmpLanguate === 'zh-TW' ? 'zh-HK' : tmpLanguate as string;
// }

class User {
  constructor() {
    makeAutoObservable(this);
  }

  // 签名
  token = localToken;

  // 用户数据
  user: UserType = localUser;

  // 多语言
  language = localLanguage;

  // 权限列表
  // get permission() {
  //   return this.user.permission || [];
  // }
  // 登录前尝试访问的页面
  historyFrom?: string;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('ADMIN_TOKEN', String(this.token));
  }

  clearToken() {
    this.token = '';
    localStorage.removeItem('ADMIN_TOKEN');
  }

  setUser(user: UserType) {
    this.user = user;
    localStorage.setItem('ADMIN_USER_INFO', JSON.stringify(this.user));
  }

  clearUser() {
    localStorage.removeItem('ADMIN_USER_INFO');
  }

  setLocalInfo(data: UserType) {
    this.setUser(data);
    this.setToken(data.token);
  }

  setLanguage(language: string) {
    this.language = language;
    localStorage.setItem('ADMIN_LANGUAGE', String(this.language));
  }

  async initPermission() {
    await permissions.getUserPermissions();
    router.init();
  }

  clear() {
    this.clearToken();
    this.clearUser();
  }

  // 登录

  // 管理者登录
  login(values: LoginType, reqOptions?: ReqOptions) {
    return LoginFetch.login(values, reqOptions).then(async (result) => {
      this.setLocalInfo(result);
      await this.initPermission();
      return Promise.resolve();
    }).catch((err) => Promise.reject(err));
  }

  // 退出
  logout() {
    this.clearToken();
    this.clearUser();
    return Promise.resolve();
  }

  setHistoryFrom(from: string) {
    this.historyFrom = from;
  }
}

export default new User();
