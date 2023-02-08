/**
 * File: scoreResult.d.ts
 * Project: sd-console-web
 * FilePath: /src/types/stores/questionnaire/scoreResult.d.ts
 * Created Date: 2022-07-15 11:39:47
 * Author: diya
 * -----
 * Modified By: diya
 * -----
 * Description:
 */
import CommentsType from '@/types/stores/questionnaire/dimension';
// 新增维度信息类型
export interface ScoreResultType {
  name: string;
  wno: string;
  factor: {
    type: string;
    scorePercent:number;// 分值系数
  };
  index: number;
  comments:CommentsType[]
}
