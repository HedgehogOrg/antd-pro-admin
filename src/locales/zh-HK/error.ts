const error = {
  OK: '操作成功',
  CANCELLED: '操作被取消',
  UNKNOWN: '未知錯誤',
  INVALID_ARGUMENT: '參數錯誤',
  DEADLINE_EXCEEDED: '請求超時',
  NOT_FOUND: '暫無數據',
  ALREADY_EXISTS: '已存在',
  PERMISSION_DENIED: '暫無權限',
  UNAUTHENTICATED: '登錄過期，請重新登錄',
  RESOURCE_EXHAUSTED: '您操作太頻繁了',
  FAILED_PRECONDITION: '請求錯誤',
  ABORTED: '請求被阻斷',
  OUT_OF_RANGE: '超出有效範圍',
  UNIMPLEMENTED: '暫不支持',
  INTERNAL: '服務器錯誤',
  UNAVAILABLE: '服務器錯誤',
  DATA_LOSS: '數據丟失',
  NETWORK_ERROR: '網絡錯誤',
  SERVER_ERROR: '服務器錯誤',
  SERVER_NO_RESPONSE: '服務器沒反應',
  TIMEOUT: '加載超時，請檢查您的網絡環境',
  USER_LOCK: '該賬號已被鎖定',
  PWD_ERR: '密碼錯誤',
  STATUS_LOCK: '資源已禁用',
  ORG_SSO_CODE_INVALID: '授權碼無效',
  RESOURCE_REFERENCED: '資源被引用, 禁止刪除',
  CONFIRM_PASSWORD_INCONSISTENT: '兩次密碼不一致',
  WORK_WECHAT_TOKEN_ERROR: '企業微信token錯誤',
  WORK_WECHAT_DEPARTMENT_LIST_ERROR: '企業微信部門列表錯誤',
  WORK_WECHAT_USER_SIMPLE_LIST_ERROR: '企業微信獲取部門成員錯誤',
  WORK_WECHAT_USER_LIST_ERROR: '',
  WORK_WECHAT_USER_GET_USERID_BY_CODE_ERROR: '通過code獲取成員詳情錯誤',
  WORK_WECHAT_MESSAGE_ERROR: '企業微信發送消息失敗',
};
export default error;
