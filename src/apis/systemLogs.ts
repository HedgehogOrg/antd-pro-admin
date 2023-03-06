import request from '@/utils/request';
import { ListRes, RetrieveParams } from '@/types/common';
import { SystemLogType } from '@/types/system/logs';

export async function getSystemLogs(data?: RetrieveParams) {
  return request<ListRes<SystemLogType>>({
    url: '/logs',
    method: 'get',
    data,
  });
}
