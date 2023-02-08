/**
 * File: noScoreResult.d.ts
 * Project: sd-console-web
 * FilePath: /src/types/stores/questionnaire/scoreResult.d.ts
 * Created Date: 2022-07-15 11:39:47
 * Author: diya
 * -----
 * Modified By: diya
 * -----
 * Description:
 */
// 新增维度信息类型
export interface NoScoreResultType {
  name: string;
  wno: string;
  index: number, // 序号
  comments:NoScoreCommentsType[]

}
export interface NoScoreCommentsType {
  key:number;
  index:number;
  result:string;
  comment:string;
  suggest?:string;
  matcher:{
    type:string;
    operator:string;
    choices:ChoicesType[];
  };
  gender?:number;
  alarmLevel:number
}

export interface ChoicesType {// 关联题目类型
  operator:string;
  values:string[] | string;
  qno:string;
  qkey?:number;
}
