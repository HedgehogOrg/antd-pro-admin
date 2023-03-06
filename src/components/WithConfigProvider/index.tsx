import { ConfigProvider } from 'antd';
import lang from '@/locales';
import userStore from '@/stores/auth/UserStore';

function WithConfigProvider({ children }: { children: any }) {
  return (
    <ConfigProvider locale={lang.antdLocales[userStore.language]}>
      {children}
    </ConfigProvider>
  );
}

export default WithConfigProvider;
