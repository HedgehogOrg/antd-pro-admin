import {
  ImportAccountType,
  AccountListItem,
} from '@/types/stores/account/index';
import { LimitedResourceFetch } from './fetch';
import request from '@/utils/request';

//  账号列表
class AccountFetch extends LimitedResourceFetch<AccountListItem> {
  constructor() {
    super('accounts');
  }

  //  切换状态
  async editStatus(data:{ id: number, status: number }) {
    return request({
      url: '/accounts/{id}/status',
      method: 'put',
      data,
    });
  }

  // 重置密码
  async resetPassword(data:{ id: number, password: string }) {
    return request({
      url: '/accounts/{id}/resetPassword',
      method: 'put',
      data,
    });
  }

  //  批量导入
  async importAccount(fileUrl:string) {
    return request<ImportAccountType>({
      url: '/importExcel/accounts',
      method: 'post',
      data: { fileUrl },
    });
  }

  async accountQrcode(data:{ id:number }) {
    return request<{ url:string }>({
      url: '/accounts/{id}/qrcodes',
      method: 'get',
      data,
    });
  }
}
export default new AccountFetch();
