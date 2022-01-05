/// <reference path="./user.d.ts" />

import { observable, computed, action , makeObservable} from 'mobx'

class UserInfo {
  constructor() {
    makeObservable(this)
  }
  @observable login = false
  @action
  changeIsLogin () {
    this.login = !this.login
  }
}

export default new UserInfo()
