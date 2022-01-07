import { observable, computed, action , makeObservable} from 'mobx'

const token = localStorage.getItem('ADMIN_TOKEN') || ''
const user = JSON.parse(localStorage.getItem('ADMIN_USER_INFO') || '{}')

class User {
  constructor() {
    makeObservable(this)
  }
  @observable token = token
  @observable user = user
  @action
  login (token: string) {
    this.token = token
    localStorage.setItem('ADMIN_TOKEN', String(this.token))
  }
  @action
  logout () {
    this.token = ''
    localStorage.removeItem('ADMIN_TOKEN')
  }
  @action
  setUser (user: object) {
    this.user = user;
    localStorage.setItem('ADMIN_USER_INFO', JSON.stringify(this.user))
  }
  @action
  clearUser() {
    localStorage.removeItem('ADMIN_USER_INFO')
  }
}

export default new User()
