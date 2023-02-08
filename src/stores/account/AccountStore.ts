import { makeAutoObservable } from 'mobx';
import {
  AccountListRequestType,
  CreateAccountRequestType,
  EditAccountRequestType,
} from '@/types/stores/account/index';
import AccountFetch from '@/apis/AccountFetch';

class AccountStore {
  constructor() {
    // 响应式处理
    makeAutoObservable(this);
  }

  pageOptions = {
    current: 1,
    pageSize: 10,
  };

  setPageOptions(current: number, pageSize: number) {
    this.pageOptions.current = current;
    this.pageOptions.pageSize = pageSize;
  }

  list(params:AccountListRequestType) {
    return AccountFetch.list(params)
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(err));
  }

  status(params: { id: number, status :number }) {
    return AccountFetch.editStatus(params)
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(err));
  }

  resetPassword(params: { id: number, password :string }) {
    return AccountFetch.resetPassword(params)
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(err));
  }

  // 新建账号数据
  create(params:CreateAccountRequestType) {
    return AccountFetch.create(params)
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(err));
  }

  // 编辑账号数据
  edit(id:number, data:EditAccountRequestType) {
    return AccountFetch.update(id, data)
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  // 账号详情数据
  accountsDetail(params: { id: number, expand:string }) {
    const { id, expand } = params;
    return AccountFetch.retrieve(id, { expand })
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(err));
  }

  // 删除账号数据
  delete(params: { id: number }) {
    return AccountFetch.destroy(params.id)
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  // 导入账号数据
  import(params:string) {
    return AccountFetch.importAccount(params)
      .then((data) => Promise.resolve(data))
      .catch((err) => Promise.reject(err));
  }
}

export default new AccountStore();
