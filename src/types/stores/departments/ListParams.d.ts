/**
 * Author: Alvin
 * Modified By: Alvin
 * Created Date: 2022-04-14 15:00:22
 * Last Modified: 2022-04-15 15:59:05
 * Description:
 */
import { Pages } from '@/types/common';

export class ListParams extends Pages {
  name?: string;

  sort?: string;

  search?: string;

  expand?: string;

  attributes?: string[];

  [propName:string]:any
}

export type DepartmentParams = {
  id?: number;
  name: string;
  parentId: number
};
