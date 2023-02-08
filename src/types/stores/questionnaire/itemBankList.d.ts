export interface ItemType {
  id:number,
  sourceId: number, // 来源组织id,0=云医后台
  categoryId:number,
  category:{ id:string, name:string },
  type: number, // 题型, 1=单选,2=多选,3=简答,4=日期,5=时钟,6=矩阵单选,7=数值,8=地区,9=时长
  title: string, // 题目标题
  rtfTitle: string, // 富文本标题
  defaultValue:string,
  data:any,
  status: number, // 状态, 0=未入库, 1=已入库
  source: { id: number, name: string, [propName:string]:any }, // 来源组织信息
  questionCategory: { id: number, name: string, [propName: string]: any }, // 题目分类信息
  createdAt:number,
  updatedAt:number
}
