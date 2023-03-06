/*
 * File: SystemLogs.tsx
 * Project: sd-console-web
 * FilePath: /src/modules/system/logs/pages/SystemLogs.tsx
 * Created Date: 2022-06-07 16:33:07
 * Author: diya
 * -----
 * Last Modified: 2022-06-09 18:27:35
 * Modified By: diya
 * -----
 * Description:
 */
import { useEffect, useState } from 'react';
import { Cascader, DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { ProColumns } from '@ant-design/pro-table';
import { SystemLogType } from '@/types/system/logs';
import intl, { useIntl } from '@/utils/intl';
import { getSystemLogs } from '@/apis/systemLogs';
import CustomProTable from '@/components/CustomProTable';
import PermissionFetch from '@/apis/PermissionFetch';

const { RangePicker } = DatePicker;

const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 6,
  xxl: 6,
};

function SystemLogs() {
  const intlMenu = useIntl('menu');

  const [pageOptions, setPageOptions] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    limit: 10,
    offset: 0,
  });

  const [menuTree, setMenuTree] = useState<any[]>([]);
  useEffect(() => {
    PermissionFetch.treeList({ type: 1 }).then((consoleMenu) => {
      setMenuTree(consoleMenu);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const range = (start: any, end: any) => {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  };

  function disabledDate(current: any) {
    let result = false;
    if (current > dayjs().add(0, 'days')) {
      result = true;
    }
    return result;
  }

  function disabledDateTime(dates: Dayjs) {
    const hours = dayjs().hour();
    const minutes = dayjs().minute();
    const seconds = dayjs().second();
    if (dates && dayjs(dates).date() === dayjs().date()) {
      return {
        disabledHours: () => range(hours + 1, 24),
        disabledMinutes: () => range(minutes + 1, 60),
        disabledSeconds: () => range(seconds + 1, 60),
      };
    }
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    };
  }

  // 列
  const columns: ProColumns<SystemLogType>[] = [
    {
      title: intlMenu('ACCOUNT'),
      dataIndex: 'operatorName',
    },
    {
      title: intl.MENU,
      dataIndex: 'menuCode',
      hideInTable: true,
      renderFormItem: () => (
        <Cascader
          showCheckedStrategy={Cascader.SHOW_CHILD}
          options={menuTree}
          fieldNames={{ label: 'name', value: 'action', children: 'children' }}
          expandTrigger="hover"
          changeOnSelect
          multiple
          maxTagCount="responsive"
        />
      ),
    },
    {
      title: intl.MENU,
      dataIndex: 'menuName',
      hideInSearch: true,
    },
    {
      title: intlMenu('ACTION_TIME'),
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      renderFormItem: () => (
        <RangePicker
          showTime
          placeholder={[intlMenu('START_TIME'), intlMenu('END_TIME')]}
          disabledDate={(now) => disabledDate(now as unknown as Dayjs)}
          disabledTime={(now) => disabledDateTime(now as unknown as Dayjs)}
        />
      ),
    },
    {
      title: intlMenu('ACTION_DETAIL'),
      dataIndex: 'description',
      ellipsis: true,
      search: false,
    },
  ];

  return (
    <CustomProTable<SystemLogType>
      headerTitle={intlMenu('SYSTEM_LOGS')}
      columns={columns}
      pagination={{
        current: pageOptions.page,
        pageSize: pageOptions.pageSize,
        total: pageOptions.total,
      }}
      search={{
        labelWidth: 'auto',
        span: defaultColConfig,
        defaultCollapsed: false,
      }}
      request={async (params) => {
        const param = {
          page: params.current,
          pageSize: params.pageSize,
        };
        if (params.menuCode?.length) {
          Object.assign(param, {
            menuCode: params.menuCode,
          });
        }
        if (params.operatorName) {
          Object.assign(param, {
            operatorName: params.operatorName.trim(),
          });
        }
        if (params.createdAt) {
          const [start, end] = params.createdAt;
          Object.assign(param, {
            createdAt: `[${dayjs(start).unix()},${dayjs(end).unix()}]`,
          });
        }
        const data = await getSystemLogs({
          ...param,
          sort: '-createdAt',
          attributes: ['id', 'operatorName', 'menuCode', 'createdAt', 'description'],
        });
        const { items, ...pageOption } = data;
        setPageOptions(pageOption);
        return {
          data: items,
          success: true,
        };
      }}
      rowKey="id"
      options={{
        fullScreen: false, reload: false, setting: true, density: false,
      }}
    />
  );
}

export default SystemLogs;
