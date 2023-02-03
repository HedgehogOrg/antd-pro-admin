import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { WaterMark } from '@ant-design/pro-layout';
import { useLocation } from 'react-router-dom';
import user from '@/stores/auth/UserStore';
import LoginView from '../components/LoginView';
import styles from './login.module.less';
import { useIntl } from '@/utils/intl';
import { LocationStateType } from '@/types/routes';

export default function Login() {
  // location
  const location = useLocation();
  const state = location.state as LocationStateType;
  let to = '/';
  const [loading, setLoading] = useState<boolean>(false);

  // 多语言
  const i18n = useIntl('login');
  const error = useIntl('error');

  useEffect(() => {
    // 记录 手动点击退出 或 因token失效 回到登录页时，记录历史来源
    // 只设置一次，不每次渲染都设置
    if (state?.from) {
      // 考虑带参数的url
      to = state.from.pathname + state.from.search;
    }

    if (to !== '/') {
      user.setHistoryFrom(to);
    }
  }, []);

  // 本地校验成功
  const onFinish = (values: any) => {
    setLoading(true);
    user.login(values, { showErrorMessage: false }).then(() => {
      message.success(i18n('LOGIN_SUCCESS'));
    }).catch((err:any) => {
      if (err.code === 'NOT_FOUND') {
        message.error(i18n('ACCOUNT_NOT_FOUND'));
      } else {
        message.error(error(err.code));
      }
      setLoading(false);
    });
  };

  return (
    <div className={styles.view}>
      <WaterMark
        className={styles['water-mark']}
        width={138}
        height={87}
        gapX={(Math.random() + 0.8) * 320}
        gapY={(Math.random() + 0.8) * 375}
        image="/assets/login/water_mark.png"
      >
        <LoginView onLogin={onFinish} loading={loading} />
      </WaterMark>
    </div>
  );
}
