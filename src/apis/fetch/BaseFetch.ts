/**
 * File: BaseFetch.ts
 * Project: sd-console-web
 * FilePath: /src/apis/fetch/BaseFetch.ts
 * Created Date: 2022-05-07 18:35:02
 * Author: Zz
 * -----
 * Last Modified: 2022-05-07 19:28:43
 * Modified By: Zz
 * -----
 * Description:
 */
import {
  ResourceId, ListRes, ListParams, RetrieveParams, LooseObject, ReqOptions,
} from '@/types/common';

export default abstract class BaseFetch<T> {
  abstract create(data: LooseObject, reqOptions?: ReqOptions): Promise<T>;
  abstract retrieve(id: ResourceId, options?: RetrieveParams, reqOptions?: ReqOptions): Promise<T>;
  abstract update(id: ResourceId, data: LooseObject, reqOptions?: ReqOptions): Promise<T>;
  abstract destroy(id: ResourceId, reqOptions?: ReqOptions): Promise<any>;
  abstract list(params: ListParams, reqOptions?: ReqOptions): Promise<ListRes<T>>;
}
