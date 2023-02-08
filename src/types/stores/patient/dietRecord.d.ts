import { PatientItemType } from './index';

export interface DietRecordType extends Pick(PatientItemType, 'createdAt', 'updatedAt') {
  id: number,
  organizationId: number,
  memberId: number,
  dietId: number,
  time: number,
  [propName: string]: any
}
