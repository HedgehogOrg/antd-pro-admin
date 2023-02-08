import { PatientItemType } from './index';

export interface SportRecordType extends Pick(PatientItemType, 'createdAt', 'updatedAt') {
  id: number,
  organizationId: number,
  memberId: number,
  sportId: number,
  form: number,
  to:number,
  [propName: string]: any
}
