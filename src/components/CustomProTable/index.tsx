import ProTable, { ProTableProps } from '@ant-design/pro-table';
import type { ParamsType } from '@ant-design/pro-provider';
import WithConfigProvider from '../WithConfigProvider';

function CustomProTable<T = void, U = void>(props: ProTableProps<any, any>) {
  // 为保持Table样式和行为统一，尽量使用默认配置，无法满足需求时可覆盖默认配置
  const defaultProps = {
    rowKey: 'id',
    scroll: { x: 800 },
    options: false as const,
    defaultSize: 'large' as const,
    revalidateOnFocus: false,
    dateFormatter: 'string' as const,
    form: { ignoreRules: false },
    search: {
      labelWidth: 'auto' as const,
    },
    pagination: {
      showQuickJumper: true,
      showSizeChanger: true,
    },
  };

  const { pagination } = props;
  // eslint-disable-next-line no-nested-ternary
  const paginationConfig = pagination
    ? { ...defaultProps.pagination, ...pagination }
    : (pagination === false ? false : defaultProps.pagination);

  return (
    <WithConfigProvider>
      <ProTable<T extends Record<string, any> ? T : any, U extends ParamsType ? U : any>
        {...defaultProps}
        {...props}
        pagination={paginationConfig}
      />
    </WithConfigProvider>
  );
}

export default CustomProTable;
