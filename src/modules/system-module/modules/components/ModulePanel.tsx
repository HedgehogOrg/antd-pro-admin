import { useRef, useState } from 'react';
import { Space } from 'antd';
import { ActionType, ColumnsState, ProColumns } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { CustomProTable } from '@/components';
import { ModulePanelProps, PermissionTree, TmpPermissionTree } from '@/types/system';
import AuthButton from '@/components/AuthButton';
import permission from '@/stores/permissions';
import EditPermission from './EditPermission';
import DeletePermission from './DeletePermission';
import ButtonPermission from './ButtonPermission';
import { Method, PermissionType, Platform } from '@/enums';
import intl, { useIntl } from '@/utils/intl';
import { addParents, sort } from '@/utils/utils';
import { disableMenuCheckbox } from './util';

// 拆分菜单和按钮的children字段
function menuTreeFilter(arr: TmpPermissionTree[]) {
  return arr.map((item) => {
    const tmpItem = item;
    if (tmpItem.level === permission.MENU_MAX_LEVEL) {
      // 最后一级菜单
      tmpItem.actions = tmpItem.children;
      Reflect.deleteProperty(tmpItem, 'children');
    } else if (tmpItem.children && tmpItem.children.length) {
      // 有子元素
      if (tmpItem.children[0].type === PermissionType.BUTTON) {
        // 子元素是按钮
        tmpItem.actions = tmpItem.children;
        Reflect.deleteProperty(tmpItem, 'children');
      } else {
        Object.assign(tmpItem, {
          children: menuTreeFilter(tmpItem.children),
        });
      }
    } else {
      // 空子元素
      Reflect.deleteProperty(tmpItem, 'children');
    }
    return tmpItem;
  });
}

// 搜索过滤
function filterMenu(arr: TmpPermissionTree[] = [], searchField: string): TmpPermissionTree[] {
  if (!searchField) {
    return arr;
  }
  return arr.filter((item) => {
    const tmpItem = item;
    if (item.name.includes(searchField)) {
      return true;
    }
    if (item.children && item.children.length) {
      tmpItem.children = filterMenu(item.children, searchField);
      if (tmpItem.children && tmpItem.children.length) {
        return true;
      }
    }
    return false;
  });
}

// 空数据
const emptyPermissionTree: TmpPermissionTree = {
  name: '',
  description: '',
  level: 0,
  parentId: 0,
  type: PermissionType.MENU,
  menu: '',
  path: '',
  action: '',
  icon: '',
  sort: 0,
  method: Method.GET,
  apiPath: '',
  aclIds: null,
  children: [],
  isShow: 1,
};

function ModulePanel(props: ModulePanelProps) {
  // 配置是哪个平台
  const { platform, treeListApi } = props;
  // 多语言
  const t = useIntl('modules');

  // 是否显示编辑弹框
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 编辑的内容
  const [editItem, setEditItem] = useState(emptyPermissionTree);
  // 是否编辑
  const [isEdit, setIsEdit] = useState(false);
  // 菜单树
  const [treeData, setTreeData] = useState<TmpPermissionTree[]>([]);
  // 权限树
  const [aclsData, setAclsData] = useState<TmpPermissionTree[]>([]);
  // 表格
  const table = useRef<ActionType>();

  // 新建
  const openEditPanel = () => {
    setEditItem(emptyPermissionTree);
    setIsEdit(false);
    setIsModalVisible(true);
  };

  // 编辑
  const editRow = (record: TmpPermissionTree) => {
    setEditItem(record);
    setIsEdit(true);
    setIsModalVisible(true);
  };
  // 编辑完成
  const onEditOk = () => {
    table.current?.reload();
  };

  // 列
  const columns: ProColumns<TmpPermissionTree>[] = [
    {
      title: t('PERMISSION_NAME'),
      dataIndex: 'name',
      width: 190,
    },
    {
      title: t('PERMISSION_DESCRIPTION'),
      dataIndex: 'description',
      ellipsis: true,
      search: false,
    },
    {
      title: t('PERMISSION_ACTION'),
      dataIndex: 'action',
      search: false,
    },
    {
      title: t('PERMISSION_PATH'),
      dataIndex: 'path',
      search: false,
    },
    {
      title: t('PERMISSION_ICON'),
      dataIndex: 'icon',
      search: false,
      width: '8%',
    },
    {
      title: t('PERMISSION_SORT'),
      dataIndex: 'sort',
      search: false,
      width: '7%',
      defaultSortOrder: 'descend',
      sorter: (a, b) => (a.sort) - (b.sort),
    },
    {
      title: intl.ACTION,
      width: '15%',
      search: false,
      render: (text: any, record: TmpPermissionTree) => [
        <AuthButton
          aclsid={platform === Platform.CONSOLE ? 'modules.EDIT_CONSOLE' : 'modules.EDIT_ORGANIZATION'}
          type="link"
          onClick={() => editRow(record)}
          key="edit"
        >
          {intl.EDIT}
        </AuthButton>,
        <DeletePermission deleteItem={record} onDeleteOk={onEditOk} key="delete" platform={platform} />,
      ],
    },
    {
      title: `${t('BUTTON')}${t('PERMISSION')}`,
      dataIndex: 'actions',
      search: false,
      render: (text: any, record: TmpPermissionTree) => {
        const children = record.actions || [];
        return (
          <Space wrap>
            {children.length ? sort(children).map((item: PermissionTree) => (
              <ButtonPermission
                key={item.id}
                aclsData={aclsData}
                permission={item}
                editRow={editRow}
                onDeleteOk={onEditOk}
                platform={platform}
              />
            )) : '-'}
          </Space>
        );
      }
      ,
    },
  ];

  // 列配置
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    description: { show: false },
    icon: { show: false },
  });

  return (
    <>
      <CustomProTable<TmpPermissionTree>
        headerTitle={t('MODULE_LIST')}
        actionRef={table}
        columns={columns}
        columnsState={{
          value: columnsStateMap,
          onChange: setColumnsStateMap,
        }}
        request={async (params) => {
          const acls = addParents(await treeListApi());
          const menuTree = menuTreeFilter(JSON.parse(JSON.stringify(acls)));

          // 禁止选中菜单
          setAclsData(disableMenuCheckbox(acls));
          setTreeData(menuTree);

          return {
            data: filterMenu(menuTree, params.name),
            success: true,
          };
        }}
        pagination={{
          hideOnSinglePage: true,
        }}
        options={{
          fullScreen: false, reload: false, setting: true, density: false,
        }}
        toolBarRender={() => [
          <AuthButton
            aclsid={platform === Platform.CONSOLE ? 'modules.NEW_CONSOLE' : 'modules.NEW_ORGANIZATION'}
            type="primary"
            onClick={openEditPanel}
          >
            <PlusOutlined />
            {t('ADD_PERMISSION')}
          </AuthButton>,
        ]}
      />
      {/* 编辑弹窗 */}
      <EditPermission
        platform={platform}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        treeData={treeData}
        aclsData={aclsData}
        isEdit={isEdit}
        editItem={editItem}
        onEditOk={onEditOk}
      />
    </>
  );
}

export default ModulePanel;
