/**
 * File: RetrieveParams.d.ts
 * Project: sd-console-web
 * FilePath: /src/types/common/RetrieveParams.d.ts
 * Created Date: 2022-05-07 19:11:49
 * Author: Zz
 * -----
 * Last Modified: 2022-05-07 19:13:07
 * Modified By: Zz
 * -----
 * Description:
 */

export class RetrieveParams {
  expand?: string;

  attributes?: string[];

  [key: string]: any;
}
