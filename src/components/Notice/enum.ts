enum NoticeTypesEnum {
  NOTICE = 1, // 通知
  SYSTEM_NOTICE = 2, // 系统消息
  TODO = 3, // 待办事项
  WARNING = 4, // 预警
  PATIENT_MESSAGE = 5, // 患者留言
}

enum NoticeStatusEnum {
  ALL = -1,
  UNREAD = 0,
  READ = 1,
}

enum BizTypesEnum {
  // 业务类型: 1=温馨提示, 2=方案, 3=睡眠处方, 4=电子病历, 5=留言咨询
  WARM_TIPS = 1,
  PROGRAM = 2,
  SLEEP_PRESCRIPTION = 3,
  ELECTRONIC_MEDICAL_RECORD = 4,
  MESSAGE_CONSULTAITON = 5,
}

const NOTICE_REDIRECT_URLS_MAP = {
  [BizTypesEnum.WARM_TIPS]: '/patient-list/patient-detail/',
  [BizTypesEnum.PROGRAM]: '/patient-list/patient-detail/',
  [BizTypesEnum.SLEEP_PRESCRIPTION]: '/patient-list/patient-detail/',
  [BizTypesEnum.ELECTRONIC_MEDICAL_RECORD]: '/emr-list/edit-emr/',
  [BizTypesEnum.MESSAGE_CONSULTAITON]: '/message-consultation',
};

export {
  NoticeTypesEnum,
  NoticeStatusEnum,
  BizTypesEnum,
  NOTICE_REDIRECT_URLS_MAP,
};
