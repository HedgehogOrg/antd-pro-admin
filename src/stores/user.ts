import { makeAutoObservable } from 'mobx'
import request from '../utils/request';

const token = localStorage.getItem('ADMIN_TOKEN') || ''
const user = JSON.parse(localStorage.getItem('ADMIN_USER_INFO') || '{}')

// 登录的数据结构
interface LoginType {
  username: string,
  password: string,
  remember: boolean
}

// 权限的数据结构
export interface PermissionType {
  menu: string,
  children?: PermissionType[]
}

// 用户的数据结构
interface UserType {
  username?: string
  permission?: PermissionType[]
}

class User {
  constructor() {
    makeAutoObservable(this)
  }
  token = token
  user: UserType = user
  get permission() {
    return this.user.permission || []
  }
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
    return request.post('/login', values).then(data => {
      // 记录登录状态
      this.setToken(JSON.stringify(data))
      // 模拟生成一些数据
      this.setUser(Object.assign({}, data, { role: { type: 1, name: '超级管理员' } }))
      return data
    })
  }
  // 退出
  logout () {
    this.clearToken()
    this.clearUser()
    return Promise.resolve()
  }
}

export default new User()
