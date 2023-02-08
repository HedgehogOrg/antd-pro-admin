interface Common {
  id: number,
  name: string,
}

export interface PlanType extends Common {
  index: number,
  programId: number,
  tasks: TaskType[],
  taskRecords: TasksRecordType[],
}

interface TaskType extends Common {
  index:number,
  planId:number,
  programId:number,
  resourceId:number,
  resourceType: 'media' | 'questionnaire' | 'sleep' | 'medication' | null | undefined | 'operate' | 'feedback',
  type:number,
  [propName:string] :any
}

interface TasksRecordType {
  id:number,
  taskId: number,
  resourceRecordId: number,
  startedAt: number,
  endedAt: number,
  status: number
}

export interface PlanRecordType {
  id:number,
  planId:number,
  status:number,
  startedAt:number,
  endedAt:number,
  tasks: TaskType[],
  taskRecords: TasksRecordType[],
  [propName:string]:any
}

export interface ProgramType extends Common {
  creatorId:number,
  closeDay:number,
  submitStatus:number,
  status:number,
  submitAt:number,
  createdAt:number,
  updatedAt:number,
  plans: PlanType[],
  libaryItems?: LibraryItem[],
  [propName:string]:any
}
export interface ProgramRecordType extends Common {
  closedAt:number,
  createdAt:number,
  closeDay: number,
  status: number,
  startedAt: number,
  endedAt: number,
  programId:number,
  program: ProgramType
  plans?: PlanType[],
  planRecords?: PlanRecordType[]
  informedConsentMember:{
    id:number;
    status:number;
  }
}
