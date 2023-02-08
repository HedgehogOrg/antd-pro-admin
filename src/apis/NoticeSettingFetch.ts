import { LimitedResourceFetch } from './fetch';
import request from '@/utils/request';
import { NoticeSettingType } from '@/components/Notice/type';

export interface DetailRequestType {
  organizationId: number;
  creatorId: number;
  [param: string]: any;
}

class NoticeSettingFetch extends LimitedResourceFetch<any> {
  constructor() {
    super('noticeSettings');
  }

  async getSettingDetail(data: DetailRequestType) {
    return request<NoticeSettingType>({
      url: '/findByCreator/noticeSettings',
      method: 'GET',
      data,
    });
  }
}

export default new NoticeSettingFetch();
