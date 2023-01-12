import request from '@/utils/request';
import { PermissionTree } from '@/types/system';
import { LimitedResourceFetch } from './fetch';
import { ReqOptions } from '@/types/common';

class PermissionFetch extends LimitedResourceFetch<PermissionTree> {
  constructor() {
    super('acls');
  }

  async aclsAccountTreeList(data?: { type?: number, expand?: string }, reqOptions?: ReqOptions) {
    return request<PermissionTree[]>({
      url: `/account${this.baseUri}`,
      method: 'get',
      data,
      ...reqOptions,
    });
  }
}

export default new PermissionFetch();
