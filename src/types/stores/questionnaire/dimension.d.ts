/**
 * File: dimension.d.ts
 * Project: sd-console-web
 * FilePath: /src/types/stores/questionnaire/dimension.d.ts
 * Created Date: 2022-07-13 15:57:01
 * Author: diya
 * -----
 * Modified By: diya
 * -----
 * Description:
 */
import { QuestionTypes } from '@/enums/questionnaire';

// 新建配置类型
interface ConfigType {
  standardRange: { // 参考范围
    minScore: number | any;
    maxScore: number | any;
  };
  tableCfg: {
    showTotal: number; // 是否显示总分图标 0 1
    showDimension: number;// 是否显示各维度图表 0 1
  };
  graphCfg: {
    totalGraphType: number; // 总分图标类型
    dimensionGraphCfg: DimensionGraphCfg[];// 各维度图标类型
  }
}
// 新增维度信息类型
export interface ScaleCardType {
  id?: number;
  dimensionId: number;
  name: string;
  config:DimensionNameConfigType,
  wno: string;
  minScore: number;
  maxScore: number;
  factor: {
    type: string;
    expression: string;
  };
  index: number;
  qkeys: number[];
  qnos: string[];
  qnosCascader:string[];
  comments:CommentsType[]
}
export interface DimensionNameConfigType {
  genderDiff:number,
  genders:{
    gender:number,
    title:string
  }[]
}
// 题目绑定类型
export interface QuestionBindingType {
  type: QuestionTypes, // 题目类型
  index: number, // 序号
  key: number,
  qnoId: number,
  qno: string, // 题目编号
  partition: string, // 分区
  title:string,
}
// 转换为二维数组类型
export interface QuestionBindingTransform {
  id?: number,
  key: number,
  type: QuestionTypes, // 题目类型
  index: number, // 序号
  qno: string, // 题目编号
  partition: string, // 分区
  label?: string,
  questions?: QuestionBindingTransform[]
}
// 新增量表结果类型
export interface CommentsType {
  key:number;
  index:number;
  result:string;
  comment:string;
  suggest?:string;
  matcher:{
    type:string;
    min:number;
    max:number;
    minOperator:string;
    maxOperator:string;
    gender:number;
  };
  alarmLevel:number
}

// 维度条件类型
export interface ScaleConditionsType {
  key:number;
  name:string;
  index:number;
  matcher:{
    type:string;
    expression:string;
  };
  comment:string;
  suggest?:string;
}

// 检查维度自定公式返回值
export interface CheckExpResponse {
  results:ResultsType[]
}
interface ResultsType {
  index:string;
  isOk:boolean;
  minScore: number;
  maxScore: number;
}

export interface DimensionGraphCfg {
  cfgId?:number;
  type:number;
  wnos:dtring[]
}
