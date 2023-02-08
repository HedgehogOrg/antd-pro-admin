export interface SleepPrescriptionType {
  id:number,
  organizationId:number,
  memberId:number,
  creatorId:number,
  createType:number,
  programRecordId:number,
  goToBedAt:number,
  getUpAt:number,
  startedAt:number,
  closedAt:number,
  createdAt:number,
  updatedAt:number,
  [propName:string]:any
}
