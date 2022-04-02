import intl from 'react-intl-universal';

// 方便使用多语言
const setIntlModule = (module: string, opt: any = {}) => function (str: string) {
  return intl.get(`${module}.${str}`, opt);
};

export { setIntlModule };
