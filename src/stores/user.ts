import { observable, computed, action , makeObservable} from 'mobx'

const loginStatus = JSON.parse(localStorage.getItem('DOCTOR_LOGIN_STATUS') || '0')
const user = JSON.parse(localStorage.getItem('DOCTOR_USER_INFO') || '{}')

class User {
  constructor() {
    makeObservable(this)
  }
  @observable loginStatus = loginStatus
  @observable user = user
  @action
  login () {
    this.loginStatus = 1
    localStorage.setItem('DOCTOR_LOGIN_STATUS', String(this.loginStatus))
  }
  @action
  logout () {
    this.loginStatus = 0
    localStorage.setItem('DOCTOR_LOGIN_STATUS', String(this.loginStatus))
  }
  @action
  setUser (user: object) {
    this.user = user;
    localStorage.setItem('DOCTOR_USER_INFO', JSON.stringify(this.user))
  }
  @action
  clearUser() {
    this.setUser({})
  }
}

export default new User()
