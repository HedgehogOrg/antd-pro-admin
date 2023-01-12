/**
 * File: ReqOptions.ts
 * Project: sd-console-web
 * FilePath: /src/types/common/ReqOptions.ts
 * Created Date: 2022-05-07 19:00:40
 * Author: Zz
 * -----
 * Last Modified: 2022-05-07 19:00:55
 * Modified By: Zz
 * -----
 * Description:
 */

export type RequestOptions = {
  url: string;
  method?: string;
  data?: { [key: string]: any };
  version?: string;
} & ReqOptions;

export class ReqOptions {
  showErrorMessage?: boolean;
}

// export type ReqOptionsKeys = keyof ReqOptions;
