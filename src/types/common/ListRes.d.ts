/**
 * File: ListRes.d.ts
 * Project: sd-console-web
 * FilePath: /src/types/common/ListRes.d.ts
 * Created Date: 2022-05-07 19:00:00
 * Author: Zz
 * -----
 * Last Modified: 2022-05-07 19:02:16
 * Modified By: Zz
 * -----
 * Description:
 */
import { Pages } from './Pages';

export class ListRes<T> extends Pages {
  items: T[];

  offset: number;

  limit: number;

  total: number;
}
