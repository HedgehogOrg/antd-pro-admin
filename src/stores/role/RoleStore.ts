import { makeAutoObservable } from 'mobx';

class RoleStore {
  pageOptions = {
    current: 1,
    pageSize: 10,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setPageOptions(current: number, pageSize: number) {
    this.pageOptions.current = current;
    this.pageOptions.pageSize = pageSize;
  }
}

export default new RoleStore();
