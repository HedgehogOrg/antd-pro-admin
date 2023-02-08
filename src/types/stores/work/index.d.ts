export interface WorkFormFlow {
  id?: number;
  name: string;
  phases:Array<Phases>,
  creatorId?:number;
  creator?: OptionsType;
  status?: number;
  deletedAt?:string;
  createdAt?: number;
  updatedAt?:number;
  count?: number;
  workFormTotal?:number,
  updater?: OptionsType;
}

export type Phases = {
  id?:number,
  order:number,
  name:string,
  handlerIds:string,
  departmentIds:string,
  handlers?:Array<HandleType>,
  departments?:Array<HandleType>,
  accounts:Array<HandleType>,
  status?:number
};
export interface HandleType {
  departments: never[];
  id: number;
  name: string;
  // 上级部门id
  parentId: number;
  deptType:number;
  avatar?: string;
  children?: HandleType[];
  disabled?:boolean = false;
  disableCheckbox?:boolean = false;
  order?:number
}
export interface FormProps {
  editId?: number | undefined;
  item: ProcessItem;
  onValuesChange?: Function;
}
export interface PhasesPropsType {
  index: number;
  item: Phases;
  onShowModal?: Function;
}
export interface AttrType {
  label: string;
  value: any;
}
export interface TableInfoType {
  title?: string;
  attrs?: Array<AttrType>;
  children?: any;
}

export interface WorkOrder {
  id?: number;
  no?:number,
  name: string;
  description:string,
  workFormFlowId?:number;
  phases:Array<WorkFormPhases>;
  index?:number;
  status?:number;
  createdAt?:number;
  updatedAt?:number;
  images:Array<string> ;
  appendixes:Array<string> ;
  phase?:Partial<AccountListItem>;
  creator?:Creator,
  workFormFlow?:WorkOrderWorkFormFlow
  recoreds?:any,
  updater?: OptionsType;
}
export type HandOrder = {
  id?:number;
  handlerId?:number;
  description:string;
  images:Array<string> ;
  appendixes:Array<string>;
};
export type WorkOrderWorkFormFlow = {
  id:number,
  name:string,
  status:number,
  phases:Array<Phases>,
};
export type Creator = {
  id:number,
  name:string,
  departments:any;
};
export type WorkFormPhases = {
  id?:number;
  name?:string;
  workFormId?:number,
  workFormFlowPhaseId:number;
  order:number;
  status:number;
  handlerId:number;
  description:string;
  images:Array<string> ;
  appendixes:Array<string> ;
  handler?:Partial<AccountListItem>;
  departments?:Partial<AccountListItem>;
  createdAt?:number
};
export interface OptionsType {
  name: string;
  id: number;
}

interface OssImgType {
  url?: string;
  uid: number | string;
  name: string;
  status: string;
}
