/*
 * File: index.tsx
 * Project: sd-console-web
 * FilePath: /src/components/BulkImportModal/index.tsx
 * Created Date: 2022-05-31 14:36:34
 * Author: diya
 * -----
 * Last Modified: Fri Sep 23 2022
 * Modified By: diya
 * -----
 * Description:
 */
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Progress,
  Table,
  message,
} from 'antd';
import {
  UploadFile,
} from 'antd/lib/upload/interface';
import {
  CheckCircleFilled,
} from '@ant-design/icons';
import { ModalType, ImportErr } from '@/types/stores/account/index';
import { useIntl } from '@/utils/intl';
import UploadInput from '@/components/UploadInput';
import style from './importModal.module.less';

/**
 *
 * @props fetch                    API请求配置，传入@/apis文件夹中的fetch实例
 * @props hrefs                     模板地址
 *
 *
 */
export interface ImportProps extends ModalType {
  fetch: any,
  hrefs: string,
  onFinished?: Function,
}
export default function BulkImportModal(props: ImportProps) {
  const t = useIntl('account');
  const {
    fetch: DataFetch, visible, closeModal, tableRef, hrefs, onFinished,
  } = props;
  const [progressModal, setProgressModal] = useState(false);
  const [successResultModal, setSuccessResultModal] = useState(false);
  const [failureResultModal, setFailureResultModal] = useState(false);
  const [percent, setPercent] = useState(0);
  const [fileAddUrl, setFileAddUrl] = useState('');
  const [errorData, setErrorData] = useState<ImportErr[]>([]);
  const [successData, setSuccessData] = useState<number>(0);

  let progress = 0;
  let timerId: ReturnType<typeof setInterval>;
  const fileAdd = (files: UploadFile) => {
    const fileUrl = files.response.url;
    setFileAddUrl(fileUrl);
    return fileUrl;
  };

  const progreeValue = () => {
    timerId = setInterval(() => {
      if (progress <= 99) {
        setPercent(progress++);
      } else {
        progress = 0;
        clearInterval(timerId);
      }
    }, 10);
  };
  // 保存立即导入
  const handleImmediately = async () => {
    setPercent(0);
    if (fileAddUrl) {
      handleCancel();
      setProgressModal(true);
      progreeValue();
      setTimeout(() => {
        DataFetch.import(fileAddUrl).then((res: any) => {
          if (res) {
            setPercent(100);
            setProgressModal(false);
            if (res.errData === undefined || res.errData.length > 0) {
              setErrorData(res.errData);
              const successNum = res.data.length === undefined ? 0 : res.data.length;
              setSuccessData(successNum);
              setFailureResultModal(true);
              setFileAddUrl('');
            } else {
              setSuccessResultModal(true);
              setFileAddUrl('');
            }
          }
        }).catch((err: any) => {
          message.error(t('SERVER_ERROR'));
          setFileAddUrl('');
          setProgressModal(false);
          console.log(err);
        }).finally(() => {
          clearInterval(timerId);
        });
      }, 1000);
    } else {
      message.error(t('SELECT_IMPORT_FILE'));
    }
  };
  // 关闭模态框
  const handleCancel = () => {
    closeModal();
  };

  // 取消导入
  useEffect(() => {
    if (progressModal === true) {
      window.onbeforeunload = function (e) {
        e.preventDefault();
        return '关闭浏览器';
      };
    } else {
      window.onbeforeunload = null;
    }
  }, [progressModal]);

  // 关闭导入成功结果模态框
  const closeSuccessResultModal = () => {
    setSuccessResultModal(false);
    finishedHandler();
  };

  // 完成（成功或者失败都执行）
  const finishedHandler = () => {
    tableRef.current?.reload();
    if (onFinished) {
      onFinished();
    }
  };

  const columns = [
    {
      title: t('SERIAL_NUMBER'),
      dataIndex: 'index',
      key: 'index',
      width: 153,
    },
    {
      title: t('REASON_FAILURE'),
      dataIndex: 'message',
      key: 'message',
    }];

  return (
    <>
      <Modal
        centered
        title={t('BULK_IMPORT')}
        open={visible}
        onCancel={closeModal}
        footer={[
          <Button key="submit" type="primary" onClick={handleImmediately}>
            {t('IMMEDIATE_IMPORT')}
          </Button>,
          <Button key="back" onClick={handleCancel}>
            {t('CANCEL')}
          </Button>,
        ]}
        destroyOnClose
        maskClosable={false}
      >
        <p>
          {t('PREPARE_THE_DATA_TO_BE_IMPORTED_ACCORDING_TO_THE_TEMPLATE_FILE_FORMAT')}
        </p>
        <p>
          <a href={hrefs}>{t('CLICK_TO_DOWNLOAD_BATCH_IMPORT_TEMPLATE')}</a>
          {t('MAXIMU_OF_100_PIECES_OF_DATA_CAN_BE_IMPORTED')}
        </p>
        <p>{t('SELECT_THE_FILE_YOU_WANT_TO_IMPORT')}</p>

        <UploadInput
          fileType="file"
          ossActionType="IMPORT_ACCOUNT_EXCEL"
          isCustomRequest
          accept=".xlsx,.xls"
          fileSize={2}
          onSuccess={(file: UploadFile) => fileAdd(file)}
          btnText={fileAddUrl ? t('TO_CHOOSE') : t('CHOOSE_FILE')}
        />
      </Modal>
      <Modal
        centered
        title={t('BULK_IMPORT')}
        open={progressModal}
        footer={false}
        closable={false}
        maskClosable={false}
      >
        <p>{t('DURING_DATA_IMPORT_DO_NOT_LEAVE_THIS_PAGE')}</p>
        <Progress
          percent={percent}
          status="active"
        />
      </Modal>

      <Modal centered title={t('BULK_IMPORT')} open={successResultModal} onCancel={closeSuccessResultModal} footer={false} maskClosable={false}>
        <div className={style['progress-success']}>
          <p>
            <CheckCircleFilled className={style['success-icon']} />
          </p>
          <p className={style['success-text']}>{t('ALL_DATA_IS_IMPORTED_SUCCESSFULLY')}</p>
        </div>
      </Modal>

      <Modal
        centered
        title={t('BULK_IMPORT')}
        open={failureResultModal}
        onCancel={() => {
          setFailureResultModal(false);
          finishedHandler();
        }}
        maskClosable={false}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() => {
              setFailureResultModal(false);
              finishedHandler();
            }}
          >
            {t('COMPLETE')}
          </Button>]}
      >
        <p>
          {t('IMPORT_TOTAL_DATA')}
          <span style={{ color: '#2F54EB' }}>{successData + errorData.length}</span>
          {t('TIAO')}
          ,
          {t('IMPORT_SUCCESS')}
          <span style={{ color: '#52C41A' }}>{successData}</span>
          {t('TIAO')}
          ,
          {t('IMPORT_FALIURE')}
          <span style={{ color: '#F5222D' }}>{errorData.length}</span>
          {t('TIAO')}
        </p>
        <Table
          rowKey={(record) => record.index}
          dataSource={errorData}
          columns={columns}
          pagination={false}
          scroll={{ y: 280 }}
        />
      </Modal>
    </>

  );
}
