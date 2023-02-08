/* eslint-disable no-param-reassign */
import {
  useRef,
  useState,
  ReactElement,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Upload, message } from 'antd';
import type { UploadProps } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import {
  UploadChangeParam,
  RcFile,
  UploadFile,
  UploadFileStatus,
} from 'antd/lib/upload/interface';
import OSS from 'ali-oss';
import { deepClone } from '@/utils/utils';
import {
  OSSInfo,
} from './type.d';
import { getOSSInfo } from '@/apis/upload';
import suffixToMimeMap from './suffix2mime';
import { getBase64Url, getCompressedUrl } from './helper';

const { Dragger } = Upload;
export interface ItemRenderActions {
  download: Function,
  preview: Function,
  remove: Function
}

export interface DraggerUploadInputProps {
  ossActionType?: string, // ali-oss bucket name
  value?: any[],
  children?: ReactElement,
  disabled?: boolean,
  accept?: string,
  fileSize?: number,
  maxCount?: number;
  isCustomRequest?: boolean; // 自定义上传，默认true
  isManual?: boolean, // 手动上传，默认false
  showUploadList?: boolean;
  onDrop?: Function,
  onChange?: Function,
  onSuccess?: Function,
  onRemove?: Function,
  itemRender?: (originNode: ReactElement, file: UploadFile, fileList: UploadFile[], actions: ItemRenderActions) => React.ReactNode
}

const excepts = ['.pptx', '.xls', '.xlsx']; // macOS传mime给antd上传组件无法识别

