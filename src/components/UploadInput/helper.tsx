import { RcFile } from 'antd/lib/upload/interface';

export function getBase64Url(file: RcFile | undefined) {
  if (!file) return '';
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function getCompressedUrl(base64Url: string, config?: { fileType?: string, width?: number }) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const ratio = img.height / img.width;

      canvas.width = config?.width ? config.width : img.width;
      canvas.height = config?.width ? config.width * ratio : img.height;
      context?.drawImage(img, 0, 0, canvas.width, canvas.height);

      const compressedUrl = canvas.toDataURL(config?.fileType ?? 'image/png');
      return resolve(compressedUrl);
    };
    img.onerror = (error) => reject(error);
  });
}
