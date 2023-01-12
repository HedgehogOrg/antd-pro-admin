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
export { Method, APIVersion, PermissionType };
