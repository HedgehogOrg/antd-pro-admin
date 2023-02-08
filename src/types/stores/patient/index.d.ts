import React from 'react';
import { RetrieveParams, Paginations } from '@/types/common';

// 通用 columns 类型
export interface GeneralColumnsType {
  title:React.ReactNode
  dataIndex?: string | string[],
  key:string,
  hideInSearch?:boolean,
  renderFormItem?: (item?: ProColumns<T>, config?: {
    value?: any;
    onSelect?: (value: any) => void;
    type: ProTableTypes;
    defaultRender: (newItem: ProColumns<any>) => JSX.Element | null;
  }, form?: FormInstance) => JSX.Element | false | null,
  formItemProps?: (form: FormInstance<any>) => {
    rules: {
      validator: (_: any, value: string) => Promise<void>;
    }[];
  },
  [propName:string]:any
}

// 单个患者信息类型
export interface PatientItemType {
  id?: number,
  name?: string,
  avatar?: string,
  wechatAvatar?: string,
  openId?: string,
  unionId?: string,
  nickname?: string,
  mobile?: string,
  account?: string,
  password?: string,
  credentialsType?: number,
  credentialsNumber?: number,
  gender?: number,
  birthday?: string,
  age?: number,
  province?: string,
  city?: string,
  area?: string,
  hight?: number,
  weight?: number,
  educationDegree?: number,
  marriage?: number,
  status?: number,
  career?: string,
  createdAt?: number,
  updatedAt?: number,
  memberProfiles?: MemberProfileType[],
  memberDoctor?:MemberDoctorType,
  memberDoctors?: MemberDoctorType[]
  [propName?:string]:any
}

// 患者list 返回类型
export type ResItemType = RetrieveParams & Paginations;

// 患者病史类型
export interface MedicalHistoryType extends Pick(PatientItemType, 'id', 'createdAt', 'updatedAt') {
  memberId:number,
  allergy: {
    value: string
  },
  surgery: {
    value: string
  },
  inheritance: {
    value: string
  },
  smoking:{
    num: string
    type: string
    value: string
    year: string
  },
  drinking:{
    num: string
    type: string
    value: string
    year: string

  },
  disease: {
    gxb: string
    gxy: string
    gy: string
    jh: string
    tnb: string
    value: string
  },
  [propName:string] : any
}

// 设备绑定类型
export interface DeviceBindingType {
  phoneModel:string,
  system:string,
  model:string,
  appVersion:string,
  sleeperSn:string,
  monitorSn:string,
  sleeperFw:string,
  sleeperFw:string,
  vrSn:string,
  vrFw:string,
  [propName: string]: any
}

// 患者档案信息
export interface MemberProfileType {
  id:number,
  no:number,
  organizationId:number,
  creatorId:number,
  name:string,
  mobile:number,
  credentialsType:number,
  credentialsNumber:number,
  gender:number,
  birthday:number,
  createdAt:number,
  updatedAt:number
}

// 绑定医生信息
export interface MemberDoctorType {
  id:number,
  memberId:number,
  organizationId:number,
  doctorId:number,
  bindStatus: 1 | 0, // 1:绑定，0:解绑
  doctor: { id: number, name: string, account :any },
  createdAt:number,
  updatedAt:number
}
