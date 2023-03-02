import { useRef } from 'react';
import { Modal, message } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { ProColumns, ActionType } from '@ant-design/pro-table';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import AuthButton from '@/components/AuthButton';
import CustomProTable from '@/components/CustomProTable';
import { RoleItem } from '@/types/stores/role';
import { useIntl } from '@/utils/intl';
import RoleStore from '@/stores/role/RoleStore';
import RoleFetch from '@/apis/RoleFetch';
import styles from './roleList.module.less';

const { confirm } = Modal;

function RoleList() {
  const navigate = useNavigate();
  const tableRef = useRef<ActionType>();
  const t = useIntl('role');

  const columns: ProColumns<RoleItem>[] = [
    {
      title: t('ROLE_NAME'),
      width: 300,
      dataIndex: 'name',
    },
    {
      title: t('MEMBER_COUNT'),
      width: 140,
      dataIndex: 'userCount',
      search: false,
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.userCount - b.userCount,
    },
    {
      title: t('ROLE_DESC'),
      dataIndex: 'description',
      search: false,
      ellipsis: true,
      valueType: 'text',
    },
    {
      title: t('ACTION'),
      width: 140,
      dataIndex: 'option',
      search: false,
      fixed: 'right',
      render: (_, record) => (
        <>
          <AuthButton
            aclsid="role.EDIT"
            type="link"
            className={styles['action-button']}
            onClick={() => handleEditClick(record)}
          >
            {t('EDIT')}
          </AuthButton>
          <AuthButton
            aclsid="role.DELETE"
            type="link"
            className={`${styles['action-button']}, ${styles['action-margin']}`}
            disabled={record.userCount !== 0}
            onClick={() => handleDeleteClick(record)}
          >
            {t('DELETE')}
          </AuthButton>
        </>
      ),
    },
  ];

  const handleCreateClick = () => {
    navigate('create-role');
  };

  const handleEditClick = (record: RoleItem) => {
    navigate(`edit-role/${record.id}`);
  };

  /**
   * 删除角色
  */
  function ContentComponent(record: RoleItem) {
    const { name } = record;
    return (
      <p>
        {t('DELETE_MODAL_MESSAGE')}
        <strong className={styles['role-name-red']}>{name}</strong>
        ?
      </p>
    );
  }

  const handleDeleteClick = (record: RoleItem) => {
    confirm({
      title: t('DELETE_TITLE'),
      icon: <ExclamationCircleOutlined />,
      content: ContentComponent(record),
      onOk() {
        return new Promise((resolve, reject) => {
          RoleFetch.destroy(record.id)
            .then((res) => {
              message.success(t('DELETE_SUCCESS_MESSAGE'));
              tableRef.current?.reload();
              resolve(res);
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <CustomProTable<RoleItem>
      headerTitle={t('LIST_TITLE')}
      actionRef={tableRef}
      columns={columns}
      pagination={{
        defaultCurrent: RoleStore.pageOptions.current,
        defaultPageSize: RoleStore.pageOptions.pageSize,
        onChange: (current, pageSize) => {
          RoleStore.setPageOptions(current, pageSize);
        },
      }}
      request={async (params, sorter) => {
        let sortArr: string[] = [];

        if (Object.keys(sorter).length === 0) {
          sortArr = ['-createdAt'];
        }

        Object.keys(sorter).forEach((key) => {
          if (sorter[key] === 'descend') {
            sortArr.push(`-${key}`);
          } else {
            sortArr.push(`${key}`);
          }
        });

        const data = await RoleFetch.list({
          page: params.current || RoleStore.pageOptions.current,
          pageSize: params.pageSize || RoleStore.pageOptions.pageSize,
          name: params.name?.trim(),
          sort: sortArr.length ? sortArr.join(',') : undefined,
        });

        return {
          data: data.items,
          success: true,
          total: data.total,
        };
      }}
      toolBarRender={() => [
        <AuthButton
          aclsid="role.CREATE"
          key="button"
          icon={<PlusOutlined />}
          type="primary"
          onClick={handleCreateClick}
        >
          {t('CREATE_TITLE')}
        </AuthButton>,
      ]}
    />
  );
}

export default observer(RoleList);
