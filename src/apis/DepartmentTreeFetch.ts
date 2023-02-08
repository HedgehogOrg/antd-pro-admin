/**
 * File: departmentTree.ts
 * Project: sd-console-web
 * FilePath: /src/apis/departmentTree.ts
 * Created Date: 2022-05-13 16:54:18
 * Author: diya
 * -----
 * Last Modified: 2022-05-31 18:03:37
 * Modified By: diya
 * -----
 * Description:
 */
import { LimitedResourceFetch } from './fetch';
import { DepartmentsResponseType } from '@/types/stores/account';

// 部门树形列表
class DepartmentTreeFetch extends LimitedResourceFetch<DepartmentsResponseType> {
  constructor() {
    super('departments');
  }
}
export default new DepartmentTreeFetch();
