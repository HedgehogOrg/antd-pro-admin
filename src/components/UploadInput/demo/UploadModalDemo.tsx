/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useMemo, useState, useEffect, useRef } from 'react';
import { message, Modal, Button, Image as AntImage, Progress } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { CheckCircleTwoTone, LoadingOutlined, CloseCircleOutlined, CloudUploadOutlined } from '@ant-design/icons';
import DraggerUploadInput from '@/components/UploadInput/DraggerUploadInput';
import WithConfigProvider from '@/components/WithConfigProvider';
import styles from './upload-modal-demo.module.less';

interface FileInfoType {
  name: string;
  size: number;
  url: string;
}

interface CompnentProps {
  visible?: boolean;
  maxCount?: number;
  onCancel?: () => void;
  onOk?: (data: FileInfoType[]) => void;
}

function PlaceHolder() {
  return <div style={{ width: '70px', height: '70px', background: '#f5f5f5' }} />;
}
const imgStyle = {
  objectFit: 'contain' as const,
};

function UploadModalDemo(props: CompnentProps) {
  const { visible, maxCount = 50, onCancel, onOk } = props;
  const [hoveredFileUid, setHoveredFileUid] = useState<string>();
  const uploaderRef = useRef<{ removeFile(file: UploadFile): void, reUploadFile(file: UploadFile): Promise<any> }>();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // 进度逻辑
  const uploadingList = useMemo(() => fileList.filter((file) => file.status === 'uploading'), [fileList]);
  const successList = useMemo(() => fileList.filter((file) => file.status === 'done'), [fileList]);
  const failList = useMemo(() => fileList.filter((file) => file.status === 'error'), [fileList]);
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    if (fileList.length > 0) {
      const newProgress = uploadingList.length > 0 ? Math.floor(((successList.length + failList.length) / fileList.length) * 100) : 100;
      setProgress(newProgress);
    } else {
      setProgress(0);
    }
  }, [fileList, uploadingList, successList]);

  const handleFileListChange = (changedFileList: UploadFile[]) => {
    // 直接setFileList(changedFileList)，组件可能不会重新渲染
    setFileList([...changedFileList]);
  };

  // 重新上传
  const onReUpload = async (file: UploadFile) => {
    if (uploaderRef) {
      uploaderRef.current?.reUploadFile(file);
    }
  };

  // 删除
  const onFileDelete = (file: UploadFile) => {
    if (uploaderRef) {
      uploaderRef.current?.removeFile(file);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const handleOk = () => {
    if (fileList.length === 0) {
      message.warning('请选择图片文件');
      return;
    }

    if (failList.length > 0) {
      message.error('请先处理上传失败图片');
      return;
    }

    if (onOk) {
      const data = fileList.map((file) => ({
        name: file.name,
        size: file.size || 0,
        url: file.url ?? '',
      }));

      onOk(data);
    }
  };

  const renderProgress = () => (
    <div className={styles['upload-progress']}>
      <Progress percent={progress} status="active" />

      <div style={{ marginTop: '12px', fontSize: '12px' }}>
        {`共 ${fileList.length} 个：`}
        <span>上传成功</span>
        <span style={{ padding: '0 6px 0 2px', color: '#52C41A' }}>{successList.length}</span>
        <span>上传失败</span>
        <span style={{ padding: '0 6px 0 2px', color: '#FF4D4F' }}>{failList.length}</span>
        <span>上传中</span>
        <span style={{ padding: '0 6px 0 2px' }}>{uploadingList.length}</span>
      </div>
    </div>
  );

  // itemRender可以自定义列表项，但是antd upload 不支持失败重传，样式修改也比较麻烦，故自己实现
  const renderFileList = () => (
    <div className={styles['upload-list-container']}>
      {fileList.map((file) => {
        // 上传中
        if (file.status === 'uploading') {
          return (
            <div
              key={file.uid}
              className={styles['list-item-container']}
              onMouseOver={() => { setHoveredFileUid(file.uid); }}
              onMouseLeave={() => { setHoveredFileUid(''); }}
            >
              {/* 首次上传，上传中不显示url，重新上传时可以显示thumbUrl */}
              {file.thumbUrl ? <AntImage width={70} style={imgStyle} src={file.thumbUrl} alt="" /> : <PlaceHolder />}
              <div className={styles['list-item-mask']}>
                <LoadingOutlined style={{ margin: '2px 0 8px 0', fontSize: '24px' }} />
                <div>上传中...</div>
              </div>
              { hoveredFileUid === file.uid && <div className={styles['file-delete']} onClick={() => { onFileDelete(file); }}>删除</div> }
            </div>
          );
        }

        // 上传成功
        if (file.status === 'done') {
          return (
            <div
              key={file.uid}
              className={styles['list-item-container']}
              onMouseOver={() => { setHoveredFileUid(file.uid); }}
              onMouseLeave={() => { setHoveredFileUid(''); }}
            >
              {/* 优化：显示宽度70x2缩略图，保持原始比例，使用webp，质量80%渐进式加载，预览时加载原图 */}
              <AntImage
                width={70}
                style={imgStyle}
                src={`${file.url}?x-oss-process=image/resize,w_140,m_lfit/format,webp/quality,q_80`}
                preview={{ src: file.url }}
                alt=""
              />
              <CheckCircleTwoTone twoToneColor="#52c41a" style={{ position: 'absolute', top: '2px', right: '2px' }} />
              { hoveredFileUid === file.uid && <div className={styles['file-delete']} onClick={() => { onFileDelete(file); }}>删除</div> }
            </div>
          );
        }

        // 上传失败
        if (file.status === 'error') {
          return (
            <div
              key={file.uid}
              className={styles['list-item-container']}
              onMouseOver={() => { setHoveredFileUid(file.uid); }}
              onMouseLeave={() => { setHoveredFileUid(''); }}
            >
              {file.thumbUrl ? <AntImage width={70} style={imgStyle} src={file.thumbUrl} alt="" /> : <PlaceHolder />}
              {
                  hoveredFileUid === file.uid ? (
                    <div className={styles['list-item-mask']} onClick={() => { onReUpload(file); }}>
                      <CloudUploadOutlined style={{ marginBottom: '4px', fontSize: '28px', color: '#fff' }} />
                      <div>重新上传</div>
                    </div>
                  ) : (
                    <div className={styles['list-item-mask']}>
                      <CloseCircleOutlined style={{ marginBottom: '4px', fontSize: '28px', color: '#FF4D4F' }} />
                      <div>上传失败</div>
                    </div>
                  )
                }
              { hoveredFileUid === file.uid && <div className={styles['file-delete']} onClick={() => { onFileDelete(file); }}>删除</div> }
            </div>
          );
        }

        return null;
      })}
    </div>
  );

  return (
    <WithConfigProvider>
      <Modal
        title="上传图片"
        open={visible}
        width={604}
        className={styles['upload-modal']}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>取消</Button>,
          <Button key="submit" type="primary" disabled={false} onClick={handleOk}>确定</Button>,
        ]}
      >
        <DraggerUploadInput
          ref={uploaderRef}
          // disabled
          fileSize={5}
          ossActionType="ACCOUNT_IMAGE"
          accept=".jpg,.jpeg,.png,.gif"
          maxCount={maxCount}
          showUploadList={false}
          onChange={handleFileListChange}
        />

        { renderProgress() }

        { renderFileList() }
      </Modal>
    </WithConfigProvider>
  );
}

export default UploadModalDemo;
