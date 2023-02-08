export type Logic = {
  operator: string, // 逻辑类型,and=且, or=或, 默认为or
  conditions:Array<Partial<LogicConditions>>,
  action: Partial<LogicAction>,
};
// action 结果跳转
export type LogicAction = {
  // type类型: finish=跳转结束, jump=跳转题目
  type:'finish' | 'jump' | '',
  toQno:string, // 跳转题目编号, type=jump才有这个属性
  toQkey:number,
};
// condition逻辑条件
export interface LogicConditions {
  qkey: number,
  qindex:number,
  qno:string | undefined, // 题目编号
  // 条件下拉框,  type类型: choice=选中，unChoice=未选中, answered=已答, unAnswered=未答
  type:'choice' | 'unChoice' | 'answered' | 'unAnswered' | '' | undefined,
  value:Array<string> | string, // 题目值, type=choice或unChoice才有value
  [key?:string]:any
}
