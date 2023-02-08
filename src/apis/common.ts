/**
 * 用以存放项目公共的 api
 */
import request from '@/utils/request';
import { LocalRegion, LooseObject, WebsocketTokenRes } from '@/types/common';
import {
  GetOrganizationRequestType,
  OrganizationItem,
} from '@/types/stores/role';
import { HandleType } from '@/types/stores/work';
import { AccountListItem } from '@/types/stores/account';

export async function treeRegions(params: LocalRegion) {
  return request<LocalRegion>({
    url: '/treeList/regions',
    method: 'get',
    data: { ...params },
  });
}

export async function getAllOrganizations(data: GetOrganizationRequestType) {
  return request<OrganizationItem[]>({
    url: '/listAll/organizations',
    method: 'get',
    data,
  });
}
export async function getAlllistAccountsByWechatDept(
  data: GetOrganizationRequestType,
) {
  return request<Array<HandleType>>({
    url: '/listByWechatDept/accounts',
    method: 'get',
    data,
  });
}
export async function getWebsocketTokens(data: GetOrganizationRequestType) {
  const result = await request<WebsocketTokenRes>({
    url: '/websocketTokens',
    method: 'post',
    data,
  });
  return result;
}
// 创建异步任务
export async function asyncTasks(data: LooseObject) {
  return request<Promise<any>>({
    url: '/asyncTasks',
    method: 'post',
    data,
  });
}
// 所有账号
export async function getAllAccounts(data: LooseObject) {
  return request<Promise<Array<AccountListItem>>>({
    url: '/listAll/accounts',
    method: 'get',
    data,
  });
}
