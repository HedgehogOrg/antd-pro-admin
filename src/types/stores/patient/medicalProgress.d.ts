import { PatientItemType } from './index';

export interface MedicalProgressType extends Pick(PatientItemType, 'createdAt', 'updatedAt') {
  id: number,
  organizationId: number,
  memberId: number,
  creatorType: number,
  diagnosisTime: number,
  symptoms: string,
  detail:string,
  creatorId:number,
  pictureUrls:string,
  [propName: string]: any
}
