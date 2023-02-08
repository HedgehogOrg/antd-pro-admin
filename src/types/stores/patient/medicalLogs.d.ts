export interface ElectronicMedicalLogType {
  id:number,
  memberProfileId:number,
  electronicMedicalRecordId:number,
  description:string,
  handleType: number, // 类型(1:新增电子病历,2=检测表结果更新,3=检测失败,4=医生诊断,5=疗程中,6=已结束)
  handleData: CreateEMLType | UpdateStatusType | FailStatusType | DoctorDiagnoseType | ProgramProcessingType | FisnishedType,
  handleAt:number,
  organizationId:number,
  createdAt:number,
  updatedAt:number
}

// 新增电子病历类型
export type CreateEMLType = {
  phaseState: number, // 电子病历阶段状态: (0:待发送,1:待检测,2:检测失败,3:候诊中,4:疗程中,5:已结束)
  no:number
};

// 检测表结果操作更新
export type UpdateStatusType = {
  description:string
  remainingTaskNum: number // 剩余检测项
};

// 检测表失败操作更新
export type FailStatusType = {
  doneQuestionnaires: { id: number, name: string }[]
  remainingTaskNum: number // 剩余检测项
};

// 医生诊断操作信息
export type DoctorDiagnoseType = {
  diagnosis: string
  needToVisit: number // 是否需要复诊(0=不需要, 1=需要)
};

//  疗程中操作信息
export type ProgramProcessingType = {
  programme: string
};

//  已结束操作信息
export type FisnishedType = {
  programme: string,
  medicalResult:string,
  questionnaires:{ id:number, name:string }[]
};
