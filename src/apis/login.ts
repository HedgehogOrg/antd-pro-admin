import request from '@/utils/request';

export async function login(data: any) {
  return request({
    url: '/login-test',
    method: 'post',
    data,
  });
}
