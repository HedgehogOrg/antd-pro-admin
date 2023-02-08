import { PatientItemType } from './index';

export interface MediaRecordType extends Pick(PatientItemType, 'createdAt', 'updatedAt') {
  id: number,
  organizationId: number,
  memberId: number,
  mediaId: number,
  tookAt: number,
  amount: number,
  mediaId:number,
  finishedAt:number,
  watchLength:number,
  [propName: string]: any
}
