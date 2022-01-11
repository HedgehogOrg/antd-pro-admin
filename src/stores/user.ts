import { makeAutoObservable } from 'mobx'
import request from '../utils/request';

const token = localStorage.getItem('ADMIN_TOKEN') || ''
const user = JSON.parse(localStorage.getItem('ADMIN_USER_INFO') || '{}')

interface LoginType {
  username: string,
  password: string,
  remember: boolean
}

class User {
  constructor() {
    makeAutoObservable(this)
  }
  token = token
  user = user
  setToken (token: string) {
    this.token = token
    localStorage.setItem('ADMIN_TOKEN', String(this.token))
  }
  clearToken () {
    this.token = ''
    localStorage.removeItem('ADMIN_TOKEN')
  }
  setUser (user: object) {
    this.user = user;
    localStorage.setItem('ADMIN_USER_INFO', JSON.stringify(this.user))
  }
  clearUser() {
    localStorage.removeItem('ADMIN_USER_INFO')
  }
  // 登录
  login (values: LoginType) {
    return request.post('/login', values).then(res => {
      const data = { username: values.username, password: values.password }
      // 记录登录状态
      this.setToken(JSON.stringify(data))
      // 模拟生成一些数据
      this.setUser(Object.assign({}, data, { role: { type: 1, name: '超级管理员' } }));
      return res
    }).catch(err => {
      if (err.code === -1) {
        console.warn(err.message)
      }
    })
  }
  // 退出
  logout () {
    this.clearToken()
    this.clearUser()
  }
}

export default new User()
