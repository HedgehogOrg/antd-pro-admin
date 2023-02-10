/* eslint-disable @typescript-eslint/indent */
/*
 * File: account.tsx
 * Project: sd-console-web
 * FilePath: /src/modules/account/pages/account.tsx
 * Created Date: 2022-04-08 18:38:15
 * Author: diya
 * -----
 * Last Modified: Fri Nov 04 2022
 * Modified By: diya
 * -----
 * Description:
 */

import React, {
  ReactElement, useCallback, useEffect, useRef, useState,
} from 'react';
import {
  PlusOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  CloseCircleOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import {
  Space, message, Popover, Spin,
} from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { observer } from 'mobx-react';
import CustomProTable from '@/components/CustomProTable';
// import CreateAccountModal from '@/modules/account/components/CreateAccountModal';
import EditAccountModal from '@/modules/account/components/EditAccountModal';
import WithActionBtn from '@/components/WithActionBtn';
import DeleteAccount from '../components/DeleteAccount';
import ResetButton from '../components/ResetButton';
import {
  AccountListItem,
  AccountListRequestType,
} from '@/types/stores/account/index';
import AccountStore from '@/stores/account/AccountStore';
import { useIntl } from '@/utils/intl';
import AuthButton from '@/components/AuthButton';
import BulkImportModal from '@/components/BulkImportModal';
import SelectInput from '@/components/SelectInput';
import AllrolesFetch from '@/apis/AllrolesFetch';
import TreeSelectInput from '@/components/TreeSelectInput';
import DepartmentTreeFetch from '@/apis/DepartmentTreeFetch';
import SocketEvent from '@/socket/enums/AyncWorkWxEnum';
import { WorkFlowFormStore } from '@/stores/work';
import { asyncTasks } from '@/apis/common';
import webSocket from '@/socket';
import WebsocketStore from '@/stores/websocket/WebsocketStore';
import { useUser } from '@/hooks';

const initSocket = async () => {
  webSocket.getInstance();
};
function Account() {
  const t = useIntl('account');

  const tableRef = useRef<ActionType>();
  // 新建账号模态框
  // const [createModalVisible, setCreateModalVisible] = useState(false);
  // 编辑账号模态框
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 批量导入模态框
  const [bulkModalVisible, setbulkModalVisible] = useState(false);
  const [editId, setEditId] = useState<number | string>();
  const localUser = useUser();
  const [popverContent, setpopverContent] = useState<ReactElement | string>('');
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  // 切换状态
  const editStatus = (record: AccountListItem) => new Promise((resolve, reject) => {
    const { id, status } = record;
    console.log('record', record);

    const checkStatus = status === 1 ? 0 : 1;
    AccountStore.status({ id, status: checkStatus })
      .then((res) => {
        if (checkStatus === 1) {
          message.success(t('ENABLE_SUCCESS_MESSAGE'));
        } else {
          message.success(t('DISENABLE_SUCCESS_MESSAGE'));
        }
        tableRef.current?.reload();
        resolve(res);
      })
      .catch((err) => {
        if (checkStatus === 1) {
          message.error(t('ENABLE_FAILURE_MESSAGE'));
        } else {
          message.error(t('DISENABLE_FAILURE_MESSAGE'));
        }
        reject(err);
      });
  });

  /**
   * 新建账号
   */
  // 打开新建模态框
  // const handleShowCreateModal = () => {
  //   setCreateModalVisible(true);
  // };
  // // 关闭新建模态框
  // const handleCloseCreateModal = useCallback(() => {
  //   setCreateModalVisible(false);
  // }, []);
  // 打开编辑模态框
  const handleCreateAndEditModal = (isEdit: boolean, id?: number | string) => {
    setIsModalOpen(true);
    setIsEditModal(isEdit);
    if (isEdit) {
      setEditId(id);
    }
  };
  // 关闭编辑模态框
  const handleCloseCreateAndEditModal = () => {
    setIsModalOpen(false);
  };

  // 打开导入模态框
  const handleBulkClick = useCallback(() => {
    setbulkModalVisible(true);
  }, []);
  // 关闭导入模态框
  const handleCloseBulkModal = useCallback(() => {
    setbulkModalVisible(false);
  }, []);
  // 同步企业微信
  const syncWorkWx = () => {
    WorkFlowFormStore.setSyncFlag('loading');
    asyncTasks({ taskType: SocketEvent.SYNC_WORK_WECHAT_USER, visitorId: WebsocketStore.visitorId, data: {} })
      .then(() => { })
      .catch(() => {
        WorkFlowFormStore.setSyncFlag('pending');
      });
  };
  const columns: ProColumns<AccountListItem>[] = [
    {
      title: t('NAME'),
      key: 'name',
      dataIndex: 'name',
      ellipsis: true,
      width: 137,
    },
    {
      title: t('LOGIN_ACCOUNT'),
      key: 'account',
      dataIndex: 'account',
      ellipsis: true,
      width: 158,
    },
    {
      title: t('ROLE'),
      key: 'role',
      dataIndex: ['role'],
      ellipsis: true,
      hideInSearch: true,
      width: 130,
    },
    {
      title: t('SUBORDINATE_DEPARTMENTS'),
      key: 'departments',
      dataIndex: ['departments'],
      ellipsis: true,
      hideInSearch: true,
      width: 130,
    },
    {
      title: t('STATUS'),
      key: 'status',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        100: {
          text: t('NO_LIMIT'),
          status: 10,
        },
        1: {
          text: t('ENABLE'),
          status: 11,
        },
        0: {
          text: t('DISENABLE'),
          status: 12,
        },
      },
    },
    {
      title: t('ROLE'),
      key: 'roleId',
      dataIndex: 'roleId',
      filters: true,
      hideInTable: true,
      renderFormItem: (_, { type, defaultRender }, form) => {
        if (type === 'form') {
          return null;
        }
        const status = form.getFieldValue('state');
        if (status !== 'open') {
          return (
            <SelectInput
              fetch={AllrolesFetch}
              onChange={(value: any) => {
                form.setFieldsValue({ roleId: value });
              }}
              tableRef={tableRef}
              placeholder={t('PLEASE_SELECT_ROLE')}
            />
          );
        }
        return defaultRender(_);
      },
    },
    {
      title: t('DEPARTMENT'),
      key: 'departmentIds',
      dataIndex: 'departmentIds',
      hideInTable: true,
      colSize: 2,
      renderFormItem: (_, fieldConfig, form) => {
        if (fieldConfig.type === 'form') {
          return null;
        }
        const status = form.getFieldValue('state');

        if (status !== 'open') {
          return (
            <TreeSelectInput
              fetch={DepartmentTreeFetch}
              title={t('PLEASE_SELECT_DEPARTMENT')}
              tableRef={tableRef}
            />
          );
        }
        return fieldConfig.defaultRender(_);
      },
    },

    {
      title: t('CREATE_TIME'),
      key: 'createdAt',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      hideInSearch: true,
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.createdAt - b.createdAt,
      width: 184,
    },
    {
      title: t('CREATOR'),
      key: 'creator',
      dataIndex: ['creator'],
      ellipsis: true,
      hideInSearch: true,
      width: 120,
    },
    {
      title: t('STATUS'),
      key: 'state',
      dataIndex: 'status',
      hideInSearch: true,
      width: 98,
      render: (_, record) => (
        <div key={record.id}>
          {record.status ? (
            <Space>
              <CheckCircleFilled style={{ color: '#52c41a' }} />
              <span>{t('ENABLE')}</span>
            </Space>
          ) : (
            <Space>
              <CloseCircleFilled style={{ color: '#F5222D' }} />
              <span>{t('DISENABLE')}</span>
            </Space>
          )}
        </div>
      ),
    },
    {
      title: t('ACTION'),
      key: 'option',
      valueType: 'option',
      width: 170,
      fixed: 'right',
      render: (_, record) => [
        <WithActionBtn
          key={record.id}
        // btnMoreStyle={{
        //   color: record.isSuper === 1 ? 'rgba(0, 0, 0, 0.25)' : '#1890ff',
        // }}
        >
          <AuthButton
            type="link"
            aclsid="account.EDIT"
            key="edit"
            style={{ padding: 3 }}
            onClick={() => handleCreateAndEditModal(true, record.id)}
          >
            {t('EDIT')}
          </AuthButton>
          <AuthButton
            type="link"
            aclsid="account.STATUS"
            onClick={() => editStatus(record)}
            key="enable"
            style={{ padding: 3 }}
            disabled={record.isSuper === 1 && record.id === localUser.id}
          >
            {record.status === 0 ? t('ENABLE') : t('DISENABLE')}
          </AuthButton>
          <ResetButton
            key="reset"
            aclsid="account.RESEST_PASSWORD"
            record={record}
          />
          <DeleteAccount
            key="delete"
            aclsid="account.DELETE"
            disabled={record.isSuper === 1}
            hiddenIfDisabled={!record.isSuper}
            record={record}
            tableRef={tableRef}
          />
        </WithActionBtn>,
      ],
    },
  ];
  const defaultColConfig = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 8,
    xxl: 6,
  };
  const getSyncText = () => {
    let content: any = '';
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    switch (WorkFlowFormStore.syncFlag) {
      case 'pending':

        break;
      case 'loading':
        content = (
          <>
            <Spin indicator={antIcon} />
            {t('SYNC_LOADING')}
          </>
        );

        break;
      case 'success':
        content = (
          <>
            <CheckCircleOutlined style={{ color: '#51C419' }} />
            {t('SYNC_SUCCESS')}
          </>
        );
        break;
      case 'fail':
        content = (
          <>
            <CloseCircleOutlined style={{ color: 'red' }} />
            {t('SYNC_FAIL')}
          </>
        );
        break;
      default:
        content = '';
        break;
    }
    setpopverContent(content);
  };
  useEffect(() => {
    getSyncText();
  }, [WorkFlowFormStore.syncFlag]);
  useEffect(() => {
    initSocket();
  }, []);
  return (
    <>
      <CustomProTable<AccountListItem, AccountListRequestType >
        rowKey={(record) => record.id}
        columns={columns}
        actionRef={tableRef}
        cardBordered
        scroll={{ x: 1000 }}
        postData={(data) => {
          // 秒转换为毫秒给protable处理
          const res = data;
          res.forEach((_, index) => {
            res[index].createdAt *= 1000;
            const departmentsName = res[index].departments.map(
              (item: any) => item.name,
            );
            res[index].departments = departmentsName.join('、');
            res[index].role = res[index].role === null ? '' : res[index].role.name;
            res[index].creator = res[index].creator === null ? '' : res[index].creator.name;
          });
          return res;
        }}
        request={async (params, sorter) => {
          // 处理排序字段
          let sort: string | undefined = '';
          Object.keys(sorter).forEach((key) => {
            if (sorter[key] === 'descend') {
              sort += `-${key}`;
            } else {
              sort += `${key}`;
            }
          });
          sort = sort || undefined;
          // 如果状态不限，则不传status参数
          const isAll = String(params.status) === '100';
          const curStatus = isAll ? undefined : params.status;
          const departmentIdsStr = params.departmentIds === undefined
            || params.departmentIds.length === 0
            ? undefined
            : (params.departmentIds as number[]).map(
              (item: any) => item.value,
            );
          const data = await AccountStore.list({
            page: params.current as number,
            pageSize: params.pageSize as number,
            name: params.name,
            account: params.account,
            status: curStatus,
            roleId: params.roleId,
            departmentIds: departmentIdsStr,
            sort,
            expand: 'role,departments,creator',
          });
          return {
            data: data.items,
            success: true,
            total: data.total,

          };
        }}
        search={{
          labelWidth: 'auto',
          span: defaultColConfig,
        }}
        pagination={{
          defaultCurrent: AccountStore.pageOptions.current,
          defaultPageSize: AccountStore.pageOptions.pageSize,
          onChange: (current, pageSize) => {
            AccountStore.setPageOptions(current, pageSize);
          },
        }}
        headerTitle={t('ACCOUNT_LIST')}
        toolBarRender={() => [
          <Popover content={popverContent}>
            <AuthButton
              key="syncFlag"
              aclsid="account.SYNC_WORK_WX"
              type="primary"
              className="mr-10"
              onClick={() => syncWorkWx()}
              loading={WorkFlowFormStore.syncFlag === 'loading'}
            >
              {t('SYNC_WORK_WX')}
            </AuthButton>
          </Popover>,
          <AuthButton
            key="import"
            aclsid="account.IMPORT"
            onClick={() => handleBulkClick()}
          >
            {t('BULK_IMPORT')}
          </AuthButton>,
          <AuthButton
            key="create"
            aclsid="account.CREATE"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => handleCreateAndEditModal(false)}
          >
            {t('CREATE_ACCOUNT')}
          </AuthButton>,
        ]}
      />
      {/* {createModalVisible && (
        <CreateAccountModal
          visible={createModalVisible}
          closeModal={handleCloseCreateModal}
          tableRef={tableRef}
        />
      )} */}
      {isModalOpen && (
        <EditAccountModal
          visible={isModalOpen}
          tableRef={tableRef}
          closeModal={handleCloseCreateAndEditModal}
          editId={editId as number}
          isEdit={isEditModal}
        />
      )}
      <BulkImportModal
        visible={bulkModalVisible}
        closeModal={handleCloseBulkModal}
        tableRef={tableRef}
        fetch={AccountStore}
        hrefs="https://bs-develop-share.oss-cn-shenzhen.aliyuncs.com/console-import-account-tmplate.xls"
      />
    </>
  );
}
export default observer(Account);
