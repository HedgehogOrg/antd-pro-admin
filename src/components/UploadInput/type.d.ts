export interface OSSInfo {
  accessKeyId: string;
  accessKeySecret: string;
  securityToken: string;
  expiration: string;
  region: string;
  bucket: string;
  directory: string;
}

export enum UploadFileType {
  'FILE' = 'file',
  'IMAGE' = 'img',
}

export enum OssUploadFileType {
  'EXCEL' = 'IMPORT_ACCOUNT_EXCEL',
  'IMAGE' = 'ACCOUNT_IMAGE',
  'PDF' = 'REPORT_PDF',
}
