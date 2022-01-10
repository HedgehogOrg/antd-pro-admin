import { makeAutoObservable } from 'mobx'

const token = localStorage.getItem('ADMIN_TOKEN') || ''
const user = JSON.parse(localStorage.getItem('ADMIN_USER_INFO') || '{}')

class User {
  constructor() {
    makeAutoObservable(this)
  }
  token = token
  user = user
  login (token: string) {
    this.token = token
    localStorage.setItem('ADMIN_TOKEN', String(this.token))
  }
  logout () {
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
}

export default new User()
