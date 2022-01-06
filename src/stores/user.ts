/// <reference path="./user.d.ts" />

import { observable, computed, action , makeObservable} from 'mobx'

const login = JSON.parse(localStorage.getItem('DOCTOR_LOGIN_STATUS') || 'false')
const user = JSON.parse(localStorage.getItem('DOCTOR_USER_INFO') || '{}')

class UserInfo {
  constructor() {
    makeObservable(this)
  }
  @observable login = login
  @observable user = user
  @action
  setLogin (login: boolean) {
    this.login = login
    localStorage.setItem('DOCTOR_LOGIN_STATUS', String(this.login))
  }
  @action
  setUserInfo (user: object) {
    this.user = user;
    localStorage.setItem('DOCTOR_USER_INFO', JSON.stringify(this.user))
  }
}

export default new UserInfo()
