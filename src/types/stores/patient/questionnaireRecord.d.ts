import { PatientItemType } from './index';
import { QuestionnaireType } from '@/types/stores/questionnaire/questionnaireDetail';
import { MemberInfoSettingType } from '@/types/stores/questionnaire/questionnaireSubReportTemplate';

export interface QuestionnaireRecordType extends Pick(PatientItemType, 'createdAt', 'updatedAt') {
  id: number,
  memberId: number,
  organizationId:number,
  questionnaireId:number,
  settingId:number,
  startedAt:number,
  questionnaire: QuestionnaireType,
  member:{
    id:number,
    name:string,
    mobile:number,
    [propName:string]:any
  } | MemberInfoSettingType,
  organization:{
    id:number,
    name:string
  },
  [propName?: string]: any
}
export interface QuestionnaireResTyp {
  items: QuestionnaireRecordType[],
  page:number,
  pageSize:number,
  total:number,
  [propName?: string]: any
}
