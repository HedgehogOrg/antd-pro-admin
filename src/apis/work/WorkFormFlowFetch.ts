import request from '@/utils/request';
import { ResourceFetch } from '../fetch';
import { WorkFormFlow } from '@/types/stores/work';
import { LooseObject } from '@/types/common';

class WorkFormFlowFetch extends ResourceFetch<WorkFormFlow> {
  constructor() {
    super('workFormFlows');
  }

  /**
 *切换状态
 * @param data 用户id 状态
 * @returns
 */
  editStatus(data:LooseObject) {
    return request({
      url: `/workFormFlows/${data.id}/status`,
      method: 'put',
      data,
    });
  }
  /**
   *获取全部工单流程
  * @param data
  * @returns
  *
  */

  getAllWorkFormFlows(params: LooseObject) {
    return request<Array<WorkFormFlow>>({
      url: '/listAll/workFormFlows',
      method: 'get',
      data: { ...params },
    });
  }

  /**
 *获取工单数量
 * @param data
 * @returns
 */
  getWorkFormsCount(params: LooseObject) {
    return request<any>({
      url: '/count/workForms',
      method: 'get',
      data: { ...params },
    });
  }
}

export default new WorkFormFlowFetch();
