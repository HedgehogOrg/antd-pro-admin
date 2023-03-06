// import { Tabs } from 'antd';
import permissionFetch from '@/apis/PermissionFetch';
// import permissionOrgFetch from '@/apis/PermissionOrgFetch';
import { ModulePanelProps } from '@/types/system';
import ModulePanel from '../components/ModulePanel';
// import { useIntl } from '@/utils/intl';
// import { Platform } from '@/enums';

// const tabsStyle = {
//   paddingLeft: '20px',
//   backgroundColor: 'white',
//   marginBottom: '0',
// };

const consoleProps: ModulePanelProps = {
  // platform: Platform.CONSOLE,
  treeListApi: () => permissionFetch.treeList(),
};

// const organizationProps: ModulePanelProps = {
//   // platform: Platform.ORGANIZATION,
//   treeListApi: () => permissionOrgFetch.treeList(),
// };

function Modules() {
  // const t = useIntl('modules');
  return (
    <div>
      {/* <Tabs defaultActiveKey="1" tabBarStyle={tabsStyle}>
        <Tabs.TabPane tab={t('PLATFORM_CONSOLE')} key="1">
          <ModulePanel {...consoleProps} />
        </Tabs.TabPane> */}
      {/* <Tabs.TabPane tab={t('PLATFORM_ORGANIZATION')} key="2">
          <ModulePanel {...organizationProps} />
        </Tabs.TabPane> */}
      {/* </Tabs> */}
      <ModulePanel {...consoleProps} />

    </div>
  );
}

export default Modules;
