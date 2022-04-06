import request from '@/utils/request';
import { APIVersion } from '@/enums';

export async function login(data: any) {
  return request({
    url: '/login-test',
    method: 'post',
    data,
    version: APIVersion.V1,
  });
}
