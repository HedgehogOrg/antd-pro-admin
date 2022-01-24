// 业务中使用日期格式等
import 'intl/locale-data/jsonp/zh-Hans-CN.js';
import 'intl/locale-data/jsonp/zh-Hant-HK.js';

import zhCN from 'antd/lib/locale/zh_CN';
import zhHK from 'antd/lib/locale/zh_HK';

interface Language {
  // 显示的下拉
  name: string,
  // key
  value: string,
  // antd语言包（日期、日历等插件）
  antd: any,
  // 自定义语言包（业务语言）
  custom: Promise<any>,
}

interface Locales {
  [key: string]: any
}

// 定义语言包
const languages: Language[] = [{
  name: '简体',
  value: 'zh-CN',
  antd: zhCN,
  custom: import('./zh-CN')
}, {
  name: '繁体',
  value: 'zh-HK',
  antd: zhHK,
  custom: import('./zh-HK')
}];


// 生成对应的包
function getLocale(type: string) {
  const tmpLocale: Locales = {}
  languages.forEach(item => {
    tmpLocale[item.value] = item[type as keyof Language]
  })
  return tmpLocale
}

export const antdLocales: Locales = getLocale('antd')

export const locales: Locales = getLocale('custom')

export default languages
