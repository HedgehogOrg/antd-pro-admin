import { LimitedResourceFetch } from './fetch';
import request from '@/utils/request';
import { NoticeItemType, UnreadCountType } from '@/components/Notice/type.d';
import { NoticeTypesEnum } from '@/components/Notice/enum';

class NoticeFetch extends LimitedResourceFetch<NoticeItemType> {
  constructor() {
    super('notices');
  }

  async unreadCount(data: UnreadCountType): Promise<{ kind: NoticeTypesEnum, count: number }[]> {
    return request({
      url: '/unreadCount/notices',
      method: 'GET',
      data,
    });
  }

  async readNotice(data: { id: number, status: number }): Promise<{ status: number }> {
    return request({
      url: '/notices/{id}/status',
      method: 'PUT',
      data,
    });
  }

  async readAll(data: { kind: NoticeTypesEnum }) {
    return request({
      url: '/readAll/notices',
      method: 'POST',
      data,
    });
  }
}

export default new NoticeFetch();
