import { PatientItemType } from './index';

export interface MedicationRecordType extends Pick(PatientItemType, 'createdAt', 'updatedAt') {
  id:number,
  organizationId:number,
  memberId:number,
  medicationId:number,
  tookAt:number,
  amount:number,
  [propName:string] :any
}
