import { LocalesType } from '@/types/language';
import login from './login';
import menu from './menu';
import common from './common';
import error from './error';

const message: LocalesType = {
  // 公用
  ...common,
  login,
  menu,
  error,
};

// 满足在 useIntl 的时候也可以使用公用模块
Reflect.ownKeys(message).forEach((key) => {
  const module = message[String(key)];
  if (typeof module === 'object') {
    message[String(key)] = {
      ...common,
      ...module,
    };
  }
});

export default message;
