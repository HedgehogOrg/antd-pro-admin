/**
 * Author: Alvin
 * Modified By: Alvin
 * Created Date: 2022-04-14 17:04:03
 * Last Modified: 2022-04-20 09:25:23
 * Description:
 */
import request from '@/utils/request';
import {
  Department,
} from '@/types/stores/departments';
import ResourceFetch from '@/apis/fetch/ResourceFetch';

class DepartmentFetch extends ResourceFetch<Department> {
  constructor() {
    super('departments');
  }

  async treeList() {
    return request<Department[]>({
      url: '/treeList/departments',
      method: 'get',
    });
  }
}

export default new DepartmentFetch();
