/**
 * File: LimitedResourceFetch.ts
 * Project: sd-console-web
 * FilePath: /src/apis/fetch/LimitedResourceFetch.ts
 * Created Date: 2022-05-07 19:35:48
 * Author: Zz
 * -----
 * Last Modified: 2022-05-07 19:43:29
 * Modified By: Zz
 * -----
 * Description:
 */
import { LooseObject, ReqOptions } from '@/types/common';
import request from '@/utils/request';
import ResourceFetch from './ResourceFetch';

export default class LimitedResourceFetch<T> extends ResourceFetch<T> {
  async listAll(data?: LooseObject, reqOptions?: ReqOptions): Promise<T[]> {
    return request<T[]>({
      url: `/listAll${this.baseUri}`,
      method: 'get',
      data: { ...data },
      ...reqOptions,
    });
  }

  async treeList(data?: LooseObject, reqOptions?: ReqOptions): Promise<T[]> {
    return request<T[]>({
      url: `/treeList${this.baseUri}`,
      method: 'get',
      data,
      ...reqOptions,
    });
  }
}
