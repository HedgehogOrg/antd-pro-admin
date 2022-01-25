import { makeAutoObservable, runInAction } from 'mobx';
import { Locale } from 'antd/lib/locale-provider';

import zhCN from 'antd/lib/locale/zh_CN';
import zhHK from 'antd/lib/locale/zh_HK';

interface Locales {
  [key: string]: any
}

interface LanguageType {
  // 显示的下拉
  name: string,
  // key
  value: string,
  // antd语言包（日期、日历等插件）
  antd: Locale,
  // 自定义语言包（业务语言）
  custom: Promise<any>,
}

const languages: LanguageType[] = [{
  name: '简体',
  value: 'zh-CN',
  antd: zhCN,
  custom: import('./zh-CN')
}, {
  name: '繁体',
  value: 'zh-HK',
  antd: zhHK,
  custom: import('./zh-HK')
}]


// 定义语言包
class Language {
  constructor() {
    makeAutoObservable(this)
    this.init()
  }
  languages: LanguageType[] = []
  get antdLocales () {
    return this.getLocale('antd')
  }
  get locales () {
    return this.getLocale('custom')
  }
  init() {
    this.fetchLocals()
  }

  // 生成对应的包
  getLocale(type: string) {
    const tmpLocale: Locales = {}
    this.languages.forEach(item => {
      tmpLocale[item.value] = item[type as keyof LanguageType]
    })
    return tmpLocale
  }

  // 异步加载语言包
  async fetchLocals() {
    const tmpArr: LanguageType[] = []
    for (let index = 0; index < languages.length; index++) {
      const lan = languages[index];
      const tmpLocal = await lan.custom
      tmpArr.push({
        ...lan,
        custom: tmpLocal.default
      });
    }
    runInAction(() => {
      this.languages = tmpArr
    })
  }
}

export default new Language()
