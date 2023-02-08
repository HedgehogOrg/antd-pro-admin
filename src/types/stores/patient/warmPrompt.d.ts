export interface WarmPromptType {
  id:number,
  organizationId:number,
  title:string,
  content:string,
  status: 0 | 1, // 状态:(0:未读,1:已读)
  templateId:number,
  memberId:number,
  delayAt:number,
  creatorId:number,
  creator?: any, // 【扩展资源】创建者信息
  organization?: any // 【扩展资源】组织信息
  createdAt:number,
  updatedAt:number
}

export interface WarmPromptTemplateType {
  id: number,
  organizationId: number,
  title: string,
  content: string,
  creatorId:number,
  status: 0 | 1, // 状态:(0:停用,1:启用)
  creator?: any, // 【扩展资源】创建者信息
  organization?: any // 【扩展资源】组织信息
  createdAt: number,
  updatedAt: number,
  [key:string]:any
}
