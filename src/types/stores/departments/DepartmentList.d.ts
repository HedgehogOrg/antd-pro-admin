/**
 * Author: Alvin
 * Modified By: Alvin
 * Created Date: 2022-04-14 15:04:36
 * Last Modified: 2022-04-15 17:07:56
 * Description:
 */

import { Paginations } from '@/types/common';
import { Department } from './Departments';

export type DepartmentList = {
  [P in keyof Department]: T[P];
  items: Department[];
  [propName:string] :any
} & Paginations;
