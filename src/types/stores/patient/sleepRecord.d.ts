import { PatientItemType } from './index';

export interface SleepRecordType extends Pick(PatientItemType, 'createdAt', 'updatedAt') {
  id:number,
  organizationId:number,
  memberId:number,
  doctorId:number,
  date:number,
  goToBedAt:number,
  sleepAt:number,
  wakeUpAt:number,
  getUpAt:number,
  getUpAt:number,
  wakeTimes:number,
  wakeDuration:number,
  napTimes:number,
  napTotalDuration:number,
  wakeUpMood:number,
  sourceType:number,
  paWorkDuration:number,
  [propName?: string]: any
}

export interface GroupAvaType {
  current:{
    avgSleepDuration?: string, // 平均睡眠时长
    avgWakeDuration?: string, // 平均夜醒时长
    avgSleepEfficiency?: string, // 平均睡眠效率
    avgGoToSleepDuration?: string, // 平均入睡时长
    avgDeepDuration?:string, // 平均深睡时长
    avgLightDuration?:string, // 平均浅睡时长
    avgSleepScore?:string // 平均分数
    memberId:number
  },
  last: {
    avgSleepDuration?: string, // 平均睡眠时长
    avgWakeDuration?: string, // 平均夜醒时长
    avgSleepEfficiency?: string, // 平均睡眠效率
    avgGoToSleepDuration?: string, // 平均入睡时长
    avgDeepDuration?: string, // 平均深睡时长
    avgLightDuration?: string, // 平均浅睡时长
    avgSleepScore?: string // 平均分数
    memberId: number
  }
}

export interface GroupWeekAvaType {
  avgSleepDuration:string, // 平均睡眠时长
  avgWakeDuration: string, // 平均夜醒时长
  avgWakeTimes: string, // 平均夜醒次数
  avgSleepEfficiency: string, // 平均睡眠效率
  avgGoToSleepDuration: string, // 平均入睡时长
  avgGetUpAtDuration: string, // 平均赖床时长
  avgInBedDuration: string, // 平均卧床时长
  avgNapTimes: string, // 平均小睡次数
  avgNapTotalDuration: string, // 平均小睡时长
  avgDeepDuration?: string, // 平均深睡时长
  avgLightDuration?: string, // 平均浅睡时长
  avgSleepScore?: string // 平均分数
  dateRange: string // 时间范围
}
