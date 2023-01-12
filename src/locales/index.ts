import { makeAutoObservable } from 'mobx';

import zhCN from 'antd/lib/locale/zh_CN';
import zhTW from 'antd/lib/locale/zh_TW';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-tw';
import zhCNCustom from './zh-CN';
import zhTWCustom from './zh-HK';
import { LanguageType, LocalesType } from '@/types/language';

export const languages: LanguageType[] = [{
  name: '简体',
  value: 'zh-CN',
  antd: zhCN,
  custom: zhCNCustom,
}, {
  name: '繁体',
  value: 'zh-TW',
  antd: zhTW,
  custom: zhTWCustom,
}];

export function getLanguage() {
  const supportLanguages = languages.map((lang) => lang.value);
  const localeLanguage = () => {
    if (Intl) {
      return Intl.NumberFormat().resolvedOptions().locale;
    }
    if (navigator.languages && navigator.languages.length) {
      return navigator.languages[0];
    }
    return '';
  };

  const tmpLanguage = localStorage.getItem('ADMIN_LANGUAGE')
    || localeLanguage();
  if (supportLanguages.indexOf(tmpLanguage) !== -1) {
    return tmpLanguage === 'zh-HK' ? 'zh-TW' : tmpLanguage;
  }
  return supportLanguages[0];
}

// 定义语言包
class Language {
  constructor() {
    makeAutoObservable(this);
  }

  languages: LanguageType[] = languages;

  get antdLocales() {
    return this.getLocale('antd');
  }

  get locales() {
    return this.getLocale('custom');
  }

  // 生成对应的包
  getLocale(type: string) {
    const tmpLocale: LocalesType = {};
    this.languages.forEach((item) => {
      tmpLocale[item.value] = item[type as keyof LanguageType];
    });
    return tmpLocale;
  }
}

export default new Language();
