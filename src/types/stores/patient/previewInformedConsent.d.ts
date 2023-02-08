export interface InformedConsentMemberType {
  id:number,
  signUrl:string,
  phone:string,
  doctorSignUrl:string,
  credentialsNumber:string,
  title:string,
  content:string,
  showPhone:boolean;
  showCredentialsNumber:boolean;
  showElectronicSign:boolean;
  showDocSign:boolean;
  [propName:string] :any
  // status:number
}
