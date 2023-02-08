import { Tabs, Badge } from 'antd';
import { observer } from 'mobx-react';
import { NoticeTypesEnum } from './enum';
import NoticeList from './NoticeList';
import NoticeStore from '@/stores/notice';

const CONSOLE_TAB_ITEMS = [
  {
    name: '系统消息',
    key: NoticeTypesEnum.SYSTEM_NOTICE,
  },
];

// const ORGANIZATION_TAB_ITEMS = [
//   {
//     name: '系统消息',
//     key: NoticeTypesEnum.SYSTEM_NOTICE,
//   },
//   {
//     name: '待办事项',
//     key: NoticeTypesEnum.TODO,
//   },
//   {
//     name: '留言',
//     key: NoticeTypesEnum.PATIENT_MESSAGE,
//   },
// ];

// const TAB_ITEMS = Config.PLATFORM === Platform.CONSOLE ? CONSOLE_TAB_ITEMS : ORGANIZATION_TAB_ITEMS;
const TAB_ITEMS = CONSOLE_TAB_ITEMS;
function NoticeTabs() {
  const { unreadData } = NoticeStore;

  return (
    <Tabs
      tabPosition="left"
    >
      {
        TAB_ITEMS.map((tab) => {
          const typeUnreadData = unreadData.find((item) => item.kind === tab.key);
          const typeUnreadCount = typeUnreadData ? typeUnreadData.count : 0;

          return (
            <Tabs.TabPane
              tab={(
                <div>
                  <span>{tab.name}</span>
                  <Badge count={typeUnreadCount} overflowCount={99} offset={[4, -3]} />
                </div>
            )}
              key={tab.key}
            >
              <NoticeList type={tab.key} />
            </Tabs.TabPane>
          );
        })
      }
    </Tabs>
  );
}

export default observer(NoticeTabs);
