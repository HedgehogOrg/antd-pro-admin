enum Method {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
}

enum APIVersion {
  V1 = 'v1',
  V2 = 'v2',
  V3 = 'v3',
}

/**
 * 权限的类型
 */
enum PermissionType {
  MENU = 1,
  BUTTON = 2,
}

enum ReportType {
  COMMON_REPORT = 0, // 通用报告
  PATIENT_REPORT = 1, // 院内患者报告
}
export { Method, APIVersion, PermissionType, ReportType };
