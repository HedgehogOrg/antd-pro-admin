/* eslint-disable no-param-reassign */
/*
 * Author: Alvin
 * Modified By: Alvin
 * Created Date: 2022-04-12 15:53:11
 * Last Modified: 2022-04-20 09:42:24
 * Description:
 */
import React, { useCallback, useEffect, useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { message, Form } from 'antd';
import List from './components/List';
import EditModal, { EditType } from './components/EditModal';
import RemoveModal from './components/RemoveModal';
import {
  DepartmentList, Department, DepartmentParams, ListParams,
} from '@/types/stores/departments';
import DepartmentFetch from '@/apis/DepartmentsFetch';
import styles from './index.module.less';
import { useIntl } from '@/utils/intl';

export default function Departments() {
  const [editType, setEditType] = useState<EditType>('create');
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<Department>();
  const [dapartmentList, setDepartmentList] = useState<DepartmentList>();
  const [form] = Form.useForm();

  const i18n = useIntl('department');

  const normalizedDepartments = (departments: Department[], parentKey: string = ''): Department[] => {
    if (departments) {
      const result = departments.map<Department>((department, index) => {
        const { key, children } = department;
        if (!key) {
          department.key = parentKey + (index + 1).toString();
        }
        if (children && children.length > 0) {
          const temp: Department = department;
          temp.children = normalizedDepartments(children, department.key);
          return temp;
        }
        return department;
      });
      return result;
    }
    return [];
  };

  const getDepartmentList = () => {
    const params = {
      page: 1,
      pageSize: 20,
      expand: 'department',
    };

    DepartmentFetch.list < DepartmentList>(params).then((result) => {
      setDepartmentList(result);
    }).catch((err) => {
      console.log(err);
      message.info(err.message);
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    getDepartmentList();
  }, []);

  const departments = normalizedDepartments(dapartmentList?.items);

  const onSearchHandler = (key: string | string[]) => {
    let search = null;
    if (!key) search = [];
    search = typeof key === 'string' ? key : key && key.join('');
    const pramas: ListParams = {
      name: search,
      expand: 'department',
      page: 1,
      pageSize: 20,
    };
    if (!pramas.name) {
      Reflect.deleteProperty(pramas, 'name');
    }
    setLoading(true);
    DepartmentFetch.list < DepartmentList >(pramas).then((result) => {
      unstable_batchedUpdates(() => {
        setCurrentItem(undefined);
      });
      setDepartmentList(result);
    }).catch((err) => {
      console.log(err);
      message.info(err.message);
    }).finally(() => {
      setLoading(false);
    });
  };

  const onEditHandler = (department: Department) => {
    DepartmentFetch.retrieve(department.id).then((data) => {
      unstable_batchedUpdates(() => {
        setCurrentItem(() => department);
        setIsModalVisible(true);
        setEditType('update');
      });
      form.setFieldsValue({
        name: data.name, parentId: data.parentId,
      });
    });
  };

  const onRemoveHandler = (department: Department) => {
    unstable_batchedUpdates(() => {
      setCurrentItem(() => department);
      setIsRemoveModalVisible(true);
    });
  };

  const onResetHandler = () => {
    onSearchHandler([]);
  };

  const onCreateHandler = () => {
    unstable_batchedUpdates(() => {
      setCurrentItem(() => undefined);
      setIsModalVisible(() => true);
      setEditType('create');
    });
    form.setFieldsValue({
      name: '', parentId: undefined,
    });
  };

  const onChangeHandler = useCallback((pagination) => {
    const params = {
      page: pagination?.current || 1,
      pageSize: pagination?.pageSize || 20,
      expand: 'department',
    };
    setLoading(true);
    DepartmentFetch.list<DepartmentList>(params).then((result) => {
      setDepartmentList(result);
    }).catch((err) => {
      console.log(err);
      message.info(err.message);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const onEidtModalOk = (item: DepartmentParams) => {
    if (editType === 'create') {
      DepartmentFetch.create(item).then(() => {
        message.success(`${i18n('CREATE_DEPARTMENT')}成功`);
      }).then(() => {
        getDepartmentList();
      }).catch((error) => {
        if (error.statusCode === 409) {
          message.error(`${i18n('DEPARTMENT_NAME')}已存在`);
        } else {
          message.error(error.message);
        }
      })
        .finally(() => {
          unstable_batchedUpdates(() => {
            setCurrentItem(() => undefined);
            setIsModalVisible(false);
          });
        });
    } else {
      const paramsData = {
        id: currentItem?.id,
        ...item,
      };
      const id: number | any = currentItem?.id;
      DepartmentFetch.update(id, paramsData).then(() => {
        message.success(`${i18n('UPDATE_DEPARTMENT')}成功`);
      }).then(() => {
        getDepartmentList();
      }).catch((error) => {
        if (error.statusCode === 409) {
          message.error(`${i18n('DEPARTMENT_NAME')}已存在`);
        } else {
          message.error(error.message);
        }
      })
        .finally(() => {
          unstable_batchedUpdates(() => {
            setIsModalVisible(false);
            setCurrentItem(undefined);
          });
        });
    }
  };

  const onRemoveOk = (item: Department) => {
    DepartmentFetch.destroy(item.id).then(() => {
      message.success(`${i18n('DELETED_DEPARTMENT')}成功`);
      getDepartmentList();
      unstable_batchedUpdates(() => {
        setIsRemoveModalVisible(false);
        setCurrentItem(undefined);
      });
    }).catch((error) => {
      message.error(error.message);
    });
  };

  const onModalCancel = () => {
    if (isModalVisible) {
      setIsModalVisible(false);
      setCurrentItem(() => undefined);
    }
    if (isRemoveModalVisible) {
      setIsRemoveModalVisible(false);
    }
  };

  return (
    <div className={styles.view}>
      <List
        item={departments}
        loading={loading}
        onEdit={onEditHandler}
        onCreate={onCreateHandler}
        onSearch={onSearchHandler}
        onRemove={onRemoveHandler}
        onReset={onResetHandler}
        onChange={onChangeHandler}
      />
      <EditModal
        eidtType={editType}
        item={currentItem}
        isModalVisible={isModalVisible}
        onOk={onEidtModalOk}
        onCancel={onModalCancel}
        form={form}
      />
      <RemoveModal
        item={currentItem}
        isModalVisible={isRemoveModalVisible}
        onOk={onRemoveOk}
        onCancel={onModalCancel}
      />
    </div>
  );
}
