/**
 * Author: Alvin
 * Modified By: Alvin
 * Created Date: 2022-04-14 11:14:44
 * Last Modified: 2022-04-18 14:45:38
 * Description:
 */
import { DateTime } from '@/types/common';

export class Department extends DateTime {
  [k: string]: any;

  key?: string;

  id: number;

  name: string;

  parentId: number;

  status: number;

  userCount: number;

  childUserCount: number;

  children?: Department[];
}
