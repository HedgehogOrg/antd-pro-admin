import intl from 'react-intl-universal';

// 方便使用多语言
export const setIntlModule = (module: string, opt: any = {}) => {
  return function (str: string) {
    return intl.get(`${module}.${str}`, opt)
  }
}
