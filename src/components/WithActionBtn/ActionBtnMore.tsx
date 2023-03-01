/*
 * File: ActionBtnMore.tsx
 * Project: sd-organization-web
 * FilePath: /src/components/WithActionBtn/ActionBtnMore.tsx
 * Created Date: 2022-05-18 17:26:48
 * Author: diya
 * -----
 * Last Modified: 2022-06-01 18:30:06
 * Modified By: diya
 * -----
 * Description:
 */
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import { useIntl } from '@/utils/intl';

export default function ActionBtnMore({ children, btnMoreStyle, popupContainer }: { children: JSX.Element | JSX.Element[], btnMoreStyle: any, popupContainer?:string }) {
  const t = useIntl('account');
  const newChildren = Array.isArray(children) ? children : [children];
  // const menu = (): JSX.Element => (
  //   <Menu
  //     items={newChildren.map((child: JSX.Element) => ({
  //       key: child.key as string,
  //       label: child,
  //       type: child.type,
  //     }))}
  //   />
  // );
  const menu:MenuProps['items'] = newChildren.map((child: JSX.Element) => ({
    key: child.key as string,
    label: child,
    type: child.type,
  }));
  return (
    <Dropdown menu={{ items: menu }} trigger={['click']} getPopupContainer={() => (popupContainer ? document.getElementById(popupContainer) as HTMLElement : document.body)}>
      <Button
        type="link"
        className="ant-dropdown-link"
        key="more"
        style={{ padding: 3, ...btnMoreStyle }}
      >
        {t('MORE')}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}
