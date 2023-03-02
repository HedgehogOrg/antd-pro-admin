import {
  Table,
  Button,
  Checkbox,
  message,
} from 'antd';
import {
  useEffect, useState, forwardRef, useImperativeHandle, memo,
} from 'react';
import { useIntl } from '@/utils/intl';
import RoleFetch from '@/apis/RoleFetch';
import {
  RoleItem, GetRoleItemResponseType, ExtendedRolePermissionItem, RolePermissionItem,
} from '@/types/stores/role';
import {
  getAllMenuIds,
  removeEmptyParent,
  formatTreeData,
  findDeep,
} from './util';
import styles from './index.module.less';

const VIEW_ACTION_CODE = '00';

type PropTypes = {
  roleData?: Partial<GetRoleItemResponseType>,
  onPrevious: VoidFunction,
  onNext: (data: Partial<RoleItem>) => void,
  onCancel: VoidFunction,
};

function RolePermission(props: PropTypes, ref: any) {
  const t = useIntl('role');
  const {
    roleData, onPrevious, onNext, onCancel,
  } = props;
  const [menus, setMenus] = useState<ExtendedRolePermissionItem[]>([]);
  const [accessIds, setAccessIds] = useState<number[]>([]);
  const [allMenuIds, setAllMenuIds] = useState<number[]>([]);
  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const [checkAll, setCheckAll] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    handleValidate,
  }));

  const handleValidate = async () => new Promise((resolve, reject) => {
    if (accessIds.length === 0) {
      message.error(t('PERMISSION_EMPTY_MESSAGE'));
      reject('Empty Permission');
    } else {
      const data = { aclIds: accessIds };
      resolve(data);
    }
  });

  const rowSelection = {
    checkStrictly: false,
    columnTitle: () => (
      <Checkbox
        checked={checkAll}
        indeterminate={indeterminate}
        onChange={(e) => toggleCheckAll(e.target.checked)}
      />
    ),
    renderCell: (checked: boolean, record: ExtendedRolePermissionItem) => {
      if (record.submenuIds.length) {
        const allChecked = record.submenuIds.every((id: number) => accessIds.includes(id));
        const someChecked = record.submenuIds.some((id: number) => accessIds.includes(id));

        return (
          <Checkbox
            checked={allChecked}
            indeterminate={someChecked && !allChecked}
            onChange={(e) => { handleMenuChange(e.target.checked, record); }}
          />
        );
      }

      return (
        <Checkbox
          checked={accessIds.includes(record.id)}
          indeterminate={false}
          onChange={(e) => { handleMenuChange(e.target.checked, record); }}
        />
      );
    },
  };

  const columns = [
    {
      title: t('MENU'),
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: t('ACTION'),
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: ExtendedRolePermissionItem) => {
        if (record.actions.length) {
          const sortedActions = record.actions.sort((a, b) => b.sort - a.sort);
          const actions = sortedActions.map((action: ExtendedRolePermissionItem) => {
            const parent = findDeep(menus, action.parentId);
            const { subIds } = parent;
            const temp = [...subIds];

            // 如果选中了查看以外的其他操作，禁用查看操作
            const isViewAction = action.action.endsWith(VIEW_ACTION_CODE);
            let otherActionsChecked = false;
            if (isViewAction) {
              temp.splice(subIds.indexOf(action.id), 1);
              otherActionsChecked = !!temp.length && temp.some((id: number) => accessIds.includes(id));
            }

            return (
              <Checkbox
                disabled={isViewAction && otherActionsChecked}
                onChange={() => { handleActionChange(action); }}
                checked={accessIds.includes(action.id)}
                key={action.id}
              >
                {action.name}
              </Checkbox>
            );
          });

          // 按钮权限全选/反选
          const selectAll = () => {
            const actionIds = record.actions.map((action: ExtendedRolePermissionItem) => action.id);
            const allChecked = actionIds.every((id) => accessIds.includes(id));
            const someChecked = actionIds.some((id) => accessIds.includes(id));

            return (
              <Checkbox
                checked={allChecked}
                indeterminate={!allChecked && someChecked}
                onChange={(e) => { handleActionCheckAll(e.target.checked, record.actions); }}
                key="SelectAll"
              >
                全选
              </Checkbox>
            );
          };

          return [selectAll(), ...actions];
        }
        return <div />;
      },
    },
  ];

  const handleActionCheckAll = (checked: boolean, actions: ExtendedRolePermissionItem[]) => {
    const temp = [...accessIds];
    const actionIds: number[] = actions.map((action: ExtendedRolePermissionItem) => action.id);

    if (checked) {
      actionIds.forEach((id) => {
        if (!temp.includes(id)) {
          temp.push(id);
        }
      });
    } else {
      actionIds.forEach((id) => {
        if (temp.includes(id)) {
          temp.splice(temp.indexOf(id), 1);
        }
      });
    }

    setAccessIds(temp);
  };

  const toggleCheckAll = (checked: boolean) => {
    const temp = [...accessIds];
    if (checked) {
      allMenuIds.forEach((id) => {
        if (!temp.includes(id)) {
          temp.push(id);
        }
      });
    } else {
      allMenuIds.forEach((id) => {
        if (temp.includes(id)) {
          temp.splice(temp.indexOf(id), 1);
        }
      });
    }

    setAccessIds(temp);
  };

  const handleActionChange = (action: ExtendedRolePermissionItem) => {
    const temp: number[] = [...accessIds];
    const index = temp.indexOf(action.id);

    if (index > -1) {
      temp.splice(index, 1);
    } else {
      temp.push(action.id);

      // 选中某个操作后，该操作的父菜单的查看子操作自动勾选
      const parent = findDeep(menus, action.parentId);
      const viewAction = parent.actions.find(
        (item: ExtendedRolePermissionItem) => item.action.endsWith(VIEW_ACTION_CODE),
      );

      if (viewAction && !temp.includes(viewAction.id)) {
        temp.push(viewAction.id);
      }
    }

    setAccessIds(temp);
  };

  const handleMenuChange = (checked: boolean, record: ExtendedRolePermissionItem) => {
    const { submenuIds } = record;
    const { parentIds } = record;

    if (checked) {
      setAccessIds(Array.from(new Set([...accessIds, ...submenuIds, ...parentIds, record.id])));
    } else {
      let temp: number[] = [...accessIds];
      // 删除当前菜单id
      temp.splice(temp.indexOf(record.id), 1);

      // 删除子菜单id
      submenuIds.forEach((id: number) => {
        temp.splice(temp.indexOf(id), 1);
      });

      // 递归删除子菜单都未选择的父id
      if (record.parentId !== 0) {
        temp = removeEmptyParent(menus, temp, record.parentId);
      }

      setAccessIds(temp);
    }
  };

  const handlePrevStep = () => {
    onPrevious();
  };

  const handleNextStep = () => {
    if (accessIds.length === 0) {
      message.error(t('PERMISSION_EMPTY_MESSAGE'));
      return;
    }
    const data = { aclIds: accessIds };
    onNext(data);
  };

  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    if (roleData && roleData.acls) {
      const aclIds = roleData.acls.map((acl: RolePermissionItem) => acl.id);
      setAccessIds(aclIds);
    }
  }, [roleData]);

  useEffect(() => {
    const allMenusSelected = allMenuIds.every((id) => accessIds.includes(id));
    const allMenusUnselected = allMenuIds.every((id) => !accessIds.includes(id));

    setCheckAll(allMenusSelected);
    setIndeterminate(!allMenusSelected && !allMenusUnselected);
  }, [allMenuIds, accessIds]);

  useEffect(() => {
    let mounted = true;

    RoleFetch.getPermissions()
      .then((res) => {
        if (mounted) {
          const formattedMenus = formatTreeData(res, []);
          const sortedMenus = formattedMenus.sort((a, b) => b.sort - a.sort);
          setAllMenuIds(getAllMenuIds(res));
          setMenus(sortedMenus);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => { mounted = false; };
  }, []);

  return (
    <div className={styles['role-permission']}>
      <Table
        rowKey="id"
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={menus}
        pagination={false}
        expandable={{ childrenColumnName: 'subMenus' }}
        bordered
      />

      <div className={styles['steps-action']}>
        <Button
          className={styles['step-button']}
          onClick={handlePrevStep}
        >
          {t('PREV_STEP')}
        </Button>
        <Button
          type="primary"
          className={styles['step-button']}
          onClick={handleNextStep}
        >
          {t('NEXT_STEP')}
        </Button>
        <Button
          className={styles['step-button']}
          onClick={handleCancel}
        >
          {t('CANCEL')}
        </Button>
      </div>
    </div>
  );
}

export default memo(forwardRef(RolePermission));
