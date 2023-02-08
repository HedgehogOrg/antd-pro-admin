import { BellOutlined, SettingOutlined } from '@ant-design/icons';
import { Badge, Drawer, Tooltip } from 'antd';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import WithConfigProvider from '../WithConfigProvider';
import webSocket from '@/socket';
import NoticeTabs from './NoticeTabs';
import NoticeStore from '@/stores/notice';
import styles from './index.module.less';

const initSocket = async () => {
  await webSocket.getInstance();
};

function Notice() {
  const navigate = useNavigate();
  const { unreadCount, drawerVisible } = NoticeStore;

  const showDrawer = () => {
    NoticeStore.setDrawerVisible(true);
  };

  useEffect(() => {
    initSocket();
    // 暂时禁用云医消息通知
    // if (Config.PLATFORM === Platform.ORGANIZATION) {
    NoticeStore.fetchNoticeData();
    // }

    return () => { webSocket.disconnectSocket(); };
  }, []);

  const onClose = () => {
    NoticeStore.setDrawerVisible(false);
  };

  const onNoticeSetting = () => {
    NoticeStore.setDrawerVisible(false);
    navigate('/notice-setting');
  };

  return (
    < >
      <span
        style={{ paddingLeft: '16px', paddingRight: unreadCount > 9 ? '28px' : '16px', cursor: 'pointer' }}
        onClick={showDrawer}
        aria-hidden="true"
      >
        <Badge size="small" count={unreadCount} overflowCount={99} offset={[unreadCount >= 10 ? 10 : 2, 0]}>
          <Tooltip title="消息中心"><BellOutlined style={{ fontSize: 16 }} /></Tooltip>
        </Badge>
      </span>

      <Drawer
        size="large"
        placement="right"
        onClose={onClose}
        visible={drawerVisible}
        bodyStyle={{ padding: 0 }}
        title="消息通知"
        destroyOnClose
      >
        <WithConfigProvider>
          <div className={styles['notice-type-tabs']}>
            <NoticeTabs />
          </div>

          {/* {
            Config.PLATFORM === Platform.ORGANIZATION && (
            <div className={styles['notice-setting']} onClick={onNoticeSetting}>
              <SettingOutlined />
              <span>消息设置</span>
            </div>
            )
          } */}
          <div
            className={styles['notice-setting']}
            onClick={onNoticeSetting}
            aria-hidden
          >
            <SettingOutlined />
            <span>消息设置</span>
          </div>

        </WithConfigProvider>
      </Drawer>
    </>
  );
}

export default observer(Notice);