function DraggerUploadInput(props: DraggerUploadInputProps, ref: any) {
  const {
    ossActionType,
    value,
    children,
    disabled,
    accept,
    fileSize = 1,
    maxCount = 10,
    isCustomRequest = true,
    isManual = false,
    showUploadList,
    onDrop,
    onChange,
    itemRender,
  } = props;
  const ossStsRef = useRef<OSSInfo>();
  const ossClientRef = useRef<OSS>();
  const [localFileList, setLocalFileList] = useState<UploadFile[]>([]);
  const localFileListRef = useRef<UploadFile[]>(localFileList);

  useEffect(() => {
    localFileListRef.current = localFileList;
  }, [localFileList]);

  useImperativeHandle(ref, () => ({
    // 删除文件
    removeFile: (file: UploadFile) => {
      const removeIndex = localFileList.findIndex((item) => item.uid === file.uid);
      const newFileList = [...localFileList];
      newFileList.splice(removeIndex, 1);
      triggerChange(newFileList);
    },
    // 重新上传
    reUploadFile: async (file: UploadFile) => {
      updateFileList(file, localFileListRef.current, 'uploading');

      if (ossClientRef.current && ossStsRef.current) {
        try {
          const result = await ossClientRef.current.put(
            `${ossStsRef.current.directory}/${file.uid}_${file.name}`,
            file.originFileObj,
          );

          // 重要！：获取最新的localFileList，避免异步请求成功后，用旧的数据覆盖新的数据，错误处理同理
          updateFileList(file, localFileListRef.current, 'done', result.url);

          message.success('重新上传成功');
          return await Promise.resolve(result);
        } catch (err) {
          updateFileList(file, localFileListRef.current, 'error');
          message.error('重新上传失败');
          return Promise.reject(err);
        }
      } else {
        updateFileList(file, localFileListRef.current, 'error');
        message.error('重新上传失败');
        return Promise.reject('未获取上传凭证');
      }
    },
  }));

  // 重新上传时更新文件列表状态和url
  const updateFileList = (file: UploadFile, fileList: UploadFile[], status: UploadFileStatus, url?: string) => {
    const newFileList: UploadFile[] = deepClone(fileList);
    const index = newFileList.findIndex((item) => item.uid === file.uid);

    if (index > -1) {
      newFileList[index].status = status;

      if (url) {
        newFileList[index].url = url;
      }

      triggerChange(newFileList);
    }
  };

  const handleDrop = () => {
    if (typeof onDrop === 'function') onDrop();
  };

  const handleBeforeUpload = (file: RcFile, fileList: UploadFile[]) => {
    // 本次上传的图片数量
    const listLength = fileList.length;
    const overSizeFiles = fileList.filter((item) => (item.size || 0) / 1024 / 1024 > fileSize);
    const overSizeCount = overSizeFiles.length;
    // 所有文件：已经存在的+本次上传的
    const totalFileList = [...localFileList, ...fileList];
    const currentFileIndex = totalFileList.findIndex((item) => item.uid === file.uid);
    const overMaxCount = totalFileList.length - maxCount;

    if (file.uid === fileList[listLength - 1].uid) {
      if (overSizeCount > 0) {
        message.info(`已过滤${overSizeCount}张大于${fileSize}M的文件`);
      }

      if (overMaxCount > 0) {
        message.info(`一次最多上传${maxCount}个文件，超出的文件已为您过滤`);
      }
    }

    // 文件大小限制
    if (file.size / 1024 / 1024 > fileSize) {
      return Upload.LIST_IGNORE;
    }

    // 检查文件格式
    if (!checkAccept(file)) {
      return Upload.LIST_IGNORE;
    }

    // 数量限制
    if (maxCount && currentFileIndex >= maxCount) {
      return Upload.LIST_IGNORE;
    }

    return isCustomRequest || !isManual;
  };

  const handleCustomRequest = async (options: any) => {
    const { file, onSuccess: handleSuccess, onError } = options;

    if (ossClientRef.current && ossStsRef.current) {
      try {
        const result = await ossClientRef.current.put(
          `${ossStsRef.current.directory}/${file.uid}_${file.name}`,
          file,
        );

        handleSuccess(result, file);
      } catch (err) {
        if (!file.thumbUrl) {
          const base64Url = await getBase64Url(file);
          const compressedUrl = await getCompressedUrl(base64Url as string, {
            fileType: file.type ?? 'image/png',
            width: 140,
          });
          file.thumbUrl = compressedUrl as string;
        }

        onError(err);
      }
    }
  };

  const handleChange = (info: UploadChangeParam) => {
    const newFileList: UploadFile[] = [...info.fileList];

    newFileList.forEach((newFile) => {
      if (newFile.response) {
        newFile.url = newFile.response.url;
      }
    });

    triggerChange(newFileList);
  };

  const triggerChange = (changedFileList: UploadFile[]) => {
    setLocalFileList(changedFileList);

    if (onChange) {
      onChange(changedFileList);
    }
  };

  const checkAccept = (file: RcFile) => {
    const { name, type } = file;
    if (!accept) return true;
    const mimeArr = getMimeAccept(accept).split(',');
    if (type && mimeArr.some((v) => v.toLowerCase() === type.toLowerCase())) return true;
    const acceptArr = accept.split(',');
    return acceptArr.some((v) => (new RegExp(`${v.toLowerCase()}$`).test(name.toLowerCase())));
  };

  const getMimeAccept = (acceptTypes: string | undefined) => {
    if (!acceptTypes) return '';
    const acceptArr = acceptTypes.split(',');
    return acceptArr.map((acc) => {
      const accLow = acc.toLowerCase();
      if (excepts.indexOf(accLow) > -1) return acc.toUpperCase();
      return (suffixToMimeMap as any)[accLow] || accLow;
    }).join(',');
  };

  useEffect(() => {
    if (value && value.length) {
      setLocalFileList(value);
    }
  }, [value]);

  // 获取上传凭证，创建client
  useEffect(() => {
    const createOSSClient = async () => {
      if (!ossActionType) {
        message.error('上传ali-oss需携带ossActionType参数');
        return;
      }

      const sts: OSSInfo = await getOSSInfo(ossActionType);
      const client = new OSS({
        secure: true,
        accessKeySecret: sts.accessKeySecret,
        accessKeyId: sts.accessKeyId,
        stsToken: sts.securityToken,
        region: sts.region,
        bucket: sts.bucket,
      });

      ossStsRef.current = sts;
      ossClientRef.current = client;
    };

    createOSSClient();
  }, []);

  const draggerProps: UploadProps = {
    name: 'file',
    accept: getMimeAccept(accept),
    disabled,
    fileList: localFileList,
    multiple: true,
    showUploadList,
    itemRender,
    customRequest: handleCustomRequest,
    onDrop: handleDrop,
    beforeUpload: handleBeforeUpload,
    onChange: handleChange,
  };

  const defaultContent = (
    <>
      <p className="ant-upload-drag-icon" style={{ marginBottom: '12px' }}>
        <CloudUploadOutlined style={{ color: 'rgba(0,0,0,0.85)' }} />
      </p>
      <p style={{ marginBottom: '12px', color: 'rgba(0,0,0,0.85)' }}>
        将文件拖拽至此处，或点击
        <span style={{ color: '#2F54EB' }}>选择文件</span>
      </p>
      <p className="ant-upload-hint">
        建议图片为竖版，尺寸为610*960px，一次最多上传
        {maxCount}
        张
      </p>
      <p className="ant-upload-hint">
        支持上传
        {fileSize}
        MB以内的jpg、jpeg、png、gif格式图片
      </p>
    </>
  );

  return (
    <Dragger {...draggerProps}>
      { children || defaultContent }
    </Dragger>
  );
}

export default forwardRef(DraggerUploadInput);
