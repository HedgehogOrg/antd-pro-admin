import { Moment } from 'moment';
import { NoticeTypesEnum, BizTypesEnum } from './enum';

export interface NoticeItemType {
  id: number;
  organizationId: number;
  accountId: number;
  kind: NoticeTypesEnum;
  title: string;
  description: string;
  extra: string;
  bizType: BizTypesEnum;
  bizId: number;
  memberId: number;
  type: number;
  eventStatus: number;
  status: number;
  isRedirect: number; // 0=不跳转，1=跳转
  createdAt: number;
  updatedAt: number;
}

export interface UnreadCountType {
  organizationId: number;
  accountId: number;
}

export interface NoticeSettingType {
  id?: number;
  organizationId: number;
  creatorId: number;
  programSetting: ProgramSettingType;
  sleepSetting: SleepSettingType;
}

export interface AllSettingsType {
  programSetting: ProgramSettingType;
  sleepSetting: SleepSettingType;
}

export interface ProgramSettingType {
  pushTime: number | Moment;
  completeProgress: {
    status: number;
    continuousDays: number;
    lessPercent: number;
  },
  closeRemind: {
    status: number;
    closeDays: number;
  }
}

export interface SleepSettingType {
  pushTime: number | Moment;
  badSleepPrescription: {
    status: number;
    continuousDays: number;
    differMinutes: number;
  }
}
