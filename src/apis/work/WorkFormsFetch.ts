import { ResourceFetch } from '../fetch';
import { LooseObject } from '@/types/common';
import request from '@/utils/request';
import { WorkOrder } from '@/types/stores/work';

class WorkFormsFetch extends ResourceFetch<WorkOrder> {
  constructor() {
    super('workForms');
  }

  generateCode(params: LooseObject) {
    return request<any>({
      url: '/generateCode/workForms',
      method: 'get',
      data: { ...params },
    });
  }
}

export default new WorkFormsFetch();
