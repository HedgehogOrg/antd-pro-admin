/**
 * File: ResourceFetch.ts
 * Project: sd-console-web
 * FilePath: /src/apis/ResourceFetch.ts
 * Created Date: 2022-05-07 18:34:31
 * Author: Zz
 * -----
 * Last Modified: 2022-05-07 19:34:29
 * Modified By: Zz
 * -----
 * Description:
 */
import {
  ListParams, ListRes, LooseObject, ResourceId,
} from '@/types/common';
import { ReqOptions } from '@/types/common/ReqOptions.d';
import request from '@/utils/request';
import BaseFetch from './BaseFetch';

type FallbackType<U, T> = U extends void ? T : U;

export default class ResourceFetch<T> extends BaseFetch<T> {
  protected readonly name: string;

  protected readonly apiPrefix: string;

  protected readonly baseUri: string;

  constructor(name: string, apiPrefix?: string) {
    super();
    this.name = name;
    this.apiPrefix = apiPrefix || '';
    this.baseUri = `${this.apiPrefix}/${name}`;
  }

  async create<U = void>(data: LooseObject, reqOptions?: ReqOptions): Promise<FallbackType<U, T>> {
    return request<FallbackType<U, T>>({
      url: this.baseUri,
      method: 'post',
      data,
      ...reqOptions,
    });
  }

  async update<U = void>(id:ResourceId, data: LooseObject, reqOptions?: ReqOptions): Promise<FallbackType<U, T>> {
    return request<FallbackType<U, T>>({
      url: `${this.baseUri}/${id}`,
      method: 'put',
      data,
      ...reqOptions,
    });
  }

  async retrieve<U = void>(id: ResourceId, options?: LooseObject, reqOptions?: ReqOptions): Promise<FallbackType<U, T>> {
    let newOptions = options;
    let newReqOptions = reqOptions;
    if (options && Reflect.ownKeys(options).length && !reqOptions) {
      const hardKeys = Reflect.ownKeys(new ReqOptions());
      const matchs = Reflect.ownKeys(options).filter((key) => hardKeys.includes(key));
      if (matchs.length) {
        newReqOptions = options as ReqOptions;
        newOptions = {};
      }
    }
    return request<FallbackType<U, T>>({
      url: `${this.baseUri}/${id}`,
      method: 'get',
      data: newOptions,
      ...newReqOptions,
    });
  }

  async destroy<U = void>(id: ResourceId, reqOptions?: ReqOptions): Promise<any> {
    return request<FallbackType<U, T>>({
      url: `${this.baseUri}/${id}`,
      method: 'delete',
      ...reqOptions,
    });
  }

  async list<U = void>(params: LooseObject, reqOptions?: ReqOptions): Promise<FallbackType<U, ListRes<T>>> {
    const localParams: ListParams = {
      page: 1,
      pageSize: 10,
      sort: '-createdAt',
      ...params,
    };
    return request<FallbackType<U, ListRes<T>>>({
      url: this.baseUri,
      method: 'get',
      data: localParams,
      ...reqOptions,
    });
  }
}
