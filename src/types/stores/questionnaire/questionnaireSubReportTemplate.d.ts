export interface QuestionSubReportTempType {
  id:number,
  sourceId?:number,
  name:string,
  showOrgLogo:number,
  orgLogoPosition:string,
  showOrgName:number,
  showMemberInfo:number,
  memberInfoSetting: MemberInfoSettingType,
  showResult:number,
  showGraph:number,
  showQuestion:number,
  status?:number,
  source?:{ id:number, name:string },
  createdAt?:number,
  updatedAt?:number,
  [propName:string]:any
}

export interface MemberInfoSettingType {
  name: number,
  gender: number,
  age: number,
  mobile: number,
  height: number,
  weight: number,
  smoke: number,
  drink: number,
  submitTime: number,
  educationDegree: number,
  birthday: number,
  marriage: number,
  credentialsNumber: number,
  accountNo: number,
  [propName:string]:any
}

export interface MemberEvaluationVisitInfo {
  departmentDetail:{
    department:Department,
    nurseUnitDepartment:Department
  }
  memberTreatment:MemberTreatment,
  evalDoctor:{
    id:number,
    name:string,
    signUrl:string
  }
  [propName:string]:any
}

export interface MemberTreatment {
  bedNo:string,
  registrationNo:string,
  [propName:string]:any
}
