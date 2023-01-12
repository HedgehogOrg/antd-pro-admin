import Intl from 'react-intl-universal';
import { useOutletContext } from 'react-router-dom';
import { IntlModule } from '@/types/language';

// 导出多语言模块函数
const intl: IntlModule = new Proxy({}, {
  get: (target, module) => {
    // 母鸡哪来的
    if (module === '$$typeof') return '';
    const tmpModule = Intl.get(String(module));
    if (typeof tmpModule === 'string' && tmpModule.length) {
      return tmpModule;
    }
    return (key: string, variables: any = {}) => Intl.get(`${String(module)}.${key}`, variables);
  },
});

/**
 * 使用多语言并监听刷新多语言
 * @param module 多语言模块名称
 * @returns 对应的多语言模块
 */
export function useIntl(module: string) {
  useOutletContext();
  return intl[module];
}

export default intl;
