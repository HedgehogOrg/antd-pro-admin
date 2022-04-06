import { makeAutoObservable } from 'mobx';
import { LoginType, UserType } from '@/types/stores/user';
import { login } from '@/apis/login';

const localToken = localStorage.getItem('ADMIN_TOKEN') || '';
const localUser = JSON.parse(localStorage.getItem('ADMIN_USER_INFO') || '{}');
const localLanguage = getLanguage();

function getLanguage() {
  const tmpLanguate = localStorage.getItem('ADMIN_LANGUAGE')
    || (Intl ? Intl.NumberFormat().resolvedOptions().locale : navigator.languages)
    || 'zh-CN';
  return tmpLanguate === 'zh-TW' ? 'zh-HK' : tmpLanguate as string;
}

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
  get permission() {
    return this.user.permission || [];
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('ADMIN_TOKEN', String(this.token));
  }

  clearToken() {
    this.token = '';
    localStorage.removeItem('ADMIN_TOKEN');
  }

  setUser(user: object) {
    this.user = user;
    localStorage.setItem('ADMIN_USER_INFO', JSON.stringify(this.user));
  }

  clearUser() {
    localStorage.removeItem('ADMIN_USER_INFO');
  }

  setLanguage(language: string) {
    this.language = language;
    localStorage.setItem('ADMIN_LANGUAGE', String(this.language));
  }

  // 登录
  login(values: LoginType) {
    return login(values).then((data) => {
      // 记录登录状态
      this.setToken(JSON.stringify(data));
      // 模拟生成一些数据
      this.setUser({ ...data, role: { type: 1, name: '超级管理员' } });
      return data;
    }).catch((err) => Promise.reject(err));
  }

  // 退出
  logout() {
    this.clearToken();
    this.clearUser();
    return Promise.resolve();
  }
}

export default new User();
