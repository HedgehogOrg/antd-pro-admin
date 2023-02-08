/**
 * File: index.d.ts
 * Project: sd-console-web
 * FilePath: /src/types/stores/questionnaire/index.d.ts
 * Created Date: 2022-06-09 15:47:45
 * Author: diya
 * -----
 * Last Modified: Fri Jul 22 2022
 * Modified By: diya
 * -----
 * Description:
 */

export interface QuestionnaireListItem {
  id:number;
  serialNumber:string;// 量表编号
  sourceId:number;
  categoryId:number; // 量表分类id
  title:string;
  description:string;
  endRemark:string;
  type:number;// 问卷类型
  isSingle:number;// 单一问卷：1，合并问卷：0
  scoreType:number;// 不计分：0，计分：1，维度计分：2
  status:number;// 编辑中：0，收集中：1
  evaluationType:number;
  reviewType:number;
  releaseChannel:number;
  code:string;
  price:number;
  guide: string;
  showIntro:number;
  coverUrl:string;
  scoreType:number;
  creatorId:number;
  creatorType:string;
  source:IdNameType;
  creator:IdNameType;
  category:IdNameType;
  organizations:IdNameType[];
  questionnaireSets:QuestionSetsType[];
  createdAt:number;
  updatedAt:string;
  submitCount:number;
  userCount:number;
  tagIds?:number[],
  tags?:TagsItem[],
  dataComparisonType?:number
}

interface IdNameType {
  id:number;
  name:string;
}
export interface QuestionSetsType {
  id:number;
  title:string;
  questionnaireId:number;
  scoreType:number;
  code:string;
  serialNumber:string;//
  scoreType:number;//
  referenceState:number;// 引用状态
  [propName:string]:any

}
export interface QuestionnaireListRequestType {
  name?: string;
  sourceId?: number;
  pageSize: number;
  page: number;
  total?:number;
  sort?:string;
  expand?: string,
  attributes?: Array,
}

export interface PivotControlsData {
  questionnaireSetId:number,
  index:number,
  pivotControls:Array<PivotControls>
}

export interface PivotControls {
  condition:Condition,
  action:Action
}

export interface Condition {
  type: string, // 条件类型， comment=维度结果, dimension=维度
  commentId: number, // 维度结果id
}
export interface Action {
  type: string,
  toId?: number,
}
