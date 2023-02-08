/**
 * Author: Alvin
 * Modified By: Alvin
 * Created Date: 2022-04-20 09:58:32
 * Last Modified: 2022-04-20 17:25:30
 * Description:
 */

import request from '@/utils/request';
import { OSSInfo } from '@/components/UploadInput/type.d';

export async function getOSSInfo(actionType: string) {
  return request<OSSInfo>({
    url: '/alioss/sts',
    method: 'post',
    data: { actionType },
  });
}
