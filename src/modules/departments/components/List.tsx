/*
 * Author: Alvin
 * Modified By: Alvin
 * Created Date: 2022-04-15 09:26:14
 * Last Modified: 2022-04-18 14:27:01
 * Description:
 */

import React, { useEffect, useCallback, useState, ReactElement } from 'react';
import { Table, Space, Popover, Spin } from 'antd';
import { CaretRightOutlined, CaretDownOutlined, PlusOutlined, CheckCircleOutlined, LoadingOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import Filter from './Filter';
import intl, { useIntl } from '@/utils/intl';
import { Department, DepartmentParams } from '@/types/stores/departments';
import styles from './index.module.less';
import AuthButton from '@/components/AuthButton';
import { asyncTasks } from '@/apis/common';
import { WorkFlowFormStore } from '@/stores/work';
import SocketEvent from '@/socket/enums/AyncWorkWxEnum';
import WithConfigProvider from '@/components/WithConfigProvider';
import WebsocketStore from '@/stores/websocket/WebsocketStore';
import webSocket from '@/socket';

type Props = {
  item?: Department[],
  loading?: boolean,
  onSearch: (search: string | string[]) => void,
  onEdit: (item: Department) => void,
  onRemove: (item: Department) => void,
  onReset: () => void,
  onCreate: (item: DepartmentParams) => void,
  onChange: (pagination: any) => void
};
const initSocket = async () => {
  webSocket.getInstance();
};
function List(props: Props) {
  const {
    item, loading, onSearch, onCreate, onEdit, onRemove, onReset, onChange,
  } = props;
  const i18n = useIntl('department');
  const [pageObj, setPageObj] = useState<any>();
  const [popverContent, setpopverContent] = useState<ReactElement | string >('');

  // 同步企业微信
  const syncWorkWx = () => {
    WorkFlowFormStore.setSyncFlag('loading');
    asyncTasks({ taskType: SocketEvent.SYNC_WORK_WECHAT_DEPT, visitorId: WebsocketStore.visitorId, data: {} })
      .then(() => {})
      .catch(() => {
        WorkFlowFormStore.setSyncFlag('pending');
      });
  };
  useEffect(() => {
    initSocket();
  }, []);
  useEffect(() => {
    getSyncText();
  }, [WorkFlowFormStore.syncFlag]);
  const columns = [
    {
      title: i18n('DEPARTMENT_NAME'),
      dataIndex: 'name',
      key: 'name',
      width: '50%',
    },
    {
      title: i18n('DEPARTMENT_LOCAL_PERSON_COUNT'),
      dataIndex: 'userCount',
      key: 'userCount',
      width: '20%',
    },
    {
      title: i18n('DEPARTMENT_CHILDREND_PERSON_COUNT'),
      dataIndex: 'childUserCount',
      width: '20%',
      key: 'childUserCount',
    }, {
      title: intl.ACTION,
      dataIndex: 'operations',
      key: 'operations',
      width: '10%',
      render: (text: string, record: Department) => (
        <Space size={0}>
          <AuthButton aclsid="department.EDIT" size="small" type="link" onClick={() => onEditHandler(record)}>{intl.EDIT}</AuthButton>
          <AuthButton aclsid="department.DELETE" size="small" type="link" disabled={record.childUserCount > 0} onClick={() => onRemoveHandler(record)}>{intl.DELETE}</AuthButton>
        </Space>
      )
      ,
    },
  ];

  const onSearchHandler = (key: string | string[]) => {
    onSearch(key);
  };

  const onResetHandler = () => {
    onReset();
  };

  const onEditHandler = (department: Department) => {
    onEdit(department);
  };

  const onCreateHandler = () => {
    onCreate({ name: '', parentId: 0 });
  };

  const onRemoveHandler = (department: Department) => {
    if (department.childUserCount <= 0) {
      onRemove(department);
    }
  };
  const changeHandle = useCallback((pagination) => {
    setPageObj({ ...pagination });
    onChange(pagination);
  }, []);

  const expandIconView = ({ expanded, onExpand, record }: { expanded: boolean, onExpand: (record: Department, event: React.MouseEvent<HTMLElement>) => void, record: Department }) => {
    if (record.children) {
      if (expanded) {
        return <CaretDownOutlined onClick={(e: React.MouseEvent<HTMLElement>) => onExpand(record, e)} />;
      }
      return <CaretRightOutlined onClick={(e: React.MouseEvent<HTMLElement>) => onExpand(record, e)} />;
    }
    return null;
  };
  const getSyncText = () => {
    let content:any = '';
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    switch (WorkFlowFormStore.syncFlag) {
      case 'pending':

        break;
      case 'loading':
        content = (
          <>
            <Spin indicator={antIcon} />
            {i18n('SYNC_LOADING')}
          </>
        );

        break;
      case 'success':
        content = (
          <>
            <CheckCircleOutlined style={{ color: '#51C419' }} />
            {i18n('SYNC_SUCCESS')}
          </>
        );
        break;
      case 'fail':
        content = (
          <>
            <CloseCircleOutlined style={{ color: 'red' }} />
            {i18n('SYNC_FAIL')}
          </>
        );
        break;
      default:
        content = '';
        break;
    }
    setpopverContent(content);
  };
  const paginations = {
    total: pageObj?.total || 0,
    page: pageObj?.current || 1,
    pageSize: pageObj?.pageSize || 20,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`,
  };

  if (item) {
    // 剔除空 children 数组属性
    const temItem = JSON.parse(JSON.stringify(item));
    const recurrence = (itemInner: Department | any) => {
      if (itemInner && itemInner?.children.length > 0) {
        itemInner?.children.forEach((val: Department) => {
          recurrence(val);
        });
      } else {
        const temp = itemInner;
        delete temp?.children;
      }
    };
    if (temItem && temItem.length > 0) {
      temItem.forEach((tempV: Department) => {
        recurrence(tempV);
      });
    }

    return (
      <div className={styles.table}>
        <Filter search="" onReset={onResetHandler} onSearch={onSearchHandler} />
        <div className={styles.divider} />
        <div className={styles['table-header']}>
          <div style={{
            color: '#000000D9', fontSize: 16, fontWeight: '600', lineHeight: '1.85em',
          }}
          >
            {i18n('DEPARTMENT_LIST')}
          </div>
          <div>
            <Popover content={popverContent}>
              <AuthButton
                key="syncFlag"
                aclsid="account.SYNC_WORK_WX"
                type="primary"
                className="mr-10"
                onClick={() => syncWorkWx()}
                loading={WorkFlowFormStore.syncFlag === 'loading'}
              >
                {i18n('SYNC_WORK_WX')}
              </AuthButton>
            </Popover>
            <AuthButton aclsid="department.CREATE" type="primary" onClick={onCreateHandler} style={{ marginLeft: 10 }}>
              <PlusOutlined />
              {i18n('CREATE_DEPARTMENT')}
            </AuthButton>
          </div>
        </div>
        <WithConfigProvider>
          <Table
            loading={loading}
            columns={columns}
            dataSource={temItem}
            pagination={paginations}
            expandIcon={expandIconView}
            onChange={changeHandle}
          />
        </WithConfigProvider>
      </div>
    );
  }
  return null;
}

export default observer(List);
