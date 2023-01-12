/**
 * Author: Alvin
 * Modified By: Zz
 * Created Date: 2022-04-12 09:58:45
 * Last Modified: 2022-05-07 19:13:25
 * Description:
 */

export { Pages } from './Pages';
export { Paginations } from './Paginations';

export { DateTime } from './DateTime';
export * from './LooseObject';
export * from './ListRes';
export * from './ListParams';
export * from './RetrieveParams';
export * from './ReqOptions.d';

export type ResourceId = number | string;

// 服务器行政区类型
export interface LocalRegion {
  page?:number,
  pageSize?:number,
  level?:string,
  provinceCode?:string,
  cityCode?:string,
  areaCode?:number,
  streetCode?:string,
  children?: Array<LocalRegion>
}

export type WebsocketToken = {
  type: string,
  token: string,
  visitorId: string,
};

export type WebsocketTokenRes = {
  code:number,
  msg:string,
  data:WebsocketToken
};
