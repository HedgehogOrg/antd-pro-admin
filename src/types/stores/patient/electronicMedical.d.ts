import { PatientItemType } from './index';

export interface EMLItemType extends Pick<PatientItemType, 'createdAt' | 'id' | 'updatedAt'> {
  type: number, // 类型: (1=普通电子病历, 2=电子病历模板)
  organizationId:number,
  memberProfileId:number,
  creatorId:number,
  name:string,
  useState: number, // 启用状态(0:停用, 1=启用)
  status: number, // 状态:(0=无,1:待检测,2:检测失败,3:候诊中,4:疗程中,5:已结束)
  pageSet: PageSet,
  closeDay:number,
  creator: Creator,
  memberProfile: MemberProfile,
  tables: Tables[],
  [propName:string] :any
}

type PageSet = {
  showLogo:boolean,
  logoPosition:number,
  showDoctorSignature:boolean
};

type Creator = {
  id:number,
  name:string
};

interface MemberProfile extends Pick<PatientItemType, 'createdAt' | 'id' | 'updatedAt'> {
  no:number,
  organizationId:number,
  creatorId:number,
  name:string,
  mobile:number,
  credentialsType: number, // 证件类型,1:身份证,2:护照,3:外国人永久居留(身份)证,4:港澳往返内地通行证,5:台湾往返内地通行证
  credentialsNumber:number,
  gender: number, // 性别 1=男, 2=女
  birthday:number
}

export type Tables = {
  id:number,
  electronicMedicalRecordId:number,
  name:string,
  type: number, // 表格类型:(1:患者信息,2:检测量表,3:自定义表格,4:结果预设,5:医生诊断)
  index:number,
  expirationDays:number,
  extendData:any,
  tasks:Tasks[],
  createdAt:number,
  updatedAt:number
};

export interface Tasks extends Pick < PatientItemType, 'createdAt' | 'id' | 'updatedAt' > {
  electronicMedicalRecordId:number,
  electronicMedicalRecordTableId:number,
  type:number,
  name:string,
  index:number,
  status:number,
  submitAt:number,
  extendData: ExtendDataType
}

type ExtendDataType = {
  memberInfo: MemberInfo[],
  questionnaireInfo: QuestionnaireInfo,
  customInfo: CustomInfo[]
};

type QuestionnaireInfo = {
  id: number,
  title: string,
  submissionId: number,
  submission: any
};

export type MemberInfo = {
  type: number,
  name: string,
  value: any,
  extend: any
};

type CustomInfo = {
  name: string,
  value: any,
  index: number
};
