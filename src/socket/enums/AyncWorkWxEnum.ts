enum AyncWorkWxEnum {
  DOWNLOAD_FILE = 'DOWNLOAD_FILE',

  // 开始同步企业微信部门
  SYNC_WORK_WECHAT_DEPT = 'SYNC_WORK_WECHAT_DEPT',
  // 开启同步企业微信部门响应事件
  SYNC_WORK_WECHAT_DEPT_RESPONSSE = 'SYNC_WORK_WECHAT_DEPT_RESPONSSE',
  // 同步企微部门成功
  SYNC_WORK_WECHAT_DEPT_SUCCESS = 'SYNC_WORK_WECHAT_DEPT_SUCCESS',
  // 同步企微部门失败
  SYNC_WORK_WECHAT_DEPT_FAILED = 'SYNC_WORK_WECHAT_DEPT_FAILED',
  // 开始同步企业微信用户
  SYNC_WORK_WECHAT_USER = 'SYNC_WORK_WECHAT_USER',
  // 开启同步企业微信用户的响应事件
  SYNC_WORK_WECHAT_USER_RESPONSSE = 'SYNC_WORK_WECHAT_USER_RESPONSSE',
  // 同步企微通讯录用户成功
  SYNC_WORK_WECHAT_USER_SUCCESS = 'SYNC_WORK_WECHAT_USER_SUCCESS',
  // 同步企微通讯录用户失败
  SYNC_WORK_WECHAT_USER_FAILED = 'SYNC_WORK_WECHAT_USER_FAILED',
}
export default AyncWorkWxEnum;